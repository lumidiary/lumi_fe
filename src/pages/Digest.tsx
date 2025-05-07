/*
 * 다이제스트 (9)
 */

import styled from 'styled-components';

const Digest = () => {
  return (
    <Container>
      <Text>Digest</Text>
    </Container>
  );
};

export default Digest;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Text = styled.p`
  font-size: 24px;
  color: #333;
`;
