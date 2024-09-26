import React from 'react';

const TextInput = ({ value, onChange }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder="Enter or import your text and press 'Check' to analyze" 
    className="text-input"
  />
);

export default TextInput;
