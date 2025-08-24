export async function getSubThemes(area) {
  try {
    const apiUrl =
      import.meta.env.VITE_MODE === 'development'
        ? `http://localhost:${import.meta.env.VITE_PORT}`
        : import.meta.env.VITE_HEROKU_LINK;

    const response = await fetch(`${apiUrl}/api/quiz/${area}`);

    if (!response.ok) {
      throw new Error(
        `Erro ao buscar subtemas: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Erro em getSubThemes:', error);
    throw error;
  }
}

export async function getLevels(area, subtheme) {
  try {
    const apiUrl =
      import.meta.env.VITE_MODE === 'development'
        ? `http://localhost:${import.meta.env.VITE_PORT}`
        : import.meta.env.VITE_HEROKU_LINK;

    const response = await fetch(
      `${apiUrl}/api/quiz/${area}/${subtheme}/dificuldades`,
    );

    if (!response.ok) {
      throw new Error(
        `Erro ao buscar dificuldades: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro em getLevels:', error);
    throw error;
  }
}

export async function getCompletedQuizzes(user) {
  const response = await fetch(
    `${
      import.meta.env.VITE_MODE === 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL_PROD
    }/api/user-quizzes-completed`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user}`,
      },
    },
  );
  return response.json();
}

export async function getQuiz(area, subtheme, level) {
  const response = await fetch(
    `${
      import.meta.env.VITE_MODE === 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL_PROD
    }/api/quiz/${area}/${subtheme}/${level}`,
  );

  return response.json();
}

export async function updateScore(user, points) {
  const response = await fetch(
    `${
      import.meta.env.VITE_MODE === 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL_PROD
    }/api/update-score`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user}`,
      },
      body: JSON.stringify({ points }),
    },
  );
  return response.json();
}

export async function markQuizCompleted(user, area, subtheme, level) {
  const response = await fetch(
    `${
      import.meta.env.VITE_MODE === 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL_PROD
    }/api/mark-quiz-completed`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user}`,
      },
      body: JSON.stringify({ area, subtheme, level }),
    },
  );
  return response.json();
}
