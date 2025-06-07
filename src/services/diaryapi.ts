export const uploadImageByPresignedUrl = async (
  file: File,
  uploadUrl: string,
): Promise<void> => {
  const res = await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`이미지 업로드 실패: ${res.status} - ${text}`);
  }

  console.log(`이미지 업로드 성공: ${uploadUrl}`);
};

export const createSession = async (
  fileNames: string[],
  imageFiles: File[],
  // eslint-disable-next-line no-unused-vars
  onSuccess?: (diaryId: string) => void,
): Promise<string> => {
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/core/images/session`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileNames }),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`세션 생성 실패: ${res.status} - ${text}`);
  }

  const data = await res.json();
  console.log('세션 생성 성공:', JSON.stringify(data, null, 2));

  const uploadPars = data.uploadPars;
  const diaryId = data.diaryId;

  for (let i = 0; i < imageFiles.length; i++) {
    await uploadImageByPresignedUrl(imageFiles[i], uploadPars[i].accessUri);
  }

  if (onSuccess) onSuccess(diaryId);
  return diaryId;
};
