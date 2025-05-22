import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import KakaoMap from '@/components/KakaoMap';

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
    <PageContainer>
      <FixedHeader>
        <HeaderContent>
          <BackButton onClick={() => navigate('/')}>←</BackButton>
          <Title>다이제스트 상세보기</Title>
        </HeaderContent>
      </FixedHeader>

      <ContentWrapper>
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
                <RecordCard key={i}>
                  <RecordTitle>{r.title || `제목 없음 ${i + 1}`}</RecordTitle>
                  <RecordContent>
                    {r.content || '아직 분석된 내용이 없습니다.'}
                  </RecordContent>
                </RecordCard>
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
            <div>
              {[0, 1, 2].map(i => {
                const diary = diaries[i] || {};

                return (
                  <DiaryCard key={i}>
                    <DiaryTopRow>
                      <DiaryLeftGroup>
                        <EmojiBox>{diary.emotion || '😊'}</EmojiBox>
                        <DiaryDate>{diary.date || '날짜 없음'}</DiaryDate>
                      </DiaryLeftGroup>
                      <DiaryLocation>
                        {diary.location || '위치 없음'}
                      </DiaryLocation>
                    </DiaryTopRow>
                    <Divider />
                    <DiaryContentRow>
                      <DiaryImageBox>
                        {diary.imageUrl ? (
                          <img src={diary.imageUrl} alt="diary" />
                        ) : (
                          <div className="no-image">이미지 없음</div>
                        )}
                      </DiaryImageBox>

                      <DiaryTextBlock>
                        <DiaryPrompt>{diary.prompt || '질문 없음'}</DiaryPrompt>
                        <DiaryPreview>
                          {diary.preview || '내용 없음'}
                        </DiaryPreview>
                      </DiaryTextBlock>
                    </DiaryContentRow>
                  </DiaryCard>
                );
              })}
            </div>
          )}

          {activeTab === 'stats' && (
            <>
              <StatsSection>
                <SectionTitle>이번 달 감정 통계</SectionTitle>
                <EmotionStatList>
                  {(digestSummary?.emotionStats || []).map(
                    (
                      stat: { emoji: string; count: number; label: string },
                      index: number,
                    ) => (
                      <EmotionStatItem key={index}>
                        <EmojiText>{stat.emoji}</EmojiText>
                        <EmotionCount>{stat.count}</EmotionCount>
                        <EmotionLabel>{stat.label}</EmotionLabel>
                      </EmotionStatItem>
                    ),
                  )}
                </EmotionStatList>
              </StatsSection>

              <StatsSection>
                <SectionTitle>이번 달 방문한 장소</SectionTitle>
                <KakaoMap places={digestSummary?.places || []} />
              </StatsSection>
            </>
          )}
        </TabContent>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Digest;

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f8f9fb;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FixedHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f8f9fb;
  z-index: 100;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1440px;
  display: flex;
  align-items: center;
  padding: 10px 100px;
  box-sizing: border-box;
`;

const BackButton = styled.div`
  font-size: 24px;
  cursor: pointer;
  margin-right: 50px;
`;

const Title = styled.h1`
  font-size: 15px;
  font-weight: 500;
  color: #111;
  margin: 0;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 0 40px 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1350px;
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

const RecordCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px 24px;
  border: 1px solid #e2e8f0;
`;

const RecordTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #4b9cd3;
  margin-bottom: 8px;
`;

const RecordContent = styled.p`
  font-size: 14px;
  color: #333;
  line-height: 1.6;
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

const EmotionStatList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 90px;
  margin-top: 16px;
`;

const EmotionStatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
`;

const EmojiText = styled.div`
  font-size: 24px;
`;

const EmotionCount = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #111;
  margin-top: 8px;
`;

const EmotionLabel = styled.div`
  font-size: 13px;
  color: #666;
  margin-top: 4px;
`;

const DiaryCard = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04);
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 0px;
  height: 232px;
  overflow: hidden;
`;

const DiaryTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DiaryLeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EmojiBox = styled.div`
  font-size: 20px;
`;

const DiaryDate = styled.div`
  font-size: 14px;
  color: #333;
`;

const DiaryLocation = styled.div`
  font-size: 13px;
  color: #666;
  text-align: right;
  margin-right: 20px;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #e2e8f0;
  margin: 12px 0 0 0;
  padding: 0;
  display: block;
`;

const DiaryContentRow = styled.div`
  display: flex;
  gap: 30px;
  align-items: flex-start;
`;

const DiaryImageBox = styled.div`
  width: 258px;
  height: 194px;
  background-color: #f1f1f1;
  border-radius: 0px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .no-image {
    width: 100%;
    height: 100%;
    color: #aaa;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const DiaryTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const DiaryPrompt = styled.div`
  font-weight: 600;
  font-size: 15px;
  color: #4b9cd3;
  margin-top: 30px;
`;

const DiaryPreview = styled.div`
  font-size: 14px;
  color: #333;
`;
