import { useState, useEffect, useCallback } from 'react';

const useTranslation = (inputText, fromLang, toLang) => {
  const [translation, setTranslation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastTranslated, setLastTranslated] = useState({
    text: '',
    from: '',
    to: ''
  });

  // Memoize the translate function to avoid unnecessary re-renders
  const translateText = useCallback(async (text, from, to) => {
    // If input is empty, reset translation
    if (!text) {
      setTranslation('');
      return;
    }

    // If it's the same text and languages as the last translation, don't re-fetch
    if (
      text === lastTranslated.text && 
      from === lastTranslated.from && 
      to === lastTranslated.to
    ) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
      );
      
      const data = await response.json();
      
      if (data.responseData?.translatedText) {
        setTranslation(data.responseData.translatedText);
        setLastTranslated({
          text,
          from,
          to
        });
      } else {
        setTranslation('Translation not available.');
        setError('Unable to translate text');
      }
    } catch (err) {
      setTranslation('Error translating text.');
      setError(err.message || 'Translation failed');
    } finally {
      setIsLoading(false);
    }
  }, [lastTranslated]);

  useEffect(() => {
    // Add a small delay to avoid too many API calls while typing
    const timeoutId = setTimeout(() => {
      translateText(inputText, fromLang, toLang);
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [inputText, fromLang, toLang, translateText]);

  // Function to force a translation (e.g., after switching languages)
  const forceTranslate = () => {
    // Reset lastTranslated to force a new translation
    setLastTranslated({
      text: '',
      from: '',
      to: ''
    });
    translateText(inputText, fromLang, toLang);
  };

  return { translation, isLoading, error, forceTranslate };
};

export default useTranslation;