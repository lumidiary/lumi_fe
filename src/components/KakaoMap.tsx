import { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Place {
  lat: number;
  lng: number;
  name?: string;
}

interface KakaoMapProps {
  places: Place[];
}

const KakaoMap = ({ places }: KakaoMapProps) => {
  useEffect(() => {
    const scriptId = 'kakao-map-sdk';
    const existingScript = document.getElementById(scriptId);

    const loadMap = () => {
      if (!window.kakao?.maps) {
        console.error('카카오맵 SDK가 로드되지 않았습니다.');
        return;
      }

      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        if (!container) return;

        const map = new window.kakao.maps.Map(container, {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 5,
        });

        const bounds = new window.kakao.maps.LatLngBounds();

        places.forEach(place => {
          const position = new window.kakao.maps.LatLng(place.lat, place.lng);

          new window.kakao.maps.Marker({
            position,
            map,
          });

          bounds.extend(position);
        });

        if (places.length > 0) {
          map.setBounds(bounds);
        }
      });
    };

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_API_KEY}&autoload=false`;
      script.async = true;
      script.onload = loadMap;
      script.onerror = () => console.error('카카오맵 스크립트 로딩 실패');
      document.head.appendChild(script);
    } else {
      loadMap();
    }
  }, [places]);

  return (
    <div
      id="map"
      style={{
        width: '100%',
        height: '442px',
        borderRadius: '12px',
        backgroundColor: '#f1f1f1',
        marginBottom: '32px',
      }}
    />
  );
};

export default KakaoMap;
