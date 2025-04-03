import { useState, useEffect } from 'react';

const useTranslation = (inputText, fromLang, toLang) => {
  const [translation, setTranslation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const translateText = async () => {
      if (!inputText) {
        setTranslation('');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${fromLang}|${toLang}`
        );
        
        const data = await response.json();
        
        if (data.responseData?.translatedText) {
          setTranslation(data.responseData.translatedText);
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
    };

    const timeoutId = setTimeout(() => {
      translateText();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [inputText, fromLang, toLang]);

  return { translation, isLoading, error };
};

export default useTranslation;