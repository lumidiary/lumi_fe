import styled from 'styled-components';
import LeftArrow from '@/assets/left_arrow.svg?react';
import RightArrow from '@/assets/right_arrow.svg?react';

interface ImageFrameProps {
  images: string[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
}

const ImageFrame = ({
  images,
  currentIndex,
  onPrev,
  onNext,
}: ImageFrameProps) => {
  const image = images[currentIndex];

  return (
    <Frame>
      <Image src={image} alt={`uploaded-${currentIndex}`} />
      {currentIndex > 0 && (
        <ArrowLeft onClick={onPrev}>
          <LeftArrow />
        </ArrowLeft>
      )}
      {currentIndex < images.length - 1 && (
        <ArrowRight onClick={onNext}>
          <RightArrow />
        </ArrowRight>
      )}
    </Frame>
  );
};

export default ImageFrame;

const Frame = styled.div`
  width: 100%;
  height: 380px;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const ArrowLeft = styled.div`
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const ArrowRight = styled(ArrowLeft)`
  left: auto;
  right: 0.5rem;
`;
