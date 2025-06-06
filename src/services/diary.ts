// src/services/diary.ts

import {
  DiaryDetailType,
  DiaryListItemType,
  DigestItemType,
  UploadParResponse,
  AnalysisResponse,
} from '@/types/diary';
import { requestGetFetch, requestPostFetch, requestDeleteFetch } from '@/services/apiService';

// 1. 일기 전체 목록 조회 (사용자 기준)
export const getDiaryListByUser = (userId: string): Promise<DiaryListItemType[]> => {
  return requestGetFetch(`core/diaries/user/${userId}`, 'tokenOnly');
};

// 2. 특정 일기 상세 조회
export const getDiaryDetail = (diaryId: string): Promise<DiaryDetailType> => {
  return requestGetFetch(`core/diaries/${diaryId}`, 'tokenOnly');
};

// 3. 일기 soft 삭제
export const deleteDiary = (diaryId: string): Promise<void> => {
  return requestDeleteFetch(`core/diaries/${diaryId}`, 'tokenOnly');
};

// 4. 이미지 업로드 세션 생성
export const createImageUploadSession = (fileNames: string[]): Promise<UploadParResponse> => {
  return requestPostFetch('core/images/session', { fileNames }, 'tokenOnly');
};

// 5. 질문 분석 요청
export const requestAnalysis = (body: any): Promise<AnalysisResponse> => {
  return requestPostFetch('core/analysis', body, 'tokenOnly');
};

// 6. 질문 응답 저장
export const submitAnswers = (body: any): Promise<void> => {
  return requestPostFetch('core/diaries/answers', body, 'tokenAndUserId');
};

// 7. 주간 다이제스트 조회
export const getWeeklyDigest = (): Promise<DigestItemType[]> => {
  return requestGetFetch(`/digests/weekly`, 'tokenOnly');
};

// 8. 특정 사용자 다이제스트 전체 조회
export const getDigestListByUser = (userId: string): Promise<DigestItemType[]> => {
  return requestGetFetch(`/core/digests/user/${userId}`, 'tokenOnly');
};

// 9. 특정 다이제스트 상세
export const getDigestDetail = (digestId: string): Promise<DigestItemType> => {
  return requestGetFetch(`core/digests/${digestId}`, 'tokenOnly');
};
