/*
 * 일기 상세보기 (6)
 */

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaRegTrashAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { LuCalendar } from 'react-icons/lu';
import { BackHeader, Card, ContentContainer } from '@components/common';
import ImageFrame from '@components/ImageFrame';
import DiaryDeleteModal from '@components/modal/DiaryDeleteModal';
import { postDetail } from '@constants/dummy';
import { emotionEmojiMap, EmotionType } from '@/types/emotion';

const DiaryDetail = () => {
  const { diaryId } = useParams<{ diaryId: string }>();
  const navigate = useNavigate();
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const diary = {
    ...postDetail,
    id: Number(diaryId),
  };

  const handleDeleteDiary = () => {
    setIsModalVisible(false);
    navigate('/', { replace: true });
  };

  return (
    <Container>
      <BackHeader title="일기 상세보기" />
      <ContentContainer>
        <Card style={{ width: '100%' }}>
          <PostInfo>
            <InfoBox>
              <TopRow>
                <LeftSide>
                  <Emotion>
                    {emotionEmojiMap[diary.emotion as EmotionType]}
                  </Emotion>
                  <DateLocation>
                    <DateText>
                      <LuCalendar
                        size={18}
                        style={{ color: '#757575', marginRight: '8px' }}
                      />
                      {diary.date} (월요일)
                    </DateText>
                    <Location>
                      <FaMapMarkerAlt
                        size={20}
                        style={{ marginRight: '4px' }}
                      />
                      {diary.location}
                    </Location>
                  </DateLocation>
                </LeftSide>

                <FaRegTrashAlt
                  size={24}
                  color="#6B7280"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setIsModalVisible(true)}
                />
              </TopRow>

              <TagList>
                {diary.tags.map((t, i) => (
                  <Tag key={i}>{t}</Tag>
                ))}
              </TagList>
            </InfoBox>

            <ImageFrame
              images={diary.imageUrl}
              currentIndex={currentImageIdx}
              onPrev={() =>
                setCurrentImageIdx(
                  idx =>
                    (idx - 1 + diary.imageUrl.length) % diary.imageUrl.length,
                )
              }
              onNext={() =>
                setCurrentImageIdx(idx => (idx + 1) % diary.imageUrl.length)
              }
            />
          </PostInfo>

          <Qa>
            {diary.questions.map((q, i) => (
              <div key={i}>
                <Question>Q. {q.question}</Question>
                <Answer>{q.answer}</Answer>
              </div>
            ))}
          </Qa>
        </Card>
      </ContentContainer>

      <DiaryDeleteModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onDelete={handleDeleteDiary}
      />
    </Container>
  );
};

export default DiaryDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const PostInfo = styled.div`
  position: relative;
  width: 100%;
`;

const InfoBox = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 1rem;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

const LeftSide = styled.div`
  display: flex;
  gap: 12px;
`;

const Emotion = styled.span`
  font-size: 2rem;
`;

const DateLocation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DateText = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
  color: #000;
  display: flex;
  align-items: center;
`;

const Location = styled.span`
  font-size: 0.8rem;
  color: #757575;
  display: flex;
  align-items: center;
`;

const TagList = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: #4b9cd3;
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
`;

const Qa = styled.div`
  width: 100%;
  flex-direction: column;
`;

const Question = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #4b9cd3;
`;

const Answer = styled.p`
  font-size: 0.8rem;
  line-height: 1.6;
  color: #374151;
`;
