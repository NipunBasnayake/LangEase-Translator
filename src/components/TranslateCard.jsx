import React, { useState } from 'react';
import LanguageSelector from './LanguageSelector';
import useTranslation from '../hooks/useTranslation';

const TranslateCard = () => {
  const [inputText, setInputText] = useState('');
  const [fromLang, setFromLang] = useState('en-GB');
  const [toLang, setToLang] = useState('si-LK');
  
  const { translation, isLoading } = useTranslation(inputText, fromLang, toLang);

  return (
    <div className="card shadow-lg mx-auto" style={{ maxWidth: '900px' }}>
      <div className="card-header bg-primary text-white text-center p-4">
        <h1 className="fw-bold">
          <i className="bi bi-translate"></i> LangEase Translate
        </h1>
      </div>
      
      <div className="card-body bg-white p-4">
        <div className="row">
          <div className="col-md-6">
            <LanguageSelector 
              label="From" 
              selectedLanguage={fromLang} 
              onChange={setFromLang}
              text={inputText}
              showVoiceButton={true}
            />
            
            <textarea
              className="form-control mt-3"
              rows="8"
              placeholder="Type your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          
          <div className="col-md-6">
            <LanguageSelector 
              label="To" 
              selectedLanguage={toLang} 
              onChange={setToLang}
              text={translation}
              showVoiceButton={true}
            />
            
            <div className="position-relative">
              <textarea
                className="form-control mt-3"
                rows="8"
                placeholder="Your translation will appear here..."
                value={translation}
                disabled
              />
              
              {isLoading && (
                <div className="position-absolute top-50 start-50 translate-middle">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslateCard;