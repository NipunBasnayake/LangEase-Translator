import React from 'react';
import VoiceButton from './VoiceButton';
import countries from '../data/countries';

const LanguageSelector = ({ 
  label, 
  selectedLanguage, 
  onChange, 
  text,
  showVoiceButton = false
}) => {
  return (
    <>
      <label htmlFor={`select-${label}`} className="form-label fw-bold">{label}:</label>
      <div className="d-flex align-items-center">
        <select 
          id={`select-${label}`} 
          className="form-select me-2"
          value={selectedLanguage}
          onChange={(e) => onChange(e.target.value)}
        >
          {Object.entries(countries).map(([code, language]) => (
            <option key={code} value={code}>
              {language}
            </option>
          ))}
        </select>
        
        {(showVoiceButton && selectedLanguage === 'en-GB') && (
          <VoiceButton text={text} lang={selectedLanguage} />
        )}
      </div>
    </>
  );
};

export default LanguageSelector;