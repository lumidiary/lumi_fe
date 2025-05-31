/*
 * 메인 페이지 (4)
 */

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCurrentUser, User } from '../services/auth';
import { UserHeader, ContentContainer, Button } from '@components/common';
import { PostCard, DigestCard } from '@components/index';
import { recentPosts, digests } from '@constants/dummy'; // 임시 더미 데이터

const Home = () => {
  const navigate = useNavigate();

  // ① 사용자 정보 조회
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    getCurrentUser()
      .then(u => setUser(u))
      .catch(err => console.error(err))
      .finally(() => setLoadingUser(false));
  }, []);

  // 인사말 로직직
  const greeting = loadingUser
    ? '안녕하세요!'
    : user
      ? `안녕하세요, ${user.nickname}님.`
      : '안녕하세요, 손님!';

  return (
    <Container>
      <UserHeader />
      <ContentContainer>
        <Content>
          {/*상단헤더*/}
          <Header>
            <Title>{greeting} 오늘 하루는 어땠나요?</Title>
            <Button
              type="setting"
              buttonText="+ 일기 작성하기"
              onClick={() => navigate('/create/image-upload')}
            />
            {/* ✅ App에 맞게 수정 */}
          </Header>

          {/*최근글 섹션 */}
          <SectionHeader>
            <SubTitle>최근 글</SubTitle>
            <MoreLink onClick={() => navigate('/diary/list')}>
              더보기 &gt;
            </MoreLink>{' '}
            {/* ✅ App에 맞게 수정 */}
          </SectionHeader>
          <CardRow>
            {recentPosts.map(post => (
              <PostCard
                key={post.id}
                date={post.date}
                emotion={post.emotion}
                content={post.content}
                postId={post.id}
                imageUrl={post.imageUrl}
              />
            ))}
          </CardRow>

          {/*다이제스트 섹션*/}
          <SectionHeader>
            <SubTitle>다이제스트</SubTitle>
            <MoreLink onClick={() => navigate('/digest/list')}>
              더보기 &gt;
            </MoreLink>
            {/* ✅ App에 맞게 수정 */}
          </SectionHeader>
          <CardColumn>
            {digests.map(digest => (
              <DigestCard
                key={digest.id}
                dateText={digest.dateText}
                title={digest.title}
                content={digest.content}
                monthPath={digest.monthPath}
                imageUrl={digest.imageUrl}
              />
            ))}
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
