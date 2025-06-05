/*
 * 일기 작성하기 페이지 (7)
 */

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  BackHeader,
  Button,
  Card,
  ContentContainer,
} from '@components/common/index';
import ImageFrame from '@components/ImageFrame';
import { createSession, startAnalysis } from '@/services/diaryapi';

const DiaryImageUpload = () => {
  const [images, setImages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    const selectedFiles = Array.from(fileList).slice(0, 4);
    const previewUrls = selectedFiles.map(file => URL.createObjectURL(file));

    setImages(previewUrls);
    setFiles(selectedFiles);
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

  const handleNextPage = async () => {
    if (files.length === 0) return;

    const fileNames = files.map(file => file.name);
    try {
      const diaryId = await createSession(fileNames, files);
      await startAnalysis(diaryId);
      navigate('/create/content', { state: { images, diaryId } });
    } catch (err) {
      console.error('이미지 업로드 또는 세션 생성 실패:', err);
      alert('이미지를 업로드하는 데 실패했습니다.');
    }
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
              <ImageFrame
                images={images}
                currentIndex={currentIndex}
                onPrev={handlePrev}
                onNext={handleNext}
              />
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

const PageIndicator = styled.div`
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 4rem;
`;
