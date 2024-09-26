import React from 'react';

// todo
const ResultDisplay = ({ result }) => (
  <div className={`result ${result}`}>
    Emotional tone: {result ? result : 'No data'}
  </div>
);

export default ResultDisplay;