export const getRanking = async () => {
  try {
    const apiUrl =
      import.meta.env.VITE_MODE === 'development'
        ? `http://localhost:${import.meta.env.VITE_PORT}`
        : import.meta.env.VITE_HEROKU_LINK;

    const response = await fetch(`${apiUrl}/api/users/ranking`);

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
