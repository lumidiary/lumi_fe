/*
 * 일기 작성하기 페이지 (7)
 */

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BackHeader, Button, Card } from '@components/common/index';
import { ImageUrlsFromInputEvent } from '@utils/uploadImage';
import LeftArrow from '@/assets/left_arrow.svg?react';
import RightArrow from '@/assets/right_arrow.svg?react';

const DiaryImageUpload = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrls = ImageUrlsFromInputEvent(e, 4);
    setImages(imageUrls);
    setCurrentIndex(0);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleNextPage = () => {
    navigate('/create/content', { state: { images } });
  };

  return (
    <Container>
      <BackHeader title="일기 작성하기" />
      <ContentContainer>
        <Card style={{ width: '700px' }}>
          {images.length === 0 ? (
            <StepOne>
              <Title>사진 업로드</Title>
              <Sub>
                일기를 작성하려면 사진 1장 이상을 선택해주세요 (최대 4장)
              </Sub>
              <Button
                type="setting"
                buttonText="파일 선택"
                onClick={handleFileButtonClick}
              />
              <HiddenInput
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
              />
              <HintText>JPG, PNG 파일만 지원</HintText>
            </StepOne>
          ) : (
            <ImagePreviewWrapper>
              <PreviewTitle>업로드된 사진 ({images.length}/4)</PreviewTitle>
              <ImageFrame>
                <ImageElement
                  src={images[currentIndex]}
                  alt={`uploaded-${currentIndex}`}
                />
                {currentIndex > 0 && (
                  <ArrowButtonLeft onClick={handlePrev}>
                    <LeftArrow />
                  </ArrowButtonLeft>
                )}
                {currentIndex < images.length - 1 && (
                  <ArrowButtonRight onClick={handleNext}>
                    <RightArrow />
                  </ArrowButtonRight>
                )}
              </ImageFrame>
              <PageIndicator>
                {currentIndex + 1} / {images.length}
              </PageIndicator>
              <Button
                type="setting"
                buttonText="다음"
                style={{ width: '50%' }}
                onClick={handleNextPage}
              />
            </ImagePreviewWrapper>
          )}
        </Card>
      </ContentContainer>
    </Container>
  );
};

export default DiaryImageUpload;

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

const StepOne = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: bold;
`;

const Sub = styled.p`
  font-size: 0.875rem;
  color: #777;
  margin: 0.5rem 0 1.5rem;
`;

const HiddenInput = styled.input`
  display: none;
`;

const HintText = styled.p`
  margin-top: 0.75rem;
  font-size: 0.75rem;
  color: #888;
`;

const ImagePreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const PreviewTitle = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 2rem;
  align-self: flex-start;
`;

const ImageFrame = styled.div`
  width: 100%;
  height: 380px;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
`;

const ImageElement = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const ArrowButtonLeft = styled.div`
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const ArrowButtonRight = styled(ArrowButtonLeft)`
  left: auto;
  right: 0.5rem;
`;

const PageIndicator = styled.div`
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 4rem;
`;
