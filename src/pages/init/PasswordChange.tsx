/*
 * 비밀번호 찾기(변경) 페이지 (2)
 */

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  BackHeader,
  Button,
  Card,
  Input,
  ContentContainer,
} from '@components/common';
import { validateEmail, validatePassword } from '@/utils/validation';
import {
  emailErrorMessage,
  emailRequiredMessage,
  passwordErrorMessage,
} from '@/utils/validationMessages';
import Logo from '@assets/logo.svg?react';
import { parseJwt } from '@/utils/parseJwt';

const PasswordChange = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [submitErrorMessage, setSubmitErrorMessage] = useState('');
  const [emailChecked, setEmailChecked] = useState(false);
  const [isVerifiedFromToken, setIsVerifiedFromToken] = useState(false);
  const [verifyTokenState, setVerifyTokenState] = useState<string | null>(null);
  const [emailToggled, setEmailToggled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('verifyToken');

    if (token) {
      const payload = parseJwt(token);
      const emailFromToken = payload?.sub;

      if (emailFromToken) {
        const emailInput = document.getElementById('email') as HTMLInputElement;
        if (emailInput) emailInput.value = emailFromToken;
      }

      setVerifyTokenState(token);
      setIsVerifiedFromToken(true);
      setEmailChecked(true);
      setEmailMessage('이메일 인증이 완료되었습니다.');
    }
  }, [location.search]);

  const handleEmailCheck = async () => {
    const email = (document.getElementById('email') as HTMLInputElement)?.value;

    if (!validateEmail(email)) {
      setEmailMessage(emailErrorMessage);
      setEmailChecked(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/users/password-reset/request`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        },
      );

      if (!response.ok) {
        throw new Error('이메일 인증 요청 실패');
      }

      const result = await response.text();
      setEmailMessage(
        result || '인증 메일이 발송되었습니다. 메일함을 확인해주세요.',
      );
      setEmailChecked(true);

      if (!emailToggled) {
        setEmailToggled(true);
      }
    } catch (error) {
      console.error('이메일 인증 요청 실패:', error);
      setEmailMessage('이메일 인증 요청 중 오류가 발생했습니다.');
      setEmailChecked(false);
    }
  };

  const handlePasswordChange = async () => {
    const password = (document.getElementById('password') as HTMLInputElement)
      ?.value;

    let valid = true;

    if (!emailChecked) {
      setEmailMessage(emailRequiredMessage);
      valid = false;
    }

    if (!validatePassword(password)) {
      setPasswordMessage(passwordErrorMessage);
      valid = false;
    } else {
      setPasswordMessage('');
    }

    if (!verifyTokenState) {
      setSubmitErrorMessage('토큰이 유효하지 않습니다.');
      valid = false;
    }

    if (!valid) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/users/password-reset/confirm`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: verifyTokenState,
            newPassword: password,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      navigate('/login', { replace: true });
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
      setSubmitErrorMessage(
        '비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요.',
      );
    }
  };

  return (
    <Container>
      <BackHeader title="비밀번호 변경" />
      <ContentContainer>
        <Card>
          <Logo />
          <Form>
            <Label>Email</Label>
            <EmailRow>
              <Input
                id="email"
                placeholder="Email을 입력하세요"
                disabled={isVerifiedFromToken}
                readOnly={isVerifiedFromToken}
              />
              <Button
                type="request"
                buttonText="인증요청"
                onClick={handleEmailCheck}
                isDisabled={isVerifiedFromToken}
                isToggled={emailToggled}
              />
            </EmailRow>
            {emailMessage && <Message>{emailMessage}</Message>}

            <Label>새 Password 설정</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password를 입력하세요"
            />
            {passwordMessage && <Message>{passwordMessage}</Message>}
            {submitErrorMessage && <Message>{submitErrorMessage}</Message>}

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

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
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
