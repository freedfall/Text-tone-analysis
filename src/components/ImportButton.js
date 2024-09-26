import React from 'react';

const ImportButton = ({ onFileImport }) => {
  return (
    <label className="import-button">
      Import
      <input
        type="file"
        accept=".txt, .pdf"
        style={{ display: 'none' }}
        onChange={onFileImport}
      />
    </label>
  );
};

export default ImportButton;
