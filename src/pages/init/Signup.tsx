/*
 * 회원가입 페이지 (3)
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  validateNickname,
  validatePassword,
  validateYear,
  validateMonth,
  validateDay,
} from '@/utils/validation';
import {
  emailErrorMessage,
  emailAvailableMessage,
  emailRequiredMessage,
  nicknameErrorMessage,
  nicknameAvailableMessage,
  nicknameRequiredMessage,
  passwordErrorMessage,
  yearErrorMessage,
  monthErrorMessage,
  dayErrorMessage,
} from '@/utils/validationMessages';
import Logo from '@assets/logo.svg?react';

const SignUp = () => {
  const navigate = useNavigate();
  const [emailMessage, setEmailMessage] = useState('');
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [birthMessage, setBirthMessage] = useState('');
  const [emailChecked, setEmailChecked] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);

  const handleEmailCheck = () => {
    const email = (document.getElementById('email') as HTMLInputElement)?.value;
    if (!validateEmail(email)) {
      setEmailMessage(emailErrorMessage);
      setEmailChecked(false);
    } else {
      setEmailMessage(emailAvailableMessage);
      setEmailChecked(true);
    }
  };

  const handleNicknameCheck = () => {
    const nickname = (document.getElementById('nickname') as HTMLInputElement)
      ?.value;
    if (!validateNickname(nickname)) {
      setNicknameMessage(nicknameErrorMessage);
      setNicknameChecked(false);
    } else {
      setNicknameMessage(nicknameAvailableMessage);
      setNicknameChecked(true);
    }
  };

  const handleSignUp = () => {
    const password = (document.getElementById('password') as HTMLInputElement)
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

    if (!nicknameChecked) {
      setNicknameMessage(nicknameRequiredMessage);
      valid = false;
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

    if (valid) {
      console.log('회원가입 요청');
      navigate('/login');
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
              <Input id="email" placeholder="Email을 입력하세요" />
              <Button
                type="request"
                buttonText="중복확인"
                onClick={handleEmailCheck}
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
            <Row>
              <Input id="nickname" placeholder="닉네임을 입력하세요" />
              <Button
                type="request"
                buttonText="중복확인"
                onClick={handleNicknameCheck}
              />
            </Row>
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
