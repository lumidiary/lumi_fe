/*
 * 메인 페이지 (4)
 */

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getDiaryListByUser, getDigestListByUser } from '@/services/diary';
import { UserHeader, ContentContainer, Button } from '@components/common';
import { PostCard, DigestCard } from '@components/index';
import { EmotionType } from '@/types/emotion';
import { DiaryListItemType, DigestItemType } from '@/types/diary';
import { requestGetFetch } from '@/services/apiService';

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>();
  const [loadingUser, setLoadingUser] = useState(true);
  const [recentPosts, setRecentPosts] = useState<DiaryListItemType[]>([]);
  const [digests, setDigests] = useState<DigestItemType[]>([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await requestGetFetch('users/profile', 'tokenAndUserId');
        setUsername(data.name);
      } catch (error) {
        console.error('프로필 불러오기 실패:', error);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    getDiaryListByUser(userId)
      .then(data => setRecentPosts(data.slice(0, 4)))
      .catch(err => console.error('📌 일기 조회 실패:', err));

    getDigestListByUser(userId)
      .then(data => setDigests(data.slice(0, 2)))
      .catch(err => console.error('📌 다이제스트 조회 실패:', err));
  }, []); // 최초 렌더링에 한 번만 실행

  const greeting = loadingUser
    ? '안녕하세요!'
    : username
      ? `안녕하세요, ${username}님.`
      : '안녕하세요, 손님!';

  return (
    <Container>
      <UserHeader />
      <ContentContainer>
        <Content>
          <Header>
            <Title>{greeting} 오늘 하루는 어땠나요?</Title>
            <Button
              type="setting"
              buttonText="+ 일기 작성하기"
              onClick={() => navigate('/create/image-upload')}
            />
          </Header>

          <SectionHeader>
            <SubTitle>최근 글</SubTitle>
            <MoreLink onClick={() => navigate('/diary/list')}>
              더보기 &gt;
            </MoreLink>
          </SectionHeader>

          <CardRow>
            {recentPosts.length > 0 ? (
              recentPosts.map(post => (
                <PostCard
                  key={post.diaryId}
                  date={post.createdAt.slice(0, 10)}
                  emotion={post.emotionTag as EmotionType}
                  content={post.overallDaySummary}
                  postId={post.diaryId}
                  imageUrl={post.firstPhoto?.url}
                />
              ))
            ) : (
              <EmptyMessage>작성된 일기가 없습니다.</EmptyMessage>
            )}
          </CardRow>

          <SectionHeader>
            <SubTitle>다이제스트</SubTitle>
            <MoreLink onClick={() => navigate('/digest/list')}>
              더보기 &gt;
            </MoreLink>
          </SectionHeader>

          <CardColumn>
            {digests.length > 0 ? (
              digests.map(d => (
                <DigestCard
                  key={d.id}
                  digestId={d.id}
                  dateText={`${d.periodStart} ~ ${d.periodEnd}`}
                  title={d.title}
                  content={d.summary}
                  monthPath={d.periodStart.slice(0, 7)}
                  imageUrl={d.imageUrl || ''}
                />
              ))
            ) : (
              <EmptyMessage>생성된 다이제스트가 없습니다.</EmptyMessage>
            )}
          </CardColumn>
        </Content>
      </ContentContainer>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.p`
  font-size: 2rem;
`;

const SubTitle = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
`;

const MoreLink = styled.span`
  color: #4b9cd3;
  font-weight: bold;
  margin: 0;
  cursor: pointer;
`;

const CardRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const EmptyMessage = styled.p`
  font-size: 0.95rem;
  color: #888;
  text-align: center;
  padding: 20px 500px;

  grid-column: 1 / -1;
  justify-self: center;
`;
