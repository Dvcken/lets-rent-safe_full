import apiRequest from '../client';

export async function login({ phone }) {
  // Мок-ответ: имитируем задержку и возвращаем номер для звонка
  await new Promise(res => setTimeout(res, 1000));
  return { callPhone: phone || '8 (499) 555-5555' };
}

export async function getAuthInfo() {
  return apiRequest('/auth/info', {
    method: 'GET',
  });
}

export async function logout() {
  return apiRequest('/auth/logout', {
    method: 'POST',
  });
}

export async function refreshToken(refreshToken) {
  return apiRequest('/auth/refresh', {
    method: 'POST',
    body: { refreshToken },
  });
} 