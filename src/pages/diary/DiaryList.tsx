/*
 * 과거 일기 목록 페이지 (5)
 */

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getDiaryList } from '@services/diary';
import { Diary } from '@/types/diary';

const ITEMS_PER_PAGE = 15;

const DiaryList = () => {
  const navigate = useNavigate();
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 더미 데이터
    const dummyDiaries: Diary[] = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      date: '2025-05-05',
      content:
        '오늘 하루는 날씨가 좋아서 기분이 좋았어요. 친구들과 카페에서 만나 오랜만에 이야기를 나눴습니다.',
      emotion: '😊',
      imageUrl: [''],
      location: '서울시 성북구',
      tags: ['카페', '친구', '산책'],
      questions: [
        { question: '오늘 기분이 어땠나요?', answer: '매우 좋았어요!' }, // 질문 추가
      ],
    }));
    setDiaries(dummyDiaries);
    setLoading(false);
  }, []);

  const totalPages = Math.ceil(diaries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = diaries.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) return <Container>로딩 중...</Container>;
  if (error) return <Container>오류 발생: {error}</Container>;

  return (
    <Container>
      <Content>
        <Header>
          <Title>과거 일기 목록</Title>
          <BackButton onClick={() => navigate(-1)}>&larr; 뒤로</BackButton>
        </Header>

        <Grid>
          {currentItems.map(diary => (
            <PostCard
              key={diary.id}
              onClick={() => navigate(`/detail/${diary.id}`)}
            >
              <PostCardGray>
                <DateBadge>
                  {diary.emotion} {diary.date} (월요일)
                </DateBadge>
              </PostCardGray>
              <PostCardWhite>
                <ContentText>{diary.content}</ContentText>
                <DetailLink>자세히 보기</DetailLink>
              </PostCardWhite>
            </PostCard>
          ))}
        </Grid>

        <Pagination>
          {Array.from({ length: totalPages }, (_, i) => (
            <PageButton
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              active={currentPage === i + 1}
            >
              {i + 1}
            </PageButton>
          ))}
        </Pagination>
      </Content>
    </Container>
  );
};

export default DiaryList;

const Container = styled.div`
  background-color: #f9fafb;
  width: 100%;
  min-height: 100vh;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 500;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

const PostCard = styled.div`
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const PostCardGray = styled.div`
  flex: 1;
  background-color: #f5f5f5;
  display: flex;
  align-items: flex-start;
  padding: 16px;
`;

const PostCardWhite = styled.div`
  flex: 1;
  background-color: #ffffff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DateBadge = styled.div`
  background: #ffffff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
`;

const ContentText = styled.p`
  font-size: 14px;
  color: #444;
`;

const DetailLink = styled.span`
  color: #4b9cd3;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
`;

const PageButton = styled.button<{ active: boolean }>`
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  background-color: ${({ active }) => (active ? '#4B9CD3' : '#e0e0e0')};
  color: ${({ active }) => (active ? 'white' : '#333')};
  cursor: pointer;
`;
