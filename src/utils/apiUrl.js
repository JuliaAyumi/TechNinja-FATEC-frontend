export const apiUrl = () => {
  return import.meta.env.VITE_MODE === 'development'
    ? `http://localhost:${import.meta.env.VITE_PORT}`
    : import.meta.env.VITE_HEROKU_LINK;
};
