export const convertToImageUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('이미지 URL 변환 실패'));
      }
    };

    reader.onerror = () => {
      reject(new Error('파일을 읽는 중 오류 발생'));
    };

    reader.readAsDataURL(file);
  });
};
