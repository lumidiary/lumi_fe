/*
 * 메인 페이지 (4)
 */
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCurrentUser, User } from '../services/auth'; // 추가

//
const Home = () => {
  const navigate = useNavigate();
  const month = new Date().toISOString().slice(0, 7); // '2025-05' 형식

  // ① 사용자 정보 조회
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
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

  // 임시 더미 데이터, 나중에 백엔드 api로 교체
  const recentPosts = [1, 2, 3, 4];
  const digests = [1, 2];

  return (
    <Container>
      <Content>
        {/*상단헤더*/}
        <Header>
          <Title>{greeting} 오늘 하루는 어땠나요?</Title>
          <WriteButton onClick={() => navigate('/create')}>
            + 일기 작성하기
          </WriteButton>{' '}
          {/* ✅ App에 맞게 수정 */}
        </Header>

        {/*최근글 섹션 */}
        <SectionHeader>
          <h2>최근 글</h2>
          <MoreLink onClick={() => navigate('/list')}>
            더보기 &gt;
          </MoreLink>{' '}
          {/* ✅ App에 맞게 수정 */}
        </SectionHeader>
        <CardRow>
          {recentPosts.map((_, i) => (
            <PostCard key={i}>
              {/* 상단 회색 영역 */}
              <PostCardGray>
                <DateBadge>😊 2025.05.05 (월요일)</DateBadge>
              </PostCardGray>

              {/* 하단 흰색 영역 */}
              <PostCardWhite>
                <ContentText>
                  오늘 하루는 날씨가 좋아서 기분이 좋았어요. 친구들과 커피숍에서
                  만나 오랜만에 이야기를 나눴습니다.
                </ContentText>
                <DetailLink onClick={() => navigate('/detail/1')}>
                  자세히 보기
                </DetailLink>
              </PostCardWhite>
            </PostCard>
          ))}
        </CardRow>

        {/*다이제스트 섹션*/}
        <SectionHeader>
          <h2>다이제스트</h2>
          <MoreLink onClick={() => navigate(`/digest/${month}`)}>
            더보기 &gt;
          </MoreLink>{' '}
          {/* ✅ App에 맞게 수정 */}
        </SectionHeader>
        <CardColumn>
          {digests.map((_, i) => (
            <DigestCard key={i}>
              {/* 왼쪽 회색 정사각 기둥 */}
              <DigestCardGray />

              {/* 오른쪽 흰색 직사각 */}
              <DigestCardWhite>
                <DateText>2025년 5월</DateText>
                <DigestTitle>5월 다이제스트</DigestTitle>
                <ContentText>
                  이번 달은 새로운 시작과 함께 많은 변화가 있었어요. 특히 주말에
                  자주 외출하며 활동적인 시간을 보냈습니다.
                </ContentText>
                <DetailLink onClick={() => navigate(`/digest/${month}`)}>
                  자세히 보기
                </DetailLink>
              </DigestCardWhite>
            </DigestCard>
          ))}
        </CardColumn>
      </Content>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  background-color: #f9fafb;
  width: 100%;
  min-height: 100vh;
`;
const Content = styled.div`
  max-width: 1200px; /* 원하는 최대 넓이 */
  margin: 0 auto; /* 상하 0, 좌우 자동 여백으로 중앙 정렬 */
  padding: 40px 20px; /* 위아래 40px, 좌우 20px 여유 */
  display: flex;
  flex-direction: column;
  gap: 50px; /* 섹션 간 기본 간격 */
`;

// const Text = styled.p`
//   font-size: 24px;
//   color: #333;
// `;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;

const WriteButton = styled.button`
  padding: 10px 16px;
  background-color: #4b9cd3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

// 공통
const SectionBox = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PostCard = styled.div`
  width: 300px;
  height: 300px; /* 정사각형 */
  border-radius: 12px;
  overflow: hidden; /* 하단 흰박스가 둥근 모서리를 벗어나지 않도록 */
  display: flex;
  flex-direction: column;
`;

// 상단 회색 영역
const PostCardGray = styled.div`
  flex: 1; /* 카드 높이의 절반 차지 */
  background-color: #f5f5f5;
  display: flex;
  align-items: flex-start; /* 상단 왼쪽에 DateBadge 배치 */
  padding: 16px;
`;

// 하단 흰색 영역
const PostCardWhite = styled.div`
  flex: 1; /* 카드 높이의 절반 차지 */
  background-color: #ffffff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// 날짜만 흰 배경으로
const DateBadge = styled.div`
  background: #ffffff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  display: inline-block;
`;

// 다이제스트 카드
const DigestCard = styled.div`
  display: flex;
  width: 100%;
  max-width: 1500px;
  height: 300px; /* 높이는 디자인에 맞게 조절 */
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px; /* 카드 간 간격 */
`;

// 왼쪽 회색 정사각
const DigestCardGray = styled.div`
  width: 30%;
  background-color: #f5f5f5;
`;

// 오른쪽 흰색 직사각
const DigestCardWhite = styled.div`
  width: 70%;
  background-color: #ffffff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// 제목 스타일 (h3 대체)
const DigestTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MoreLink = styled.span`
  color: #4b9cd3;
  cursor: pointer;
  font-weight: 500;
`;

const CardRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  justify-content: center;
`;

const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const DateText = styled.p`
  font-size: 14px;
  font-weight: 500;
`;

const ContentText = styled.p`
  margin: 12px 0;
  font-size: 14px;
  color: #444;
`;

const DetailLink = styled.span`
  color: #4b9cd3;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
`;
