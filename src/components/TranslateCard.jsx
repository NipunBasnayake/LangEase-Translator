import React, { useState, useEffect } from 'react';
import LanguageSelector from './LanguageSelector';
import Toast from './Toast';
import HoverButton from './HoverButton';
import useTranslation from '../hooks/useTranslation';
import countries from '../data/countries';

const TranslateCard = () => {
  const [inputText, setInputText] = useState('');
  const [fromLang, setFromLang] = useState('en-GB');
  const [toLang, setToLang] = useState('si-LK');
  const [characterCount, setCharacterCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [toast, setToast] = useState(null);
  const [recentTranslations, setRecentTranslations] = useState([]);
  
  const { translation, isLoading, error, forceTranslate } = useTranslation(inputText, fromLang, toLang);

  useEffect(() => {
    setCharacterCount(inputText.length);
    
    if (inputText.trim() === '') {
      setWordCount(0);
    } else {
      setWordCount(inputText.trim().split(/\s+/).length);
    }
  }, [inputText]);
  
  useEffect(() => {
    if (translation && inputText && !isLoading && !error) {
      const newTranslation = {
        id: Date.now(),
        fromLang,
        toLang,
        inputText: inputText.length > 30 ? `${inputText.substring(0, 30)}...` : inputText,
        translation: translation.length > 30 ? `${translation.substring(0, 30)}...` : translation,
        fullInputText: inputText,
        fullTranslation: translation
      };
      
      setRecentTranslations(prev => {
        const updated = [newTranslation, ...prev].slice(0, 5);
        localStorage.setItem('recentTranslations', JSON.stringify(updated));
        return updated;
      });
    }
  }, [translation, inputText, fromLang, toLang, isLoading, error]);
  
  useEffect(() => {
    const saved = localStorage.getItem('recentTranslations');
    if (saved) {
      try {
        setRecentTranslations(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing saved translations', e);
      }
    }
  }, []);

  const switchLanguages = () => {
    const tempLang = fromLang;
    setFromLang(toLang);
    setToLang(tempLang);
    
    setTimeout(() => {
      forceTranslate();
    }, 100);
    
    setToast({
      message: 'Languages switched',
      type: 'info'
    });
  };

  const clearText = () => {
    setInputText('');
    setToast({
      message: 'Text cleared',
      type: 'info'
    });
  };
  
  const loadSavedTranslation = (item) => {
    setFromLang(item.fromLang);
    setToLang(item.toLang);
    setInputText(item.fullInputText);
    
    setToast({
      message: 'Previous translation loaded',
      type: 'info'
    });
  };

  return (
    <div className="card shadow-lg mx-auto fade-in" style={{ maxWidth: '900px' }}>
      <div className="card-header text-white text-center">
        <h1 className="fw-bold mb-0">
          <i className="bi bi-translate"></i> LangEase Translate
        </h1>
      </div>
      
      <div className="card-body bg-white">
        <div className="row">
          <div className="col-md-5">
            <div className="language-control">
              <LanguageSelector 
                label="From" 
                selectedLanguage={fromLang} 
                onChange={setFromLang}
                text={inputText}
                showVoiceButton={true}
              />
            </div>
            
            <div className="position-relative">
              <textarea
                className="form-control"
                rows="8"
                placeholder="Type your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              
              {inputText && (
                <div className="d-flex justify-content-between align-items-center mt-2 text-muted">
                  <small>{characterCount} characters</small>
                  <small>{wordCount} words</small>
                  <button 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={clearText}
                    title="Clear text"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="col-md-2 d-flex align-items-center justify-content-center">
            <div className="switch-languages">
              <button 
                onClick={switchLanguages} 
                className="btn"
                title="Switch languages"
              >
                <i className="bi bi-arrow-left-right"></i>
              </button>
            </div>
          </div>
          
          <div className="col-md-5">
            <div className="language-control">
              <LanguageSelector 
                label="To" 
                selectedLanguage={toLang} 
                onChange={setToLang}
                text={translation}
                showVoiceButton={true}
              />
            </div>
            
            <div className="position-relative">
              <textarea
                className="form-control"
                rows="8"
                placeholder="Your translation will appear here..."
                value={translation}
                disabled
              />
              
              {isLoading && (
                <div className="position-absolute top-50 start-50 translate-middle">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              
              {translation && !isLoading && (
                <div className="d-flex justify-content-end mt-2 gap-2">
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => {
                      navigator.clipboard.writeText(translation);
                      setToast({
                        message: 'Translation copied to clipboard!',
                        type: 'success'
                      });
                    }}
                    title="Copy to clipboard"
                  >
                    <i className="bi bi-clipboard"></i>
                  </button>
                  
                  <button 
                    className="btn btn-sm btn-outline-success"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'LangEase Translation',
                          text: `${inputText}\n\n${translation}`,
                        }).catch(err => {
                          console.error('Share failed:', err);
                        });
                      } else {
                        setToast({
                          message: 'Sharing not supported on this browser',
                          type: 'warning'
                        });
                      }
                    }}
                    title="Share translation"
                  >
                    <i className="bi bi-share"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {recentTranslations.length > 0 && (
          <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="text-muted mb-0">Recent Translations</h6>
              <button 
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  setRecentTranslations([]);
                  localStorage.removeItem('recentTranslations');
                  setToast({
                    message: 'History cleared',
                    type: 'info'
                  });
                }}
              >
                <i className="bi bi-trash me-1"></i> Clear History
              </button>
            </div>
            <div className="row">
              {recentTranslations.map(item => (
                <div key={item.id} className="col-md-6 mb-2">
                  <div 
                    className="recent-translation p-3 rounded border"
                    onClick={() => loadSavedTranslation(item)}
                    style={{ 
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      backgroundColor: 'var(--light-color)',
                      borderColor: '#e2e8f0',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      position: 'relative',
                      overflow: 'hidden' 
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                      e.currentTarget.style.borderColor = 'var(--primary-color)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    <div 
                      className="position-absolute top-0 start-0 h-100 w-1"
                      style={{ 
                        backgroundColor: 'var(--primary-color)',
                        width: '4px' 
                      }}
                    ></div>
                    <div className="d-flex justify-content-between mb-1">
                      <small className="text-primary fw-bold">
                        {countries[item.fromLang]} <i className="bi bi-arrow-right"></i> {countries[item.toLang]}
                      </small>
                      <small className="text-muted">{new Date(item.id).toLocaleTimeString()}</small>
                    </div>
                    <div className="d-flex mt-1">
                      <div className="pe-3" style={{ flex: 1, borderRight: '1px solid #e2e8f0' }}>
                        <small className="text-muted d-block mb-1">Original:</small>
                        <div className="text-truncate">
                          <small>{item.inputText}</small>
                        </div>
                      </div>
                      <div className="ps-3" style={{ flex: 1 }}>
                        <small className="text-muted d-block mb-1">Translation:</small>
                        <div className="text-truncate">
                          <small>{item.translation}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-center mt-4 text-muted">
          <p className="small mb-0">Powered by MyMemory Translate API</p>
          <p className="small mb-0">Supports {Object.keys(countries).length} languages</p>
        </div>
        
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default TranslateCard;