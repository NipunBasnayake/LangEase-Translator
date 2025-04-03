import React, { useState } from 'react';

const VoiceButton = ({ text, lang = 'en-GB' }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const speakText = () => {
    if (!text?.trim()) {
      alert('Please enter some text to speak.');
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 1;
      utterance.pitch = 1;
      
      setIsSpeaking(true);
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Speech synthesis is not supported in this browser.');
    }
  };
  
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <button 
      className={`btn voice-button ${isSpeaking ? 'btn-pulse' : ''}`} 
      onClick={isSpeaking ? stopSpeaking : speakText}
      title={isSpeaking ? "Stop speaking" : "Listen"}
    >
      <i className={`bi ${isSpeaking ? 'bi-pause-fill' : 'bi-volume-up'}`}></i>
    </button>
  );
};

export default VoiceButton;