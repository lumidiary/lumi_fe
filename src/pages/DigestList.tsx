/*
 * 과거 다이제스트 목록 페이지
 */

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BackHeader, ContentContainer } from '@components/common';
import DigestCard from '@components/DigestCard';
import { pastDigests } from '@constants/dummy';

const ITEMS_PER_PAGE = 3;

const DigestList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(pastDigests.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = pastDigests.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <BackHeader title="과거 다이제스트 목록" />
      <ContentContainer>
        <Content>
          <CardColumn>
            {currentItems.map(digest => (
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
