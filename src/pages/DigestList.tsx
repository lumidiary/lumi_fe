/*
 * 과거 다이제스트 목록 페이지
 */

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BackHeader, ContentContainer } from '@components/common';
import DigestCard from '@components/DigestCard';
import { getDigestListByUser } from '@/services/diary';
import { DigestItemType } from '@/types/diary';
import { requestGetFetch } from '@/services/apiService';
import { User } from '@/services/auth';  // User 타입 사용

const ITEMS_PER_PAGE = 6;

const DigestList = () => {
  const [digests, setDigests] = useState<DigestItemType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const totalPages = Math.ceil(digests.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = digests.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // ✅ user 정보 가져오기 (users/profile 호출)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await requestGetFetch('users/profile', 'tokenAndUserId');
        setUser({
          id: data.id,
          nickname: data.name,  // 또는 data.nickname
        });
      } catch (err) {
        console.error('유저 정보 불러오기 실패:', err);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ user.id 기반으로 DigestList 조회
  useEffect(() => {
    if (!user?.id) return;

    const digestUserId = String(user.id);

    getDigestListByUser(digestUserId)
      .then((data: DigestItemType[]) => setDigests(data))
      .catch((err: unknown) => console.error('다이제스트 목록 조회 실패:', err));
  }, [user?.id]);

  return (
    <Container>
      <BackHeader title="과거 다이제스트 목록" />
      <ContentContainer>
        <Content>
          <CardColumn>
            {currentItems.map(digest => (
              <DigestCard
                key={digest.id}
                dateText={`${digest.periodStart} ~ ${digest.periodEnd}`} 
                title={digest.title}
                content={digest.summary}
                monthPath={digest.periodStart.slice(0, 7)}
                imageUrl={digest.imageUrl}
              />
            ))}
          </CardColumn>

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
      </ContentContainer>
    </Container>
  );
};


export default DigestList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 17rem;
  margin-top: 1rem;
`;

const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
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
