import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [digestSummary, setDigestSummary] = useState<any>({
    topEmoji: '',
    summaryEmotion: '',
    diaryCount: 0,
    summaryText: '',
    emotionStats: [
      { emoji: '😊', count: 0, label: '행복' },
      { emoji: '😁', count: 0, label: '기쁨' },
      { emoji: '😐', count: 0, label: '보통' },
      { emoji: '😠', count: 0, label: '화남' },
      { emoji: '😭', count: 0, label: '슬픔' },
    ],
  });
  const [records, setRecords] = useState<any[]>([]);
  const [diaries, setDiaries] = useState<any[]>([]);
  const navigate = useNavigate();
  const { month } = useParams();
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
          `http://localhost:5173/digests/monthly?month=${month}`,
        );
        const data = await res.json();
        setDigestSummary(data);
        setRecords(data.records || []);
      } catch (err) {
        console.error('다이제스트 불러오기 실패:', err);
        setRecords([
          { title: '이번 달 활동', content: '' },
          { title: '이번 달 감정', content: '' },
          { title: '이번 달 특별했던 순간', content: '' },
        ]);
      }
    };

    const fetchDiaries = async () => {
      try {
        const res = await fetch('http://localhost:5173/diaries?size=3');
        const data = await res.json();
        setDiaries(data.content || []);
      } catch (err) {
        console.error('일기 리스트 불러오기 실패:', err);
      }
    };

    fetchDigest();
    fetchDiaries();
  }, []);

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
                <Emoji>{digestSummary?.topEmoji || '😊'}</Emoji>
                <BoldText>
                  {digestSummary?.summaryEmotion ||
                    '이번 달은 행복한 달이었어요!'}
                </BoldText>
              </EmotionRow>
              <DescText>
                총 {digestSummary?.diaryCount || 0}회의 일기를 작성했습니다.
              </DescText>
              {digestSummary?.summaryText && (
                <DescText style={{ marginTop: '8px', whiteSpace: 'pre-line' }}>
                  {digestSummary.summaryText}
                </DescText>
              )}
            </EmotionBlock>
          </SummaryCard>

          <RecordSection>
            <SectionTitle>AI가 분석한 이번 달의 기록</SectionTitle>
            <RecordList>
              {[0, 1, 2].map(i => {
                const r = records[i] || {};
                return (
                  <DigestRecordCard
                    key={i}
                    index={i}
                    title={r.title}
                    content={r.content}
                  />
                );
              })}
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
                {[0, 1, 2].map(i => {
                  const diary = diaries[i] || {};
                  return <DigestDiaryCard key={i} diary={diary} />;
                })}
              </DigestCardList>
            )}

            {activeTab === 'stats' && (
              <>
                <StatsSection>
                  <SectionTitle>이번 달 감정 통계</SectionTitle>
                  <EmotionStatList stats={digestSummary?.emotionStats || []} />
                </StatsSection>

                <StatsSection>
                  <SectionTitle>이번 달 방문한 장소</SectionTitle>
                  <KakaoMap places={digestSummary?.places || []} />
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
