// src/services/diary.ts

import { Diary } from '@/types/diary';

/**
 * 과거 일기 목록 조회
 * fetch 부분 백엔드팀이 주실 실제 엔드포인트로 변경
 */
export async function getDiaryList(): Promise<Diary[]> {
  const res = await fetch('/api/diary/list', {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('일기 목록 조회 실패');
  return res.json();
}

/**
 * 특정 일기 상세 조회
 */
export async function getDiaryDetail(id: number): Promise<Diary> {
  const res = await fetch(`/api/diary/detail/${id}`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('일기 상세 조회 실패');
  return res.json();
}

/*
게시글 삭제
*/
export const deleteDiary = async (diaryId: number) => {
  await fetch(`/diaries/${diaryId}`, { method: 'DELETE' });
};
