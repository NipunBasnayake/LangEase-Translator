import React from 'react';

const VoiceButton = ({ text, lang = 'en-GB' }) => {
  const speakText = () => {
    if (!text?.trim()) {
      alert('Please enter some text to speak.');
      return;
    }

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Speech synthesis is not supported in this browser.');
    }
  };

  return (
    <button className="btn voice-button" onClick={speakText}>
      <i className="bi bi-volume-up"></i>
    </button>
  );
};

export default VoiceButton;