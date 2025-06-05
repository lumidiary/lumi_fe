/*
 * 과거 다이제스트 목록 페이지
 */

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BackHeader, ContentContainer } from '@components/common';
import DigestCard from '@components/DigestCard';

const ITEMS_PER_PAGE = 3;

const DigestList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [digests, setDigests] = useState<any[]>([]);

  const totalPages = Math.ceil(Math.max(digests.length, 1) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = digests.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchDigests = async () => {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        return;
      }

      try {
        const url = `https://api.lumidiary.com/core/digests/user/${userId}`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`HTTP 오류 발생: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) throw new Error('응답이 배열이 아닙니다.');

        const formatted =
          data.length > 0
            ? data.map((digest: any) => {
                const startDate = new Date(digest.periodStart);
                const endDate = new Date(digest.periodEnd);
                const startYear = startDate.getFullYear();
                const startMonth = (startDate.getMonth() + 1)
                  .toString()
                  .padStart(2, '0');
                const startDay = startDate
                  .getDate()
                  .toString()
                  .padStart(2, '0');
                const endYear = endDate.getFullYear();
                const endMonth = (endDate.getMonth() + 1)
                  .toString()
                  .padStart(2, '0');
                const endDay = endDate.getDate().toString().padStart(2, '0');

                return {
                  id: digest.id,
                  dateText: `${startYear}.${startMonth}.${startDay} ~ ${endYear}.${endMonth}.${endDay}`,
                  title: digest.title,
                  content: digest.summary,
                  monthPath: `${startYear}-${startMonth}`,
                  imageUrl: '',
                };
              })
            : [
                {
                  id: 'placeholder',
                  dateText: '날짜 없음',
                  title: '아직 작성된 다이제스트가 없습니다.',
                  content: '내용 없음',
                  monthPath: 'none',
                  imageUrl: '',
                },
              ];

        setDigests(formatted);
      } catch (err) {
        console.error('❗ 과거 다이제스트 목록 불러오기 실패:', err);
      }
    };

    fetchDigests();
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
                digestId={String(digest.id)}
              />
            ))}
          </CardColumn>

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

const PageButton = styled.button<{ $active: boolean }>`
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  background-color: ${({ $active }) => ($active ? '#4B9CD3' : '#e0e0e0')};
  color: ${({ $active }) => ($active ? 'white' : '#333')};
  cursor: pointer;
`;
