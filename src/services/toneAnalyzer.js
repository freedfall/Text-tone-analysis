import axios from 'axios';

export const analyzeToneIBM = async (text) => {
  try {
    const response = await axios.post('http://localhost:4000/analyze-tone', { text });
    return response.data;
  } catch (error) {
    console.error('Ошибка при запросе к прокси-серверу:', error);
    throw error;
  }
};