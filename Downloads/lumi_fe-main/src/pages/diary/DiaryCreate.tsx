/*
 * 일기 작성하기 페이지 (7,8)
 */

import styled from 'styled-components';

const DiaryCreate = () => {
  return (
    <Container>
      <Text>DiaryCreate</Text>
    </Container>
  );
};

export default DiaryCreate;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Text = styled.p`
  font-size: 24px;
  color: #333;
`;
