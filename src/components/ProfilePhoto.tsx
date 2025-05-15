import { useRef, useState } from 'react';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';
import { convertToImageUrl } from '@/utils/uploadImage';

const ProfilePhoto = () => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await convertToImageUrl(file);
        setImage(imageUrl);
      } catch (error) {
        console.error('이미지 로드 오류:', error);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <ProfileContainer>
      <ProfileCircle
        style={{ backgroundImage: image ? `url(${image})` : undefined }}
      >
        <PlusIcon onClick={handleClick}>
          <FiPlus size={18} color="#fff" />
        </PlusIcon>
        <HiddenInput
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </ProfileCircle>
      <ProfileLabel>프로필 사진</ProfileLabel>
    </ProfileContainer>
  );
};

export default ProfilePhoto;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ProfileCircle = styled.div`
  width: 80px;
  height: 80px;
  background-color: #e0e0e0;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlusIcon = styled.div`
  position: absolute;
  bottom: 0;
  right: -8px;
  width: 28px;
  height: 28px;
  background-color: #4b9cd3;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ProfileLabel = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #666;
`;
