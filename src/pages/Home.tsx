/*
 * 메인 페이지 (4)
 */

import styled from 'styled-components';

const Home = () => {
  return (
    <Container>
      <Text>Home</Text>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Text = styled.p`
  font-size: 24px;
  color: #333;
`;
