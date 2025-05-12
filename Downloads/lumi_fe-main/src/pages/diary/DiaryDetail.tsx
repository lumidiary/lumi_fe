import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getDiaryDetail } from '../../services/diary';
import { Diary } from '../../types/diary';
import { IoArrowBackCircle } from "react-icons/io5";
import { IoArrowForwardCircle } from "react-icons/io5";



const DiaryDetail = () => {
  const { diaryId } = useParams<{ diaryId: string }>();
  const navigate = useNavigate();
  const [diary, setDiary] = useState<Diary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!diaryId) return;
    const dummy: Diary = {
      id: +diaryId,
      date: '2025-05-11',
      emotion: '😊',
      content: '오늘은 좋은 하루였어요! 하루 종일 산책을 했습니다.',
      imageUrl: '',
      questions: [
        { question: '오늘 기분이 어땠나요?', answer: '매우 좋았어요!' },
        { question: '무엇을 했나요?', answer: '산책을 했습니다.' }
      ]
    };
    setDiary(dummy);
    setLoading(false);
  }, [diaryId]);

  if (loading) return <Container><Message>로딩 중...</Message></Container>;
  if (error || !diary) return <Container><Message>일기를 불러오는 중 오류가 발생했습니다.</Message></Container>;

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>&larr; 뒤로</BackButton>
      </Header>

      <Card>
        <CardTop>
          <CardTopInfo>
            <Emotion>{diary.emotion}</Emotion>
            <Date>{diary.date} (월요일)</Date>
            <Meta>
              <Tag>카페</Tag>
              <Tag>친구</Tag>
              <Tag>서울시 성북구</Tag>
            </Meta>
            <DeleteButton>🗑</DeleteButton>
          </CardTopInfo>
          {diary.imageUrl ? (
            <Image src={diary.imageUrl} alt="Diary" />
          ) : (
            <EmptyImageBox />
          )}

          <NavArrow left>
            <IoArrowBackCircle size={40} color="#888" /> {/* 아이콘 크기 조정 가능 */}
          </NavArrow>
          <NavArrow right>
            <IoArrowBackCircle size={40} color="#888" />
          </NavArrow>
        </CardTop>

        <CardBottom>
          <QASection>
            <QuestionText>Q. 오늘 하루는 어땠나요? 특별한 일이 있었나요?</QuestionText>
            <AnswerText>{diary.content}</AnswerText>
          </QASection>
        </CardBottom>
      </Card>
    </Container>
  );
};

// 🔽 컴포넌트 내보내기
export default DiaryDetail;

// 🔽 전체 페이지 컨테이너 스타일
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 40px 20px;
`;

// 🔽 상단 뒤로가기 영역 스타일
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  align-self: flex-start;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

// 🔽 카드 전체 틀 (회색+흰색 영역 감싸는 박스)
const Card = styled.div`
  width: 100%;
  max-width: 1200px;
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

// 🔽 회색 이미지 영역 (상단 큰 박스)
const CardTop = styled.div`
  position: relative;
  height: 800px;
  background-color: #f5f5f5;
`;

// 🔽 회색 박스 안에서 흰색 오버레이 정보영역 (감정, 날짜, 태그, 삭제 버튼)
const CardTopInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 16px;
  width: 100%;
  background: white;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Emotion = styled.span`
  font-size: 24px;
`;

const Date = styled.span`
  font-weight: 600;
`;

const Meta = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: #4B9CD3;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 6px;
`;

const DeleteButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  cursor: pointer;
`;

// 🔽 이미지 없을 때 보여주는 회색 빈 박스
const EmptyImageBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
`;

// 🔽 실제 사진 렌더링 스타일
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 🔽 좌우 넘기기 화살표 버튼 스타일
const NavArrow = styled.div<{ left?: boolean; right?: boolean }>`
  position: absolute;
  top: 50%;
  ${({ left }) => left && 'left: 12px;'}
  ${({ right }) => right && 'right: 12px;'}
  transform: translateY(-50%);
  font-size: 24px;
  background: rgba(255, 255, 255, 0.7);
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
  z-index: 3;
`;

// 🔽 하단 흰색 영역 (일기 본문 내용 박스)
const CardBottom = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 300px;
`;

// 🔽 질문-답변 섹션 박스
const QASection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const QuestionText = styled.span`
  color: #4B9CD3;
  font-weight: 600;
`;

const AnswerText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: #333;
`;

const Message = styled.p`
  font-size: 16px;
  text-align: center;
`;

