// 📍 src/hooks/useAddressFromCoords.ts

import { useEffect, useState } from 'react';

const useAddressFromCoords = (lat: number, lng: number) => {
  const [address, setAddress] = useState(''); // 초기값

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await fetch(
          `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lng}&y=${lat}`,
          {
            headers: {
              Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
            },
          },
        );
        const data = await res.json();
        const region = data.documents?.[0]?.address_name;
        setAddress(region || '주소 없음');
      } catch (err) {
        console.error('역지오코딩 실패:', err);
        setAddress('주소 불러오기 실패');
      }
    };

    fetchAddress();
  }, [lat, lng]);

  return address;
};

export default useAddressFromCoords;
