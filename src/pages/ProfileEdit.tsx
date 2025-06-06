/*
 * 프로필 수정 페이지 (11)
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
import { validateYear, validateMonth, validateDay } from '@/utils/validation';
import {
  nicknameErrorMessage,
  yearErrorMessage,
  monthErrorMessage,
  dayErrorMessage,
} from '@/utils/validationMessages';
import Logo from '@assets/logo.svg?react';
import { requestPutFetch } from '@services/apiService';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [birthMessage, setBirthMessage] = useState('');

  const handleEdit = async () => {
    const year = parseInt(
      (document.getElementById('year') as HTMLInputElement)?.value,
    );
    const month = parseInt(
      (document.getElementById('month') as HTMLInputElement)?.value,
    );
    const day = parseInt(
      (document.getElementById('day') as HTMLInputElement)?.value,
    );
    const nickname = (
      document.getElementById('nickname') as HTMLInputElement
    )?.value.trim();

    let valid = true;

    if (!nickname) {
      setNicknameMessage(nicknameErrorMessage);
      valid = false;
    } else {
      setNicknameMessage('');
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

    const birthDate = `${year.toString().padStart(4, '0')}-${month
      .toString()
      .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    const data = {
      name: nickname,
      birthDate,
      theme: 'LIGHT',
    };

    try {
      await requestPutFetch('users/profile', data, 'tokenAndUserId');
      alert('프로필이 성공적으로 수정되었습니다.');
      navigate('/settings', { replace: true });
    } catch (error: any) {
      alert(`프로필 수정 실패: ${error?.message || error}`);
    }
  };

  return (
    <Container>
      <BackHeader title="프로필 수정" />
      <ContentContainer>
        <Card>
          <Logo />
          <Form>
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

            <Button
              type="login"
              buttonText="프로필 수정"
              onClick={handleEdit}
              style={{ marginTop: '3rem' }}
            />
          </Form>
        </Card>
      </ContentContainer>
    </Container>
  );
};

export default ProfileEdit;

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
