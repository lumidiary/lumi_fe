/*
 * 로그인 페이지 (1)
 */

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BackHeader, Button, Card, Input } from '@components/common/index';
import { useState } from 'react';
import {
  loginIdErrorMessage,
  loginPasswordErrorMessage,
} from '@/utils/validationMessages';
import Logo from '@assets/logo.svg?react';

const Login = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    let valid = true;

    if (!userId.trim()) {
      setIdError(loginIdErrorMessage);
      valid = false;
    } else {
      setIdError('');
    }

    if (!password) {
      setPasswordError(loginPasswordErrorMessage);
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      if (userId === 'gachon@gmail.com' && password === 'gachon123!') {
        console.log('로그인 성공');
        navigate('/');
      } else {
        setPasswordError('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    }
  };

  return (
    <Container>
      <BackHeader title="로그인" />
      <ContentContainer>
        <Card>
          <Logo />
          <Form>
            <Label>ID</Label>
            <Input
              placeholder="ID를 입력하세요"
              value={userId}
              onChange={e => setUserId(e.target.value)}
            />
            {idError && <Message>{idError}</Message>}

            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Password를 입력하세요"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {passwordError && <Message>{passwordError}</Message>}

            <Button
              type="login"
              buttonText="로그인"
              onClick={handleLogin}
              style={{ marginTop: '3rem' }}
            />
            <SignupLink onClick={() => navigate('/signup')}>
              회원가입하기
            </SignupLink>
            <ForgotPassword onClick={() => navigate('/password-change')}>
              비밀번호를 잊으셨나요?
            </ForgotPassword>
          </Form>
        </Card>
      </ContentContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0.3rem;
  margin-top: 1rem;
`;

const SignupLink = styled.a`
  font-size: 14px;
  color: #3399dd;
  margin-top: 1rem;
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
`;

const ForgotPassword = styled.p`
  font-size: 12px;
  color: #ccc;
  margin-top: 3rem;
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
`;

const Message = styled.p`
  font-size: 12px;
  color: #4b9cd3;
  margin-top: 0.3rem;
  margin-left: 0.2rem;
`;
