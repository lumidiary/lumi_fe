import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';

export const useDiaryWebSocket = (
  diaryId: string,
  // eslint-disable-next-line no-unused-vars
  onMessage: (msg: any) => void,
) => {
  useEffect(() => {
    if (!diaryId) return;
    let client: Client | null;
    const baseUrl =
      import.meta.env.VITE_SERVER_URL || 'https://api.lumidiary.com';
    const wsProtocol = baseUrl.startsWith('https') ? 'wss' : 'ws';
    const brokerURL = `${wsProtocol}://${baseUrl.replace(/^https?:\/\//, '')}/core/ws/websocket`;
    client = new Client({
      brokerURL,
      reconnectDelay: 2000,
      debug: msg => console.log('[STOMP DEBUG]', msg),
      onConnect: () => {
        console.log('🟢 WebSocket 연결 성공');
        client?.subscribe(`/topic/diary/${diaryId}`, message => {
          try {
            const parsed = JSON.parse(message.body);
            if (
              parsed.type === 'ANALYSIS_COMPLETE' &&
              typeof parsed.content === 'string'
            ) {
              const { overallDaySummary, questions } = JSON.parse(parsed.content);
              onMessage({ overallDaySummary, questions });
              client?.deactivate();
            }
          } catch (e) {
            console.error('메시지 파싱 실패:', e);
          }
        });
      },
      onStompError: frame => {
        console.error('STOMP 에러:', frame.headers.message);
      },
    });
    client.activate();
    window.addEventListener('beforeunload', () => client?.deactivate());
    return () => {
      client?.deactivate();
      window.removeEventListener('beforeunload', () => client?.deactivate());
    };
  }, [diaryId]);
};
