/*
 * 환경설정 프로필 이미지
 */

import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg';
import { MdModeEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface ProfileImageInfoProps {
  profileImageUrl?: string;
}

const ProfileImageInfo = ({ profileImageUrl }: ProfileImageInfoProps) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/profile-image');
  };

  return (
    <Wrapper>
      {profileImageUrl ? (
        <ProfileImage src={profileImageUrl} alt="프로필 이미지" />
      ) : (
        <CgProfile color="#d9d9d9" size={72} />
      )}
      <EditButton onClick={handleEditClick}>
        <MdModeEdit color="#fff" size={16} />
      </EditButton>
    </Wrapper>
  );
};

export default ProfileImageInfo;

const Wrapper = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;

const ProfileImage = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
`;

const EditButton = styled.button`
  position: absolute;
  bottom: 3px;
  right: -5px;
  width: 28px;
  height: 28px;
  background-color: #4b9cd3;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
