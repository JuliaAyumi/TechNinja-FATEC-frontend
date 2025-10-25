import { apiUrl } from '@utils/apiUrl';

export const getRanking = async () => {
  try {
    const response = await fetch(`${apiUrl()}/api/users/ranking`);

    if (!response.ok) {
      throw new Error(
        `Erro ao carregar ranking: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro em getRanking:', error);
    throw error;
  }
};
