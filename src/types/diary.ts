// src/types/diary.ts

export interface QuestionAnswer {
  question: string;
  answer: string;
}

export interface Diary {
  id: number;
  date: string; // 예: '2025-05-11'
  content: string; // 본문 텍스트
  location: string; // 추가
  emotion: string; // 감정 이모지나 태그
  imageUrl: string[]; //  사진 URL
  questions: { question: string; answer: string }[]; // AI 질문 답변
  tags: string[];
}
