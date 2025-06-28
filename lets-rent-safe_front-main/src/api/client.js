import { authStorage } from './utils/auth-storage';
import { Navigate } from 'react-router-dom';

const API_BASE_URL = '/api';

async function apiRequest(endpoint, { method = 'GET', body, headers = {}, ...options } = {}) {
  const accessToken = authStorage.getAccessToken();
  const fetchHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };
  if (accessToken) {
    fetchHeaders['Authorization'] = `Bearer ${accessToken}`;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: fetchHeaders,
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });
    
    if (response.status === 403) {
      // Если получили 401 ошибку, очищаем токены и перенаправляем на страницу входа
      authStorage.clear();
      window.location.href = '/login';
      return;
    }
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'API error');
    }
    
    if (response.status === 204) return null;
    return response.json();
  } catch (error) {
    if (error.message.includes('401')) {
      authStorage.clear();
      window.location.href = '/login';
    }
    throw error;
  }
}

export default apiRequest;