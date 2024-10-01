import axios from 'axios';

export const analyzeToneIBM = async (text) => {
  const apiKey = process.env.REACT_APP_IBM_API_KEY;
  const apiUrl = process.env.REACT_APP_IBM_API_URL;

  try {
    const response = await axios({
      method: 'post',
      url: `${apiUrl}/v1/analyze?version=2019-07-12`,  // adding version to the url
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`apikey:${apiKey}`)}`,  // using btoa to encode the API key
      },
      data: { 
        text: text,
        features: {
          sentiment: {},
          emotion: {},
        },
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error requesting IBM Watson: ', error);
    throw error;
  }
};