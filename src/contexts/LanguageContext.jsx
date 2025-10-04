import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('english');
  const [isLoading, setIsLoading] = useState(false);

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'english';
    setLanguage(savedLanguage);
  }, []);

  // Save language preference to localStorage
  const changeLanguage = (newLanguage) => {
    setIsLoading(true);
    setLanguage(newLanguage);
    localStorage.setItem('selectedLanguage', newLanguage);
    
    // Add a small delay to show loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  // Get text based on current language
  const getText = (englishText, teluguText) => {
    if (language === 'telugu' && teluguText) {
      return teluguText;
    }
    return englishText;
  };

  // Get text with fallback
  const getTextWithFallback = (textObj) => {
    if (typeof textObj === 'string') {
      return textObj;
    }
    
    if (language === 'telugu' && textObj?.telugu) {
      return textObj.telugu;
    }
    
    return textObj?.english || textObj || '';
  };

  const value = {
    language,
    changeLanguage,
    getText,
    getTextWithFallback,
    isLoading,
    isTelugu: language === 'telugu',
    isEnglish: language === 'english'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
