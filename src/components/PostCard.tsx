/*
 * 메인 페이지 - PostCard 컴포넌트
 */

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { emotionEmojiMap, EmotionType } from '@/types/emotion';

interface PostCardProps {
  date: string;
  emotion: EmotionType;
  content: string;
  postId: number;
  imageUrl?: string;
}

const PostCard = ({
  date,
  emotion,
  content,
  postId,
  imageUrl,
}: PostCardProps) => {
  const navigate = useNavigate();
  const emoji = emotionEmojiMap[emotion];

  return (
    <StyledPostCard>
      <PostCardGray>
        {imageUrl && <PostImage src={imageUrl} alt="Post" />}
        <DateBadge>
          {emoji} {date}
        </DateBadge>
      </PostCardGray>
      <PostCardWhite>
        <ContentText>{content}</ContentText>
        <DetailLink onClick={() => navigate(`/detail/${postId}`)}>
          자세히 보기
        </DetailLink>
      </PostCardWhite>
    </StyledPostCard>
  );
};

export default PostCard;

const StyledPostCard = styled.div`
  width: 320px;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const PostCardGray = styled.div`
  flex: 1;
  background-color: #f5f5f5;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px;
`;

const PostImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const PostCardWhite = styled.div`
  flex: 1;
  background-color: #ffffff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DateBadge = styled.div`
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
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
