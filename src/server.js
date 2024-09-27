const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 4000;

app.use(cors());  // grant cross-origin access (avoid CORS policy)
app.use(express.json());  // parse incoming requests with JSON payloads

// Proxy server for IBM Watson Tone Analyzer
app.post('/analyze-tone', async (req, res) => {
  const { text } = req.body;  // incoming text
  const apiKey = process.env.REACT_APP_IBM_API_KEY;
  const apiUrl = process.env.REACT_APP_IBM_API_URL;
  // console.log(apiUrl);
  // console.log(apiKey);  

  try {
    const response = await axios({
        method: 'post',
        url: `${apiUrl}/v1/analyze?version=2019-07-12`,  // adding version to the url
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`apikey:${apiKey}`).toString('base64')}`,  // base64 format according to IBM Watson API
        },
        data: { 
          text: text,
          features: {
            sentiment: {},
            emotion: {},
          },
        },
    });

    res.json(response.data);  // send the response to the client
  } catch (error) {
    console.error('Error while requesting: ', error.response ? error.response.data : error.message);
    res.status(500).send('Error requesting IBM Watson');
  }
});

app.listen(port, () => {
  console.log(`Proxy server runs at http://localhost:${port}`);
});
