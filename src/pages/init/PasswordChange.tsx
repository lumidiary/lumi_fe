/*
 * 비밀번호 찾기(변경) 페이지 (2)
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BackHeader, Button, Card, Input } from '@components/common/index';
import {
  validateEmail,
  validatePassword,
  confirmPasswordMatch,
} from '@/utils/validation';
import {
  emailErrorMessage,
  emailAvailableMessage,
  emailCertifiedMessage,
  passwordErrorMessage,
  passwordConfirmErrorMessage,
} from '@/utils/validationMessages';

const PasswordChange = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const [emailVerified, setEmailVerified] = useState(false);

  const handleEmailVerify = () => {
    if (!validateEmail(email)) {
      setEmailError(emailErrorMessage);
      setEmailVerified(false);
    } else {
      setEmailError(emailAvailableMessage);
      setEmailVerified(true);
    }
  };

  const handlePasswordChange = () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError(emailErrorMessage);
      valid = false;
    } else if (!emailVerified) {
      setEmailError(emailCertifiedMessage);
      valid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError(passwordErrorMessage);
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPasswordMatch(password, confirmPassword)) {
      setConfirmError(passwordConfirmErrorMessage);
      valid = false;
    } else {
      setConfirmError('');
    }

    if (valid) {
      console.log('비밀번호 변경 요청');
      navigate('/login');
    }
  };

  return (
    <Container>
      <BackHeader title="비밀번호 변경" />
      <ContentContainer>
        <Card>
          <Logo>Logo</Logo>
          <Form>
            <Label>Email</Label>
            <EmailRow>
              <Input
                placeholder="Email을 입력하세요"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Button
                type="request"
                buttonText="인증요청"
                onClick={handleEmailVerify}
              />
            </EmailRow>
            {emailError && <Message>{emailError}</Message>}

            <Label>Password 설정</Label>
            <Input
              type="password"
              placeholder="Password를 입력하세요"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {passwordError && <Message>{passwordError}</Message>}

            <Label>Password 확인</Label>
            <Input
              type="password"
              placeholder="Password를 다시 입력하세요"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            {confirmError && <Message>{confirmError}</Message>}

            <Button
              type="login"
              buttonText="비밀번호 변경"
              onClick={handlePasswordChange}
              style={{ marginTop: '3rem' }}
            />
          </Form>
        </Card>
      </ContentContainer>
    </Container>
  );
};

export default PasswordChange;

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

const Logo = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-weight: bold;
`;

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0.3rem;
  margin-top: 1rem;
`;

const EmailRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
`;

const Message = styled.p`
  font-size: 12px;
  color: #4b9cd3;
  margin-top: 0.3rem;
  margin-left: 0.2rem;
`;
