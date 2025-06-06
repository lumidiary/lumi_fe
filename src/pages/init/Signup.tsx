/*
 * 회원가입 페이지 (3)
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
import {
  validateEmail,
  validatePassword,
  validateYear,
  validateMonth,
  validateDay,
} from '@/utils/validation';
import {
  emailErrorMessage,
  emailRequiredMessage,
  nicknameErrorMessage,
  passwordErrorMessage,
  yearErrorMessage,
  monthErrorMessage,
  dayErrorMessage,
} from '@/utils/validationMessages';
import Logo from '@assets/logo.svg?react';
import { parseJwt } from '@/utils/parseJwt';
import { requestPostFetch } from '@services/apiService';

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [emailMessage, setEmailMessage] = useState('');
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [birthMessage, setBirthMessage] = useState('');
  const [emailChecked, setEmailChecked] = useState(false);
  const [isVerifiedFromToken, setIsVerifiedFromToken] = useState(false);
  const [verifyTokenState, setVerifyTokenState] = useState<string | null>(null);
  const [emailToggled, setEmailToggled] = useState(false);
  const [signUpErrorMessage, setSignUpErrorMessage] = useState('');

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
        `${import.meta.env.VITE_SERVER_URL}/users/email/verify`,
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

  const handleSignUp = async () => {
    const email = (document.getElementById('email') as HTMLInputElement)?.value;
    const password = (document.getElementById('password') as HTMLInputElement)
      ?.value;
    const name = (document.getElementById('nickname') as HTMLInputElement)
      ?.value;

    const year = parseInt(
      (document.getElementById('year') as HTMLInputElement)?.value,
    );
    const month = parseInt(
      (document.getElementById('month') as HTMLInputElement)?.value,
    );
    const day = parseInt(
      (document.getElementById('day') as HTMLInputElement)?.value,
    );

    let valid = true;

    if (!emailChecked) {
      setEmailMessage(emailRequiredMessage);
      valid = false;
    }

    if (!name) {
      setNicknameMessage(nicknameErrorMessage);
      valid = false;
    } else {
      setNicknameMessage('');
    }

    if (!validatePassword(password)) {
      setPasswordMessage(passwordErrorMessage);
      valid = false;
    } else {
      setPasswordMessage('');
    }

    if (!validateYear(year)) {
      setBirthMessage(yearErrorMessage);
      valid = false;
    } else if (!validateMonth(month)) {
      setBirthMessage(monthErrorMessage);
      valid = false;
    } else if (!validateDay(year, month, day)) {
      setBirthMessage(dayErrorMessage);
      valid = false;
    } else {
      setBirthMessage('');
    }

    if (!valid) return;

    const birthDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const requestBody = {
      email,
      pwd: password,
      name,
      birthDate,
      token: verifyTokenState,
    };

    console.log('회원가입 요청 데이터:', requestBody);

    try {
      await requestPostFetch('/users/signup', requestBody, 'none');
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('회원가입 실패:', error);
      setSignUpErrorMessage(
        '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.',
      );
    }
  };

  return (
    <Container>
      <BackHeader title="회원가입" />
      <ContentContainer>
        <Card>
          <Logo />
          <Form>
            <Label>Email</Label>
            <Row>
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
            </Row>
            {emailMessage && <Message>{emailMessage}</Message>}

            <Label>Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password를 입력하세요"
            />
            {passwordMessage && <Message>{passwordMessage}</Message>}

            <Label>Nickname</Label>
            <Input id="nickname" placeholder="닉네임을 입력하세요" />
            {nicknameMessage && <Message>{nicknameMessage}</Message>}

            <Label>생년월일</Label>
            <BirthRow>
              <Input
                id="year"
                placeholder="년"
                type="number"
                style={{ width: '100px' }}
              />
              <Input
                id="month"
                placeholder="월"
                type="number"
                style={{ width: '100px' }}
              />
              <Input
                id="day"
                placeholder="일"
                type="number"
                style={{ width: '100px' }}
              />
            </BirthRow>
            {birthMessage && <Message>{birthMessage}</Message>}
            {signUpErrorMessage && <Message>{signUpErrorMessage}</Message>}

            <Button
              type="login"
              buttonText="회원가입"
              onClick={handleSignUp}
              style={{ marginTop: '3rem' }}
            />
          </Form>
        </Card>
      </ContentContainer>
    </Container>
  );
};

export default SignUp;

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
  margin-top: 2rem;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0.3rem;
  margin-top: 1rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
`;

const BirthRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

const Message = styled.p`
  font-size: 12px;
  color: #4b9cd3;
  margin-top: 0.3rem;
  margin-left: 0.2rem;
`;
