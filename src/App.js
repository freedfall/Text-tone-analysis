import React, { useState } from 'react';
import TextInput from './components/TextInput';
import Button from './components/Button';
import MoodChart from './components/MoodChart';
import ImportButton from './components/ImportButton';
import { analyzeToneIBM } from './services/toneAnalyzer';
import './App.css';

const MAX_CHARS = 3000;

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [charCount, setCharCount] = useState(0);

  /**
   * Count chars in the input text
   * @param {string} inputText - input text
   * @returns {number} - number of characters without white spaces in the input text 
   */
  const countChars = (inputText) => {
    const charsArray = inputText.replace(/\s+/g, '').split(''); // remove white spaces and split the text into an array of characters
    return charsArray.length;
  };

  /**
   * Handle text input change
   * @param {*} e - text input event
   */
  const handleTextChange = (e) => {
    const inputText = e.target.value;
    const characters = inputText.replace(/\s+/g, '').length;

    if (characters <= MAX_CHARS) {
      setText(inputText);
      setCharCount(characters);
    }
  };

  /**
   * Handle file import
   * @param {*} e - file input event
   * @returns {void}
   * @throws {Error} - if file type is not supported
   * @throws {Error} - if max chars count exceeded
   */
  const handleFileImport = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileText = event.target.result;
        const chars = countChars(fileText);

        if (chars <= MAX_CHARS) {
          setText(fileText);
          setCharCount(chars);
        } else {
          alert(`Max chars count exedeed: ${MAX_CHARS}`);
        }
      };

      if (file.type === "text/plain") {
        reader.readAsText(file);
      } else {
        alert("Please select .txt file.");
      }
    }
  };

  /**
   * Handle analyze button click
   * @returns {void}
   */
  const handleAnalyze = async () => {
    if (!text) {
      setShowResult(true); 
      setError('Please enter some text.');
      return;
    }

    try {
      const analysis = await analyzeToneIBM(text);
      
      if (analysis.language !== 'en') {
        setError('Only English text is supported.');
        setResult(null);
        setShowResult(true);
        return;
      }
      else{
        setResult(analysis);
        setError('');
        setShowResult(true);
      }

      
    }catch (err) {
      console.log(err);
      if (err.message === 'IBM Watson API key or URL is missing.') {  
        setError('IBM Watson API key or URL is missing.');
        setShowResult(true); 
      } else{
        setError('An error occurred while analyzing the text: ' + err.response.data.error);
        setShowResult(true); 
      }
      
    }
  };


  return (
    <div className="App">
      <h1>Text tone analyzer</h1>
      <div className="main-container">
        <div className={`content ${showResult ? 'shifted' : ''}`}>
          <div className={`input-container ${showResult ? 'shifted' : ''}`}>
            <TextInput value={text} onChange={handleTextChange} />
          </div>
          <div className="actions-container">
            <ImportButton onFileImport={handleFileImport} />
            
            <div className={`word-counter ${charCount > MAX_CHARS ? 'limit-exceeded' : ''}`}>
              {charCount} / {MAX_CHARS}
            </div>

            <Button onClick={handleAnalyze} />
          </div>
        </div>

        <div className={`result-container ${showResult ? 'visible' : ''}`}>
          {result && (
            <div className="analysis-result">
              {result.sentiment && (
                <MoodChart 
                  score={result.sentiment.document.score} 
                  label={result.sentiment.document.label}
                  emotions={result.emotion.document.emotion}
              />
              )}
            </div>
          )}
            {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
