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
import { requestGetFetch } from '@/services/apiService';
import { User } from '@/services/auth';

const ITEMS_PER_PAGE = 6;

const DiaryList = () => {
  const [diaries, setDiaries] = useState<DiaryListItemType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const totalPages = Math.ceil(diaries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = diaries.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // ✅ user.profile 호출해서 user 정보 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await requestGetFetch('users/profile', 'tokenAndUserId');
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

  // ✅ userId 기반으로 일기 리스트 조회
  useEffect(() => {
    if (!user?.id) return;

    const diaryUserId = String(user.id);
    

    getDiaryListByUser(diaryUserId)
      .then(data => setDiaries(data))
      .catch(err => console.error('일기 불러오기 실패:', err));
  }, [user?.id]);

  return (
    <Container>
      <BackHeader title="과거 일기 목록" />
      <ContentContainer>
        <Content>
          <Grid>
            {currentItems.map((post, i) => {
              console.log(' diaryId:', post.diaryId);
              return (
                <PostCard
                  key={post.diaryId || i}
                  date={post.createdAt.slice(0, 10)} // 날짜 형식: YYYY-MM-DD
                  emotion={post.emotionTag as EmotionType}
                  content={post.overallDaySummary}
                  postId={post.diaryId}
                  imageUrl={post.firstPhoto?.url}
                />
              );
            })}
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
