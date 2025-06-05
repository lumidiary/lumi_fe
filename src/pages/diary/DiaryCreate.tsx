/*
 * 일기 작성하기 페이지 (8)
 */

import { useCallback, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { BackHeader, Button, Card, ContentContainer } from '@components/common';
import AiIcon from '@/assets/ai.svg?react';
import { EmotionType, emotionEmojiMap } from '@/types/emotion';
import { useDiaryWebSocket } from '@/hooks/useDiaryWebSocket';

const DiaryCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const diaryId: string = location.state?.diaryId;

  const moods: { id: EmotionType; icon: string }[] = Object.entries(
    emotionEmojiMap,
  ).map(([key, value]) => ({
    id: key as EmotionType,
    icon: value,
  }));

  const [selectedMood, setSelectedMood] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [questionIds, setQuestionIds] = useState<string[]>([]);
  const [, setIsAnalysisDone] = useState(false);

  const handleWsMessage = useCallback(
    ({
      overallDaySummary,
      questions: finalQs,
    }: {
      overallDaySummary: string;
      questions: { id: string; question: string }[];
    }) => {
      console.log('[Summary]', overallDaySummary);
      console.log('[Questions]', finalQs);
      // extract question texts and ids
      setQuestions(finalQs.map(q => q.question));
      setQuestionIds(finalQs.map(q => q.id));
      setIsAnalysisDone(true);
    },
    [],
  );
  const test = 'ca802f5b-436e-4b76-95f8-b96d3d08e074';
  useDiaryWebSocket(test, handleWsMessage);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSave = async () => {
    if (!diaryId) {
      alert('diaryId가 없습니다.');
      return;
    }

    if (!selectedMood) {
      alert('감정을 선택해 주세요.');
      return;
    }

    const userId = localStorage.getItem('userId');

    try {
      const payload = {
        diaryId,
        userId,
        emotionTag: selectedMood.toUpperCase() as EmotionType,
        answers: questions.map((_question, i) => ({
          id: questionIds[i] || `question-${i}`,
          answer: answers[i] || '',
        })),
      };
      // 기존 더미 데이터 주석 처리
      // answers: [
      //   {
      //     id: '40ff5670-67eb-487f-9409-acf965191f29',
      //     answer:
      //       '화이트 밸런스를 따뜻하게 조정하고, HSL에서 오렌지와 레드를 강조하세요.',
      //   },
      //   {
      //     id: '407fac8d-57dd-4893-8051-8a2818033a83',
      //     answer:
      //       '선명도와 텍스처를 높이고, 나무 부분만 마스킹해서 디테일을 강조하세요.',
      //   },
      // ],

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/core/diaries/answers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`저장 실패: ${response.status} - ${text}`);
      }

      console.log('일기 저장 성공:', payload);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <BackHeader title="일기 작성하기" />
      <ContentContainer>
        <Card style={{ width: '700px', padding: '2rem' }}>
          <Title>오늘의 감정을 선택해주세요</Title>
          <SubText>
            하루를 대표하는 감정을 아래 이모지 중에서 하나 선택해 주세요.
          </SubText>
          <EmojiRow>
            {moods.map(mood => (
              <EmojiButton
                key={mood.id}
                selected={selectedMood === mood.id}
                onClick={() => setSelectedMood(mood.id)}
              >
                {mood.icon}
              </EmojiButton>
            ))}
          </EmojiRow>
          <Title>
            <AiIcon />
            AI 질문에 답해주세요
          </Title>
          <SubText>AI가 분석한 결과를 바탕으로 맞춤 질문을 준비했어요!</SubText>
          {questions.length === 0 && (
            <p
              style={{
                fontSize: '0.85rem',
                color: '#9ca3af',
                marginBottom: '1rem',
              }}
            >
              질문을 수신 중입니다. 잠시만 기다려주세요...
            </p>
          )}
          {questions.map((q, i) => (
            <Question key={i}>
              <Label>
                Q{i + 1}. {q}
              </Label>
              <TextArea
                value={answers[i] || ''}
                onChange={e => handleAnswerChange(i, e.target.value)}
                placeholder="여기에 내용을 입력하세요..."
              />
            </Question>
          ))}

          <Button
            type="setting"
            buttonText="일기 저장하기"
            style={{ width: '50%', marginTop: '2rem' }}
            onClick={handleSave}
          />
        </Card>
      </ContentContainer>
    </Container>
  );
};

export default DiaryCreate;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Title = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 4px;
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SubText = styled.p`
  font-size: 0.8rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
  align-self: flex-start;
`;

const EmojiRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const EmojiButton = styled.button<{ selected: boolean }>`
  font-size: 2.4rem;
  background: none;
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 8px;
  cursor: pointer;

  ${({ selected }) =>
    selected &&
    css`
      border-color: #4b9cd3;
    `}
`;

const Question = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

const Label = styled.label`
  color: #4b9cd3;
  font-weight: bold;
  font-size: 1rem;
  display: block;
  margin-bottom: 0.5rem;
  align-self: flex-start;
`;

const TextArea = styled.textarea`
  width: 95%;
  height: 60px;
  padding: 0.8rem;
  border: 1px solid #d1d5db;
  border-radius: 0.4rem;
  resize: none;
  font-size: 0.8rem;
`;
