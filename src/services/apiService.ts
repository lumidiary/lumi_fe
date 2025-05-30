const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const API_URL = `${SERVER_URL}/`;

const requestFetch = async (
  url: string,
  method: string,
  data?: object,
  optionType: 'none' | 'tokenOnly' | 'tokenAndUserId' = 'tokenOnly',
  extraHeaders?: Record<string, string>,
) => {
  const token = localStorage.getItem('accessToken') || '';
  const userId = localStorage.getItem('userId') || '';

  const baseHeaders: Record<string, string> = {
    Accept: '*/*',
  };

  if (data && !(data instanceof FormData)) {
    baseHeaders['Content-Type'] = 'application/json';
  }

  if (data) baseHeaders['Content-Type'] = 'application/json';

  if (optionType === 'tokenOnly') {
    baseHeaders.token = token;
  }

  if (optionType === 'tokenAndUserId') {
    baseHeaders.token = token;
    baseHeaders.userId = userId;
  }

  const headers = new Headers({
    ...baseHeaders,
    ...extraHeaders,
  });

  const fullUrl = `${API_URL.replace(/\/+$/, '')}/${url.replace(/^\/+/, '')}`;

  try {
    const response = await fetch(fullUrl, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
};

// POST 요청
export const requestPostFetch = (
  url: string,
  data: object,
  optionType?: 'none' | 'tokenOnly' | 'tokenAndUserId',
) => {
  return requestFetch(url, 'POST', data, optionType);
};

// PUT 요청
export const requestPutFetch = (
  url: string,
  data: object,
  optionType?: 'none' | 'tokenOnly' | 'tokenAndUserId',
) => {
  return requestFetch(url, 'PUT', data, optionType);
};

// GET 요청
export const requestGetFetch = (
  url: string,
  optionType?: 'none' | 'tokenOnly' | 'tokenAndUserId',
) => {
  return requestFetch(url, 'GET', undefined, optionType);
};

// DELETE 요청
export const requestDeleteFetch = (
  url: string,
  optionType?: 'none' | 'tokenOnly' | 'tokenAndUserId',
) => {
  return requestFetch(url, 'DELETE', undefined, optionType);
};

// PATCH 요청
export const requestPatchFetch = (
  url: string,
  data: object,
  optionType?: 'none' | 'tokenOnly' | 'tokenAndUserId',
) => {
  return requestFetch(url, 'PATCH', data, optionType);
};
