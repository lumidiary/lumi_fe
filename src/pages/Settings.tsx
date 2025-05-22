/*
 * 환경설정 페이지 (10)
 */

import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BackHeader, Button, Card } from '@components/common/index';
import { CgProfile } from 'react-icons/cg';
import LogoutModal from '@components/modal/LogoutModal';
import DeleteAccountModal from '@components/modal/DeleteAccountModal';

interface UserInfo {
  username?: string;
  email?: string;
  birthdate?: string;
  profileImageUrl?: string;
}

// api 연결 시 수정 예정
const Setting = ({
  username = 'aaaaaaaaaa',
  email = 'aaa@naver.com',
  birthdate = '2000년 5월 23일',
  profileImageUrl,
}: UserInfo) => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(false);
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    console.log('회원 탈퇴 처리');
  };
  return (
    <Container>
      <BackHeader title="환경설정" />
      <ContentContainer>
        <Card style={{ width: '90%' }}>
          <InfoCard>
            <Title>사용자 정보</Title>
            <UserInfo>
              {profileImageUrl ? (
                <ProfileImage src={profileImageUrl} alt="프로필 이미지" />
              ) : (
                <CgProfile color="#d9d9d9" size={72} />
              )}
              <TextGroup>
                <Username>{username}</Username>
                <Info>{email}</Info>
                <Info>생년월일: {birthdate}</Info>
              </TextGroup>
            </UserInfo>
            <ButtonWrapper>
              <Button
                type="setting"
                buttonText="프로필 수정"
                onClick={() => navigate('/profile-edit')}
              />
              <Button
                type="setting"
                buttonText="로그아웃"
                bgColor="#d9d9d9"
                onClick={() => setShowLogoutModal(true)}
              />
            </ButtonWrapper>
          </InfoCard>

          <WithdrawCard>
            <WithdrawTitle>회원 탈퇴</WithdrawTitle>
            <WithdrawDescription>
              탈퇴 시 계정은 비활성화되며, 30일 후 데이터가 자동 삭제됩니다.
            </WithdrawDescription>
            <Button
              type="setting"
              buttonText="회원 탈퇴하기"
              bgColor="#e53e3e"
              onClick={() => setShowDeleteModal(true)}
            />
          </WithdrawCard>
        </Card>
      </ContentContainer>

      <LogoutModal
        isVisible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={handleLogout}
      />
      <DeleteAccountModal
        isVisible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteAccount}
      />
    </Container>
  );
};

export default Setting;

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
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const InfoCard = styled.div`
  width: 90%;
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #ececec;
`;

const Title = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
`;

const Username = styled.div`
  font-weight: bold;
  font-size: 1rem;
`;

const Info = styled.div`
  color: #777;
  font-size: 0.8rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 1rem;
`;

const WithdrawCard = styled.div`
  width: 90%;
  background: #fff5f5;
  border: 1px solid #f5c2c2;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const WithdrawTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  color: #c53030;
  margin-bottom: 0.8rem;
`;

const WithdrawDescription = styled.p`
  font-size: 0.8rem;
  color: #c53030;
  margin-bottom: 1rem;
`;
