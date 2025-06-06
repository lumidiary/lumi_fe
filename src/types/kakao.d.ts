// src/types/kakao.d.ts

export {};

declare global {
  interface Window {
    kakao: typeof kakao;
  }

  namespace kakao.maps {
    namespace services {
      interface GeocoderAddress {
        address: {
          address_name: string;
        };
      }

      type Status = 'OK' | 'ZERO_RESULT' | 'ERROR';
    }
  }
}
