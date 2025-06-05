import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const useDiaryWebSocket = (
  diaryId: string,
  // eslint-disable-next-line no-unused-vars
  onMessage: (msg: any) => void,
) => {
  useEffect(() => {
    if (!diaryId) return;

    let client: Client | null = null;
    let isMounted = true;
    let timeoutId: ReturnType<typeof setTimeout>;

    (async () => {
      try {
        const res = await fetch(
          `https://api.lumidiary.com/core/ws/images/session/${diaryId}`,
          {
            method: 'GET',
            credentials: 'include', // 쿠키를 받기 위해 반드시 필요
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (!res.ok)
          throw new Error(`세션 준비 API 호출 실패 (HTTP ${res.status})`);
        console.log('✅ 세션 준비 API 호출 성공');
      } catch (err) {
        console.error('❌ 세션 준비 API 호출 실패:', err);
        return;
      }

      timeoutId = setTimeout(() => {
        if (!isMounted) return;

        // ⚠ withCredentials: true 로 설정해야 쿠키가 WebSocket 핸드셰이크에 붙음
        const socket = new SockJS(
          'https://api.lumidiary.com/core/ws',
          // undefined,
          // {
          //   withCredentials: true,
          // },
        );
        client = new Client({
          webSocketFactory: () => socket,
          reconnectDelay: 2000,
          debug: msg => {
            console.log('[STOMP DEBUG]', msg);
            if (msg.includes('Opening Web Socket')) {
              console.log('🛰️ WebSocket 연결 시도 중...');
            }
            if (msg.includes('Connection closed')) {
              console.log('❌ WebSocket 연결이 닫혔습니다');
            }
            if (msg.includes('reconnection')) {
              console.log('🔁 재연결 예정 (2초 후)');
            }
          },
          onConnect: () => {
            console.log('🟢 WebSocket 연결 성공');
            const topic = `/topic/diary/${diaryId}`;
            client?.subscribe(topic, message => {
              try {
                const parsed = JSON.parse(message.body);
                console.log('메시지 수신됨:', parsed);
                if (parsed.type === 'DISCONNECT_REQUEST') {
                  console.warn('연결 해제 요청 수신. 2초 후 종료');
                  setTimeout(() => {
                    client?.deactivate();
                  }, 2000);
                }
                onMessage(parsed);
              } catch (err) {
                console.error('WebSocket 메시지 파싱 실패:', err);
              }
            });
          },
          onStompError: frame => {
            console.error('STOMP 에러 발생:', frame.headers.message);
          },
        });

        client.activate();
        console.log('WebSocket client.activate() 호출됨');

        const handleBeforeUnload = () => {
          if (client && client.active) {
            client.deactivate();
            console.log('브라우저 언로드: WebSocket 종료됨');
          }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        // useEffect 클린업
        return () => {
          isMounted = false;
          if (client && client.active) {
            client.deactivate();
            console.log('useEffect 클린업: WebSocket 종료');
          }
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, 1000);
    })();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      if (client && client.active) {
        client.deactivate();
        console.log('useEffect return: WebSocket 종료');
      }
    };
  }, [diaryId]);
};
