import { apiUrl } from '@utils/apiUrl';

export async function login(credentials) {
  const response = await fetch(`${apiUrl()}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  return response.json();
}

export async function register(userData) {
  const response = await fetch(`${apiUrl()}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  return response.json();
}

export async function getUserData(userId, token) {
  const response = await fetch(`${apiUrl()}/api/users/user/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar os dados do usuário');
  }

  return response.json();
}

export async function updateUser(userId, userData, token) {
  const response = await fetch(`${apiUrl()}/api/users/update/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar dados do usuário');
  }

  return response.json();
}

export async function requestPasswordReset(email) {
  const response = await fetch(`${apiUrl()}/api/users/esqueceu`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erro ao enviar o e-mail');
  }

  return data;
}
export async function resetPassword(token, password) {
  const response = await fetch(`${apiUrl()}/api/users/recuperar/:${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erro ao redefinir a senha');
  }

  return data;
}
