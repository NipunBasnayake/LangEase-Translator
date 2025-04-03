import React, { useState } from 'react';
import VoiceButton from './VoiceButton';
import countries from '../data/countries';
import LanguageDetail from './LanguageDetail';

const LanguageSelector = ({ 
  label, 
  selectedLanguage, 
  onChange, 
  text,
  showVoiceButton = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  
  const commonLanguages = ['en-GB', 'fr-FR', 'es-ES', 'de-DE', 'zh-CN', 'ja-JP', 'ru-RU', 'ar-SA'];
  
  const handleSelectLanguage = (code) => {
    onChange(code);
    setShowDropdown(false);
    setSearchTerm('');
  };
  
  const filteredCountries = Object.entries(countries).filter(([name]) => 
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFlagEmoji = (countryCode) => {
    if (!countryCode) return '';
    const regionCode = countryCode.split('-')[1];
    if (!regionCode || regionCode.length !== 2) return '';
    
    const codePoints = regionCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    
    return String.fromCodePoint(...codePoints);
  };

  return (
    <>
      <label htmlFor={`select-${label}`} className="form-label fw-bold d-flex align-items-center">
        {label}:
        <button 
          className="btn btn-sm text-primary ms-2 p-0"
          onClick={() => setShowDetail(true)}
          title="Show language information"
        >
          <i className="bi bi-info-circle"></i>
        </button>
      </label>
      <div className="d-flex align-items-center">
        <div className="dropdown w-100 me-2">
          <button 
            className="form-select d-flex justify-content-between align-items-center" 
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            aria-expanded={showDropdown}
          >
            <span>{getFlagEmoji(selectedLanguage)} {countries[selectedLanguage]}</span>
            <i className="bi bi-chevron-down"></i>
          </button>
          
          {showDropdown && (
            <div className="dropdown-menu p-2 shadow-lg w-100 show">
              <input
                className="form-control mb-2"
                placeholder="Search languages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
              
              {searchTerm === '' && (
                <>
                  <h6 className="dropdown-header">Common Languages</h6>
                  {commonLanguages.map(code => (
                    <button 
                      key={code} 
                      className={`dropdown-item ${selectedLanguage === code ? 'active' : ''}`}
                      onClick={() => handleSelectLanguage(code)}
                    >
                      {getFlagEmoji(code)} {countries[code] || code}
                    </button>
                  ))}
                  <div className="dropdown-divider"></div>
                  <h6 className="dropdown-header">All Languages</h6>
                </>
              )}
              
              <div style={{maxHeight: '200px', overflowY: 'auto'}}>
                {filteredCountries.map(([code, name]) => (
                  <button 
                    key={code} 
                    className={`dropdown-item ${selectedLanguage === code ? 'active' : ''}`}
                    onClick={() => handleSelectLanguage(code)}
                  >
                    {getFlagEmoji(code)} {name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {(showVoiceButton && selectedLanguage === 'en-GB' && text) && (
          <VoiceButton text={text} lang={selectedLanguage} />
        )}
      </div>
      
      {showDetail && (
        <LanguageDetail 
          languageCode={selectedLanguage} 
          onClose={() => setShowDetail(false)} 
        />
      )}
    </>
  );
};

export default LanguageSelector;