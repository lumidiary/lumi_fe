/*
 * 과거 일기 목록 페이지 (5)
 */

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BackHeader, ContentContainer } from '@components/common';
import PostCard from '@components/PostCard';
import { EmotionType } from '@/types/emotion';
import { getDiaryListByUser } from '@/services/diary';
import { DiaryListItemType } from '@/types/diary';

const ITEMS_PER_PAGE = 6;

const DiaryList = () => {
  const [diaries, setDiaries] = useState<DiaryListItemType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(diaries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = diaries.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // ✅ userId 기반으로 일기 리스트 조회
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    getDiaryListByUser(userId)
      .then(data => setDiaries(data))
      .catch(err => console.error('일기 불러오기 실패:', err));
  });

  return (
    <Container>
      <BackHeader title="과거 일기 목록" />
      <ContentContainer>
        <Content>
          <Grid>
            {currentItems.length > 0 ? (
              currentItems.map((post, i) => (
                <PostCard
                  key={post.diaryId || i}
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
          </Grid>
          <Pagination>
            {Array.from({ length: totalPages }, (_, i) => (
              <PageButton
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                $active={currentPage === i + 1}
              >
                {i + 1}
              </PageButton>
            ))}
          </Pagination>
        </Content>
      </ContentContainer>
    </Container>
  );
};

export default DiaryList;

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
`;

const PageButton = styled.button<{ $active: boolean }>`
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  background-color: ${({ $active }) => ($active ? '#4B9CD3' : '#e0e0e0')};
  color: ${({ $active }) => ($active ? 'white' : '#333')};
  cursor: pointer;
`;

const EmptyMessage = styled.p`
  font-size: 0.95rem;
  color: #888;
  text-align: center;
  padding: 20px;
  width: 100%;
`;
