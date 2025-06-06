/*
 * 메인 페이지 - DigestCard 컴포넌트
 */

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface DigestCardProps {
  dateText: string;
  title: string;
  content: string;
  monthPath: string;
  imageUrl?: string;
}

const DigestCard = ({
  dateText,
  title,
  content,
  monthPath,
  imageUrl,
}: DigestCardProps) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <GraySection>
        {imageUrl && <Image src={imageUrl} alt="Digest Image" />}
      </GraySection>
      <WhiteSection>
        <DateText>{dateText}</DateText>
        <DigestTitle>{title}</DigestTitle>
        <ContentText>{content}</ContentText>
        <DetailLink onClick={() => navigate(`/digest/${monthPath}`)}>
          자세히 보기
        </DetailLink>
      </WhiteSection>
    </Wrapper>
  );
};

export default DigestCard;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1500px;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const GraySection = styled.div`
  width: 30%;
  background-color: #f5f5f5;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const WhiteSection = styled.div`
  width: 70%;
  background-color: #ffffff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const DateText = styled.p`
  font-size: 14px;
  font-weight: 500;
`;

const DigestTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

const ContentText = styled.p`
  margin: 12px 0;
  font-size: 14px;
  color: #444;
`;

const DetailLink = styled.span`
  color: #4b9cd3;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
`;
