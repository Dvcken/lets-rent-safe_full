import apiRequest from '../client';

export async function getClients(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/clients?${query}`, { method: 'GET' });
}

export async function getClientById(id) {
  return apiRequest(`/clients/${id}`, { method: 'GET' });
}

export async function createClient(data) {
  // Мок-ответ: имитируем задержку и успешную регистрацию
  await new Promise(res => setTimeout(res, 1000));
  return { success: true };
}

export async function updateClient(id, data) {
  return apiRequest(`/clients/${id}`, {
    method: 'PUT',
    body: data,
  });
}

export async function checkClientExists(phone) {
  return apiRequest(`/clients/exists?phone=${encodeURIComponent(phone)}`, { method: 'GET' });
} 