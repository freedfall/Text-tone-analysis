import axios from 'axios';

export const analyzeToneIBM = async (text) => {
  try {
    const response = await axios.post('http://localhost:4000/analyze-tone', { text });
    return response.data;
  } catch (error) {
    console.error('Error sending request to proxy server: ', error);
    throw error;
  }
};