// src/services/auth.ts
export interface User {
  id: number;
  nickname: string;
  // ...필요한 다른 필드
}

/**
 * 내 정보 조회 API 호출
 */
export const getCurrentUser = async (): Promise<User> => {
  const res = await fetch('/api/auth/me', {
    credentials: 'include', // 세션/쿠키 기반 인증 시
  });
  if (!res.ok) {
    throw new Error('사용자 정보 조회에 실패했습니다.');
  }
  return res.json();
};
