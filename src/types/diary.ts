// types/diary.ts
import { EmotionType } from '@/types/emotion';

export interface QuestionAnswer {
  question: string;
  answer: string;
}

export interface Diary {
  id: string;
  date: string; // '2025-05-11'
  summary: string;
  location: string;
  emotionTag: EmotionType;
  imageUrl: string[]; // 여러 이미지 URL
  questions: QuestionAnswer[]; // AI 질문과 답변
  tags: string[];
}

// 일기 상세 조회 타입
export interface DiaryDetailType {
  diaryId: string;
  createdAt: string;
  emotionTag: EmotionType;
  overallDaySummary: string;
  photos: {
    photoId: string;
    url: string;
    latitude: number;
    longitude: number;
  }[];
  answers: {
    questionId: string;
    question: string;
    answer: string;
  }[];
}

// 일기 리스트용 요약 타입
export interface DiaryListItemType {
  diaryId: string;
  createdAt: string; // 예: "2025-06-03T19:27:33.640Z"
  overallDaySummary: string;
  emotionTag: EmotionType;
  firstPhoto?: {
    photoId: string;
    url: string;
    latitude: number;
    longitude: number;
  };
}

// PAR 응답에서 하나의 이미지 업로드 정보
export interface UploadParItem {
  id: string;
  accessUri: string;
}

// PAR 전체 응답
export interface UploadParResponse {
  diaryId: string;
  uploadPars: UploadParItem[];
}

// AI 분석 질문 응답 타입
export interface AnalysisQuestion {
  id: string;
  question: string;
}

// AI 분석 응답 전체
export interface AnalysisResponse {
  diaryId: string;
  questions: AnalysisQuestion[];
}

// 다이제스트 리스트용 아이템 타입
export interface DigestItemType {
  id: string;
  title: string;
  summary: string;
  periodStart: string;
  periodEnd: string;
  imageUrl: string;
}
