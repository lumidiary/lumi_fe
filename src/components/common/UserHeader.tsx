import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Logo from '@assets/logo_mini.svg?react';
import Button from './Button';
import { CgProfile } from 'react-icons/cg';

interface HeaderProps {
  username?: string;
  profileImageUrl?: string;
}

const UserHeader = ({ username, profileImageUrl }: HeaderProps) => {
  const navigate = useNavigate();

  // 임시 - api 연동 시 삭제
  username = 'test';
  profileImageUrl = '';

  return (
    <HeaderContainer>
      <Logo style={{ marginLeft: '10rem' }} />
      {username ? (
        <UserInfo onClick={() => navigate('/settings')}>
          {profileImageUrl ? (
            <ProfileImage src={profileImageUrl} alt="Profile" />
          ) : (
            <CgProfile
              size={32}
              color="#757575"
              style={{ marginRight: '0.5rem' }}
            />
          )}
          {username}님 환영합니다
        </UserInfo>
      ) : (
        <ButtonContainer>
          <Button
            buttonText="로그인"
            type="header_login"
            onClick={() => navigate('/login')}
          />
          <Button
            buttonText="회원가입"
            type="header_signup"
            onClick={() => navigate('/login')}
          />
        </ButtonContainer>
      )}
    </HeaderContainer>
  );
};

export default UserHeader;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
  background-color: #fff;
  border-bottom: 1px solid #d9d9d9;
`;

const ButtonContainer = styled.header`
  display: flex;
  gap: 1rem;
  margin-right: 10rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #757575;
  margin-right: 10rem;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 0.5rem;
  object-fit: cover;
`;
