import axios from 'axios';

export const analyzeTone = async (text) => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const apiUrl = `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${apiKey}`;

  try {
    const response = await axios.post(apiUrl, {
      document: {
        type: 'PLAIN_TEXT',
        content: text,
      },
      encodingType: 'UTF8',
    });

    return response.data;
  } catch (error) {
    console.error('Ошибка при анализе текста:', error);
    throw new Error('Failed to analyze text');
  }
};
