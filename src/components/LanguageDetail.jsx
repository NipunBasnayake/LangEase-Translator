import React from 'react';

const LanguageDetail = ({ languageCode, onClose }) => {
  const languageInfo = {
    'en-GB': {
      name: 'English',
      nativeName: 'English',
      speakers: '1.5 billion',
      region: 'United Kingdom, USA, Canada, Australia, and many others',
      writingSystem: 'Latin alphabet',
      difficulty: 'Easy for most Western language speakers',
      funFact: 'English has more words than most languages, with over 170,000 words currently in use.'
    },
    'fr-FR': {
      name: 'French',
      nativeName: 'Français',
      speakers: '275 million',
      region: 'France, Canada, Belgium, Switzerland, many African countries',
      writingSystem: 'Latin alphabet with diacritics',
      difficulty: 'Moderate',
      funFact: 'The Académie Française was established in 1635 to protect the French language.'
    },
    'es-ES': {
      name: 'Spanish',
      nativeName: 'Español',
      speakers: '580 million',
      region: 'Spain, Latin America, parts of Africa and the US',
      writingSystem: 'Latin alphabet',
      difficulty: 'Relatively easy for English speakers',
      funFact: 'Spanish has two different words for "to be": ser and estar.'
    },
    'de-DE': {
      name: 'German',
      nativeName: 'Deutsch',
      speakers: '130 million',
      region: 'Germany, Austria, Switzerland, Liechtenstein, Luxembourg',
      writingSystem: 'Latin alphabet with umlauts',
      difficulty: 'Moderate to difficult',
      funFact: 'German is known for its compound words that can be extremely long.'
    },
    'zh-CN': {
      name: 'Chinese (Mandarin)',
      nativeName: '中文',
      speakers: '1.1 billion',
      region: 'China, Taiwan, Singapore',
      writingSystem: 'Chinese characters',
      difficulty: 'Very difficult for English speakers',
      funFact: 'Mandarin Chinese is a tonal language with four distinct tones.'
    },
    'ja-JP': {
      name: 'Japanese',
      nativeName: '日本語',
      speakers: '128 million',
      region: 'Japan',
      writingSystem: 'Kanji, Hiragana, and Katakana',
      difficulty: 'Very difficult for English speakers',
      funFact: 'Japanese has three writing systems used together.'
    },
    'ru-RU': {
      name: 'Russian',
      nativeName: 'Русский',
      speakers: '258 million',
      region: 'Russia, Belarus, Kazakhstan, Kyrgyzstan',
      writingSystem: 'Cyrillic alphabet',
      difficulty: 'Difficult for English speakers',
      funFact: 'Russian has no articles and minimal use of the verb "to be" in the present tense.'
    },
    'ar-SA': {
      name: 'Arabic',
      nativeName: 'العربية',
      speakers: '420 million',
      region: 'Middle East, North Africa',
      writingSystem: 'Arabic script (right-to-left)',
      difficulty: 'Very difficult for English speakers',
      funFact: 'Arabic has different written forms depending on where a letter is in a word.'
    }
  };

  const info = languageInfo[languageCode] || {
    name: 'Unknown Language',
    nativeName: 'Unknown',
    speakers: 'Unknown',
    region: 'Unknown',
    writingSystem: 'Unknown',
    difficulty: 'Unknown',
    funFact: 'No information available for this language.'
  };

  return (
    <div className="language-detail-modal">
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="language-detail-content">
        <div className="language-detail-header">
          <h5>{info.name}</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>
        <div className="language-detail-body">
          <p><strong>Native name:</strong> {info.nativeName}</p>
          <p><strong>Number of speakers:</strong> {info.speakers}</p>
          <p><strong>Region:</strong> {info.region}</p>
          <p><strong>Writing system:</strong> {info.writingSystem}</p>
          <p><strong>Difficulty for English speakers:</strong> {info.difficulty}</p>
          <div className="fun-fact">
            <h6>Fun Fact</h6>
            <p>{info.funFact}</p>
          </div>
        </div>
        <div className="language-detail-footer">
          <button className="btn btn-primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default LanguageDetail;