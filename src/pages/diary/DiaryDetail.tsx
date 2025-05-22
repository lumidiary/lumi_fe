import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getDiaryDetail } from '../../services/diary';
import { Diary } from '@/types/diary';
import { IoArrowBackCircle, IoArrowForwardCircle } from 'react-icons/io5';
import { deleteDiary } from '../../services/diary';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdOutlinePlace } from 'react-icons/md';
import { LuCalendar } from 'react-icons/lu';

const DiaryDetail = () => {
  const { diaryId } = useParams<{ diaryId: string }>();
  const navigate = useNavigate();
  const [diary, setDiary] = useState<Diary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const handleDelete = async () => {
    if (!diary) return;
    const ok = window.confirm('정말 이 일기를 삭제하시겠습니까?');
    if (!ok) return;

    try {
      await deleteDiary(diary.id);
      navigate('/list'); // 삭제 후 목록으로 돌아가기
    } catch (e) {
      console.error(e);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (!diaryId) return;
    // 더미 데이터 세팅 (나중에 API 연동)
    const dummy: Diary = {
      id: +diaryId,
      date: '2025-05-11',
      emotion: '😊',
      content: '오늘은 좋은 하루였어요! 하루 종일 산책을 했습니다.',
      location: '   서울시 성북구',
      imageUrl: [''],
      tags: ['카페', '친구', '산책'],
      questions: [
        { question: '오늘 기분이 어땠나요?', answer: '매우 좋았어요!' },
      ],
    };
    setDiary(dummy);
    setLoading(false);
  }, [diaryId]);

  if (loading)
    return (
      <Container>
        <Message>로딩 중...</Message>
      </Container>
    );
  if (error || !diary)
    return (
      <Container>
        <Message>오류가 발생했습니다.</Message>
      </Container>
    );

  return (
    <Container>
      <Header>
        <BackBtn onClick={() => navigate(-1)} />
        <PageTitle>일기 상세보기</PageTitle>
      </Header>

      <Card>
        <Top>
          <InfoBox>
            <Row>
              <Emotion>{diary.emotion}</Emotion>
              <DateText>
                <LuCalendar size={16} style={{ marginRight: '4px' }} />
                {diary.date} (월요일)
              </DateText>
            </Row>
            <Location>
              <MdOutlinePlace size={16} style={{ marginRight: '4px' }} />
              {diary.location}
            </Location>
            <TagList>
              {diary.tags.map((t, i) => (
                <Tag key={i}>{t}</Tag>
              ))}
            </TagList>
            <DeleteBtn onClick={handleDelete}>
              <RiDeleteBinLine size={24} color="#ff4d4f" />
            </DeleteBtn>
          </InfoBox>

          <ImageArea>
            <NavArrow
              onClick={() =>
                setCurrentImageIdx(
                  idx =>
                    (idx - 1 + diary.imageUrl.length) % diary.imageUrl.length,
                )
              }
            >
              <IoArrowBackCircle size={32} color="#aaa" />
            </NavArrow>
            {diary.imageUrl.length ? (
              <Image src={diary.imageUrl[currentImageIdx]} alt="Diary" />
            ) : (
              <Placeholder />
            )}
            <NavArrow
              right
              onClick={() =>
                setCurrentImageIdx(idx => (idx + 1) % diary.imageUrl.length)
              }
            >
              <IoArrowForwardCircle size={32} color="#aaa" />
            </NavArrow>
          </ImageArea>
        </Top>

        <Bottom>
          <Question>{diary.questions[0].question}</Question>
          <Answer>{diary.questions[0].answer}</Answer>
        </Bottom>
      </Card>
    </Container>
  );
};

export default DiaryDetail;

// Styled Components
const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const BackBtn = styled.button.attrs({ 'aria-label': '뒤로' })`
  background: none;
  border: none;
  font-size: 32px;
  margin-right: 12px;
  cursor: pointer;
`;

const PageTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
`;

const Card = styled.div`
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  background: #fff;
`;

const Top = styled.div`
  position: relative;
`;

const InfoBox = styled.div`
  padding: 16px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: 1px solid #eee;
`;

const Row = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

const Emotion = styled.span`
  font-size: 24px;
`;

const DateText = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const Location = styled.span`
  font-size: 14px;
  color: #666;
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

const DeleteBtn = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const ImageArea = styled.div`
  position: relative;
  background: #f5f5f5;
  height: 400px;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background: #f5f5f5;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NavArrow = styled.div<{ right?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ right }) => (right ? 'right: 12px;' : 'left: 12px;')}
  cursor: pointer;
  z-index: 2;
`;

const Bottom = styled.div`
  padding: 24px;
  background: #fff;
`;

const Question = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #4b9cd3;
`;

const Answer = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #333;
`;

const Message = styled.p`
  font-size: 16px;
  text-align: center;
`;
