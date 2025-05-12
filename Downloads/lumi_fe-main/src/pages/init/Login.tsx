/*
 * 로그인 페이지 (1)
 */

import styled from 'styled-components';

const Login = () => {
  return (
    <Container>
      <Text>Login</Text>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Text = styled.p`
  font-size: 24px;
  color: #333;
`;
