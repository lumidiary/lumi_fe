/*
 * 일기 작성하기 페이지 (8)
 */

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { BackHeader, Button, Card, ContentContainer } from '@components/common';
import AiIcon from '@/assets/ai.svg?react';

const moods = [
  { id: 'happy', icon: '😊' },
  { id: 'laugh', icon: '😄' },
  { id: 'neutral', icon: '😐' },
  { id: 'angry', icon: '😠' },
  { id: 'sad', icon: '😭' },
];

const DiaryCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const images = location.state?.images || [];

  const [selectedMood, setSelectedMood] = useState('');
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');

  const handleSave = () => {
    const diaryData = {
      images,
      mood: selectedMood,
      answer1: q1,
      answer2: q2,
    };

    console.log(diaryData);
    navigate('/');
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
          <Question>
            <Label>Q1. 오늘 있었던 특별한 일이 있었나요?</Label>
            <TextArea
              value={q1}
              onChange={e => setQ1(e.target.value)}
              placeholder="여기에 내용을 입력하세요..."
            />
          </Question>
          <Question>
            <Label>Q2. 오늘 하루 기분이 좋았던 이유는 무엇인가요?</Label>
            <TextArea
              value={q2}
              onChange={e => setQ2(e.target.value)}
              placeholder="여기에 내용을 입력하세요..."
            />
          </Question>
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
