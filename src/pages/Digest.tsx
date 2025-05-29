import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import KakaoMap from '@/components/KakaoMap';
import { BackHeader, ContentContainer } from '@components/common';
import {
  DigestDiaryCard,
  DigestRecordCard,
  EmotionStatList,
} from '@components/index';

const Digest = () => {
  const [activeTab, setActiveTab] = useState<'diary' | 'stats'>('diary');
  const [digestData, setDigestData] = useState<any>(null);
  const [records, setRecords] = useState<any[]>([]);
  const [detailedDiaries, setDetailedDiaries] = useState<any[]>([]);
  const { month, digestId } = useParams();

  const yearMonthText = (() => {
    if (!month) return '날짜 없음';
    const [year, m] = month.split('-');
    return `${year}년 ${parseInt(m)}월`;
  })();

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchDigest = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/core/digests/${digestId}`,
        );
        const data = await res.json();
        setDigestData(data);
        setRecords([
          { title: '이번 달 활동', content: data.activity },
          { title: '이번 달 감정', content: data.emotionTrend },
          { title: '이번 달 특별했던 순간', content: data.specialMoment },
        ]);

        const detailed = await Promise.all(
          data.entries.slice(0, 3).map(async (entry: any) => {
            const [diaryRes, imageRes] = await Promise.all([
              fetch(`/core/diaries/${entry.diaryId}`).then(r => r.json()),
              fetch(`/core/images/session/${entry.diaryId}`).then(r =>
                r.json(),
              ),
            ]);

            return {
              ...entry,
              imageUrl: imageRes.imgPars?.[0]?.accessUri || '',
              prompt: diaryRes.questions?.[0]?.question || '',
              answer: diaryRes.questions?.[0]?.answer || '',
              capturedAt: diaryRes.capturedAt,
              address: diaryRes.address,
            };
          }),
        );

        setDetailedDiaries(detailed);
      } catch (err) {
        console.error('다이제스트 불러오기 실패:', err);
      }
    };

    fetchDigest();
  }, [digestId]);

  const places =
    digestData?.entries?.map((entry: any) => ({
      lat: entry.latitude,
      lng: entry.longitude,
      placeName: entry.summary,
    })) || [];

  const defaultEmotionStats = [
    { emoji: '😊', count: 0, label: '행복' },
    { emoji: '😁', count: 0, label: '기쁨' },
    { emoji: '😐', count: 0, label: '보통' },
    { emoji: '😠', count: 0, label: '화남' },
    { emoji: '😭', count: 0, label: '슬픔' },
  ];

  return (
    <Container>
      <BackHeader title="다이제스트 상세보기" />
      <ContentContainer>
        <Wrapper>
          <SummaryCard>
            <CardTopBackground>
              <TitleBox>
                <DateText>{yearMonthText}</DateText>
                <CardTitle>{yearMonthText} 다이제스트</CardTitle>
              </TitleBox>
            </CardTopBackground>
            <EmotionBlock>
              <EmotionRow>
                <Emoji>{digestData?.overallEmotion || '😊'}</Emoji>
                <BoldText>
                  {digestData?.summaryEmotion || '이번 달은 행복한 달이었어요!'}
                </BoldText>
              </EmotionRow>
              <DescText>
                총 {digestData?.entries?.length || 0}회의 일기를 작성했습니다.
              </DescText>
              {digestData?.summary && (
                <DescText style={{ marginTop: '8px', whiteSpace: 'pre-line' }}>
                  {digestData.summary}
                </DescText>
              )}
            </EmotionBlock>
          </SummaryCard>

          <RecordSection>
            <SectionTitle>AI가 분석한 이번 달의 기록</SectionTitle>
            <RecordList>
              {[0, 1, 2].map(i => (
                <DigestRecordCard
                  key={i}
                  index={i}
                  title={records[i]?.title || `제목 없음 ${i + 1}`}
                  content={records[i]?.content || '아직 내용이 없습니다.'}
                />
              ))}
            </RecordList>
          </RecordSection>

          <TabWrapper>
            <TabButton
              active={activeTab === 'diary'}
              onClick={() => setActiveTab('diary')}
            >
              작성한 일기
            </TabButton>
            <TabButton
              active={activeTab === 'stats'}
              onClick={() => setActiveTab('stats')}
            >
              통계
            </TabButton>
          </TabWrapper>

          <TabContent>
            {activeTab === 'diary' && (
              <DigestCardList>
                {detailedDiaries.length > 0
                  ? detailedDiaries.map((diary, i) => (
                      <DigestDiaryCard key={i} diary={diary} />
                    ))
                  : Array(3)
                      .fill(null)
                      .map((_, i) => (
                        <DigestDiaryCard
                          key={i}
                          diary={{
                            diaryId: '',
                            summary: '내용 없음',
                            emotion: '',
                            capturedAt: '',
                            imageUrl: '',
                            prompt: '',
                            answer: '',
                            address: '',
                          }}
                        />
                      ))}
              </DigestCardList>
            )}

            {activeTab === 'stats' && (
              <>
                <StatsSection>
                  <SectionTitle>이번 달 감정 통계</SectionTitle>
                  <EmotionStatList
                    stats={digestData?.emotionStats || defaultEmotionStats}
                  />
                </StatsSection>

                <StatsSection>
                  <SectionTitle>이번 달 방문한 장소</SectionTitle>
                  <KakaoMap places={places} />
                </StatsSection>
              </>
            )}
          </TabContent>
        </Wrapper>
      </ContentContainer>
    </Container>
  );
};

export default Digest;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const SummaryCard = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  width: 100%;
  max-width: 958px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 48px;
`;

const CardTopBackground = styled.div`
  width: 100%;
  height: 311px;
  padding: 32px;
  background: linear-gradient(to bottom, #ffffff 0%, #f1f1f1 100%);
  display: flex;
  align-items: flex-end;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DateText = styled.div`
  font-size: 14px;
  color: #666;
`;

const CardTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #111;
`;

const EmotionBlock = styled.div`
  background-color: #ffffff;
  padding: 24px 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EmotionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Emoji = styled.div`
  font-size: 20px;
`;

const BoldText = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const DescText = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  white-space: pre-line;
`;

const RecordSection = styled.div`
  width: 100%;
  max-width: 958px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #111;
`;

const RecordList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TabWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 958px;
  background-color: #f5f6f8;
  border-radius: 12px;
  padding: 6px;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 24px;
`;

const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px 0;
  font-size: 14px;
  font-weight: ${({ active }) => (active ? '700' : '500')};
  color: ${({ active }) => (active ? '#111' : '#888')};
  background-color: ${({ active }) => (active ? '#ffffff' : 'transparent')};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

const TabContent = styled.div`
  width: 100%;
  max-width: 958px;
  min-height: 700px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const StatsSection = styled.div`
  width: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 0px 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
`;

const DigestCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;
