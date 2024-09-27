import React, { useState } from 'react';
import TextInput from './components/TextInput';
import Button from './components/Button';
import ResultDisplay from './components/ResultDisplay';
import ImportButton from './components/ImportButton';
// import { analyzeTone } from './services/toneAnalyzer';
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
    const wordsArray = inputText.trim().split();
    return wordsArray.filter(word => word.length > 0).length;
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
        const words = countChars(fileText);

        if (words <= MAX_CHARS) {
          setText(fileText);
          setCharCount(words);
        } else {
          alert(`Max chars count exedeed: ${MAX_CHARS}`);
        }
      };

      if (file.type === "text/plain" || file.type === "application/pdf") {
        reader.readAsText(file);
      } else {
        alert("Please select .txt or .pdf file");
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
      setResult(analysis);
      setError('');
      setShowResult(true);
    } catch (err) {
      setError('An error occurred while analyzing the text.');
      setShowResult(true); 
    }
  };

  return (
    <div className="App">
      <h1>Text tone analyzer</h1>
      <div className="content">
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
            <h2>Results</h2>

            {/* Overall  mood*/}
            <h3>Emotional tone</h3>
            {result.sentiment && (
              <p>
                Оценка: {Math.round(result.sentiment.document.score * 100)}% 
                ({result.sentiment.document.label})
              </p>
            )}

            {/*Emotions */}
            {result.emotion && (
              <ul> 
                {Object.entries(result.emotion.document.emotion).map(([emotion, value]) => (
                  <li key={emotion}>
                    {emotion}: {Math.round(value * 100)}%
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
          {error && <p className="error">{error}</p>}
        </div>
      </div>
  );
}

export default App;
