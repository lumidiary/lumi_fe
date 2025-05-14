/*
 * 회원가입 페이지 (3)
 */

import styled from 'styled-components';

const Signup = () => {
  return (
    <Container>
      <Text>Signup</Text>
    </Container>
  );
};

export default Signup;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Text = styled.p`
  font-size: 24px;
  color: #333;
`;
