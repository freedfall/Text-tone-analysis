import axios from 'axios';

const API_URL = 'https://api.example.com/analyze-tone';


// just a placeholder for the actual API call
export const analyzeTone = async (text) => {
  try {
    const response = await axios.post(API_URL, {
      text: text,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};
  
