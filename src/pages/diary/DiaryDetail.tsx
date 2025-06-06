import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaRegTrashAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { LuCalendar } from 'react-icons/lu';
import { BackHeader, Card, ContentContainer } from '@components/common';
import ImageFrame from '@components/ImageFrame';
import DiaryDeleteModal from '@components/modal/DiaryDeleteModal';
import { emotionEmojiMap, EmotionType } from '@/types/emotion';
import { getDiaryDetail, deleteDiary } from '@/services/diary';
import { DiaryDetailType } from '@/types/diary';
import useAddressFromCoords from '@/hooks/useAddressFromCoords';

const DiaryDetail = () => {
  const { diaryId } = useParams<{ diaryId: string }>();
  const navigate = useNavigate();
  const [diary, setDiary] = useState<DiaryDetailType | null>(null);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 주소 훅
  const firstPhoto = diary?.photos?.[0];
  const locationName = useAddressFromCoords(
    firstPhoto?.latitude ?? 0,
    firstPhoto?.longitude ?? 0,
  );

  useEffect(() => {
    if (!diaryId) return;

    const fetchDiaryDetail = async () => {
      try {
        const res = await getDiaryDetail(diaryId);
        const mappedDiary: DiaryDetailType = {
          diaryId: res.diaryId,
          createdAt: res.createdAt,
          emotionTag: res.emotionTag,
          overallDaySummary: res.overallDaySummary,
          answers: res.answers,
          photos: res.photos,
        };
        setDiary(mappedDiary);
      } catch (err) {
        console.error('📌 일기 상세 조회 실패:', err);
      }
    };

    fetchDiaryDetail();
  }, [diaryId]);

  const handleDeleteDiary = async () => {
    if (!diary) return;
    try {
      await deleteDiary(diary.diaryId);
      alert('일기가 삭제되었습니다.');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setIsModalVisible(false);
    }
  };

  return (
    <Container>
      <BackHeader title="일기 상세보기" />
      {diary && (
        <ContentContainer>
          <Card style={{ width: '100%' }}>
            <PostInfo>
              <InfoBox>
                <TopRow>
                  <LeftSide>
                    <Emotion>
                      {emotionEmojiMap[diary.emotionTag as EmotionType]}
                    </Emotion>
                    <DateLocation>
                      <DateText>
                        <LuCalendar
                          size={18}
                          style={{ color: '#757575', marginRight: '8px' }}
                        />
                        {diary.createdAt.slice(0, 10)} (월요일)
                      </DateText>
                      <Location>
                        <FaMapMarkerAlt
                          size={20}
                          style={{ marginRight: '4px' }}
                        />
                        {locationName || '위치 정보 없음'}
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
              </InfoBox>

              <ImageFrame
                images={diary.photos.map(photo => photo.url)}
                currentIndex={currentImageIdx}
                onPrev={() =>
                  setCurrentImageIdx(
                    idx =>
                      (idx - 1 + diary.photos.length) % diary.photos.length,
                  )
                }
                onNext={() =>
                  setCurrentImageIdx(idx => (idx + 1) % diary.photos.length)
                }
              />
            </PostInfo>

            <Qa>
              {diary.answers
                .filter(q => q.answer && q.question) // answer가 존재하는 항목만
                .map((q, i) => (
                  <div key={i}>
                    <Question>Q. {q.question}</Question>
                    <Answer>{q.answer}</Answer>
                  </div>
                ))}
            </Qa>
          </Card>
        </ContentContainer>
      )}

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
