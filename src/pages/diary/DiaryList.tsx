/*
 * 과거 일기 목록 페이지 (5)
 */

import styled from 'styled-components';

const DiaryList = () => {
  return (
    <Container>
      <Text>DiaryList</Text>
    </Container>
  );
};

export default DiaryList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Text = styled.p`
  font-size: 24px;
  color: #333;
`;
