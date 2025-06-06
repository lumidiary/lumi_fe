// src/services/diary.ts

import {
  DiaryDetailType,
  DiaryListItemType,
  DigestItemType,
  UploadParResponse,
  AnalysisResponse,
} from '@/types/diary';
import { requestGetFetch, requestPostFetch } from '@/services/apiService';

// 1. 일기 전체 목록 조회 (사용자 기준)
export const getDiaryListByUser = async (
  userId: string,
): Promise<DiaryListItemType[]> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/core/diaries/user/${userId}`,
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      throw new Error(`서버 응답 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('❌ getDiaryListByUser 에러:', err);
    throw err; // 상위에서 .catch 처리 가능하게 throw
  }
};

// 2. 특정 일기 상세 조회
export const getDiaryDetail = (diaryId: string): Promise<DiaryDetailType> => {
  return requestGetFetch(`core/diaries/${diaryId}`, 'tokenOnly');
};

// 3. 일기 soft 삭제
export const deleteDiary = async (diaryId: string): Promise<void> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/core/diaries/${diaryId}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error(`삭제 실패: ${response.status}`);
    }

    console.log(`✅ 일기 삭제 성공: ${diaryId}`);
  } catch (err) {
    console.error('❌ deleteDiary 에러:', err);
    throw err;
  }
};

// 4. 특정 사용자 다이제스트 전체 조회
export const getDigestListByUser = async (
  userId: string,
): Promise<DigestItemType[]> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/core/digests/user/${userId}`,
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      throw new Error(`다이제스트 조회 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('❌ getDigestListByUser 에러:', err);
    throw err;
  }
};

// 4. 이미지 업로드 세션 생성
export const createImageUploadSession = (
  fileNames: string[],
): Promise<UploadParResponse> => {
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

// 9. 특정 다이제스트 상세
export const getDigestDetail = (digestId: string): Promise<DigestItemType> => {
  return requestGetFetch(`core/digests/${digestId}`, 'tokenOnly');
};
