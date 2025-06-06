/*
 * 메인 페이지 (4)
 */

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCurrentUser, User } from '../services/auth';
import { getDiaryListByUser, getDigestListByUser } from '@/services/diary';
import { UserHeader, ContentContainer, Button } from '@components/common';
import { PostCard, DigestCard } from '@components/index';
import { EmotionType } from '@/types/emotion';
import { DiaryListItemType, DigestItemType } from '@/types/diary';
import { requestGetFetch } from '@/services/apiService';



const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [recentPosts, setRecentPosts] = useState<DiaryListItemType[]>([]);
  const [digests, setDigests] = useState<DigestItemType[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await requestGetFetch('users/profile', 'tokenAndUserId');
  
        console.log('✅ Home userId:', data.id); // ⭐ 여기 추가!!

        setUser({
          id: data.id,
          nickname: data.name, // 또는 data.nickname
        });
      } catch (err) {
        console.error('유저 정보 불러오기 실패:', err);
      } finally {
        setLoadingUser(false);
      }
    };
  
    fetchUser();
  }, []);
  

  useEffect(() => {
    if (!user?.id) return;  // 유저 id가 준비되었을 때만 실행
  
    const diaryUserId = String(user.id);   // 문자열로 변환 (API 요구사항)
    const digestUserId = String(user.id);  // Digest도 동일하게 적용
  
    getDiaryListByUser(diaryUserId)
      .then(data => setRecentPosts(data.slice(0, 4)))
      .catch(err => console.error('📌 일기 조회 실패:', err));
  
    getDigestListByUser(digestUserId)
      .then(data => setDigests(data.slice(0, 2)))
      .catch(err => console.error('📌 다이제스트 조회 실패:', err));
  }, [user?.id]);  // user.id가 변경될 때만 다시 실행
  

  const greeting = loadingUser
    ? '안녕하세요!'
    : user
    ? `안녕하세요, ${user.nickname}님.`
    : '안녕하세요, 손님!';

  return (
    <Container>
      <UserHeader/>
      <ContentContainer>
        <Inner>
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
              {recentPosts.map(post => (
                <PostCard
                  key={post.diaryId}
                  date={post.createdAt.slice(0, 10)}
                  emotion={post.emotionTag as EmotionType}
                  content={post.overallDaySummary}
                  postId={post.diaryId}
                  imageUrl={post.firstPhoto?.url}
                />
              ))}
            </CardRow>
            
            <SectionHeader>
              <SubTitle>다이제스트</SubTitle>
              <MoreLink onClick={() => navigate('/digest/list')}>
                더보기 &gt;
              </MoreLink>
            </SectionHeader>
            <CardColumn>
              {digests.map(d => (
                <DigestCard
                  key={d.id}
                  dateText={`${d.periodStart} ~ ${d.periodEnd}`}
                  title={d.title}
                  content={d.summary}
                  monthPath={d.periodStart.slice(0, 7)}
                  imageUrl={d.imageUrl|| ''}
                />
              ))}
            </CardColumn>
          </Content>
        </Inner>
      </ContentContainer>
    </Container>
  );
};


export default Home;

const Inner = styled.div`
  width: 100%;
  max-width: 1280px;     
  padding: 0 32px;        
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  max-width: 2000px;
  margin: 0 auto;
  padding: 24px 32px; 
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 48px;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
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
  display: flex;
  gap: 20px;
  margin-bottom: 2rem;
  justify-content: center;
`;

const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;
