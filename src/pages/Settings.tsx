/*
 * 환경설정 페이지 (10)
 */

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BackHeader, Button, Card } from '@components/common/index';
import LogoutModal from '@components/modal/LogoutModal';
import DeleteAccountModal from '@components/modal/DeleteAccountModal';
import ProfileImageInfo from '@components/ProfileImageInfo';
import { requestDeleteFetch, requestGetFetch } from '@services/apiService';

interface UserInfo {
  username?: string;
  email?: string;
  birthdate?: string;
  profileImageUrl?: string;
}

const Setting = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await requestGetFetch('users/profile', 'tokenAndUserId');

        setUserInfo({
          username: data.name,
          email: data.email,
          birthdate: data.birthDate,
          profileImageUrl: data.profileImageUrl,
        });
      } catch (error) {
        console.error('프로필 정보를 불러오는 데 실패했습니다:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    setShowLogoutModal(false);
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      alert('로그인 정보가 없습니다.');
      return;
    }

    try {
      await requestDeleteFetch('users', 'tokenAndUserId');

      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      setShowDeleteModal(false);
      navigate('/login');
    } catch (error) {
      console.error('회원 탈퇴 중 오류 발생:', error);
    }
  };

  return (
    <Container>
      <BackHeader title="환경설정" />
      <ContentContainer>
        <Card style={{ width: '90%' }}>
          <InfoCard>
            <Title>사용자 정보</Title>
            <UserInfo>
              <ProfileImageInfo profileImageUrl={userInfo.profileImageUrl} />
              <TextGroup>
                <Username>{userInfo.username || 'username'}</Username>
                <Info>{userInfo.email || 'aaa@gmail.com'}</Info>
                <Info>생년월일: {userInfo.birthdate || '2000.01.01'}</Info>
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
