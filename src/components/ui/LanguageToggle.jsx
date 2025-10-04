import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from './Button';
import Icon from '../AppIcon';

const LanguageToggle = ({ className = '', size = 'sm' }) => {
  const { language, changeLanguage, isLoading } = useLanguage();

  const handleToggle = () => {
    const newLanguage = language === 'english' ? 'telugu' : 'english';
    changeLanguage(newLanguage);
  };

  return (
    <Button
      variant="outline"
      size={size}
      onClick={handleToggle}
      disabled={isLoading}
      className={`flex items-center space-x-2 ${className}`}
      iconName={isLoading ? "Loader2" : "Globe"}
      iconPosition="left"
    >
      {isLoading ? (
        <span className="animate-spin">
          <Icon name="Loader2" size={16} />
        </span>
      ) : (
        <>
          <span className="hidden sm:inline">
            {language === 'english' ? 'తెలుగు' : 'English'}
          </span>
          <span className="sm:hidden">
            {language === 'english' ? 'తె' : 'EN'}
          </span>
        </>
      )}
    </Button>
  );
};

export default LanguageToggle;
