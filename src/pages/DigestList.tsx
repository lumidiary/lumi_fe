/*
 * 과거 다이제스트 목록 페이지
 */

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BackHeader, ContentContainer } from '@components/common';
import DigestCard from '@components/DigestCard';
import { getDigestListByUser } from '@/services/diary';
import { DigestItemType } from '@/types/diary';

const ITEMS_PER_PAGE = 3;

const DigestList = () => {
  const [digests, setDigests] = useState<DigestItemType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(digests.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = digests.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    getDigestListByUser(userId)
      .then((data: DigestItemType[]) => setDigests(data))
      .catch((err: unknown) =>
        console.error('다이제스트 목록 조회 실패:', err),
      );
  });

  return (
    <Container>
      <BackHeader title="과거 다이제스트 목록" />
      <ContentContainer>
        <Content>
          <CardColumn>
            {currentItems.length > 0 ? (
              currentItems.map(digest => (
                <DigestCard
                  key={digest.id}
                  digestId={String(digest.id)}
                  dateText={`${digest.periodStart} ~ ${digest.periodEnd}`}
                  title={digest.title}
                  content={digest.summary}
                  monthPath={digest.periodStart.slice(0, 7)}
                  imageUrl={digest.imageUrl}
                />
              ))
            ) : (
              <EmptyMessage>생성된 다이제스트가 없습니다.</EmptyMessage>
            )}
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

const EmptyMessage = styled.p`
  font-size: 0.95rem;
  color: #888;
  text-align: center;
  padding: 20px;
  width: 100%;
`;
