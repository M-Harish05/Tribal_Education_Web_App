import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { voiceManager } from '../../utils/voiceUtils';
import Button from './Button';
import Icon from '../AppIcon';

const VoiceNavigationButton = () => {
  const { getText } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if voice recognition is supported
    const checkSupport = () => {
      const supported = voiceManager.isRecognitionSupported() && voiceManager.isSynthesisSupported();
      setIsSupported(supported);
      setIsVisible(supported);
    };

    checkSupport();

    // Show button after a delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleVoiceCommand = () => {
    if (!isSupported) {
      // Fallback: show voice commands list
      showVoiceCommands();
      return;
    }

    if (isListening) {
      voiceManager.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      voiceManager.startListening(
        (result) => {
          handleVoiceResult(result);
          setIsListening(false);
        },
        (error) => {
          console.error('Voice recognition error:', error);
          setIsListening(false);
        }
      );
    }
  };

  const handleVoiceResult = (result) => {
    const command = result.toLowerCase();
    
    // Navigation commands
    if (command.includes('home') || command.includes('dashboard')) {
      window.location.href = '/dashboard-home';
    } else if (command.includes('learn') || command.includes('learning')) {
      window.location.href = '/basic-literacy-learning';
    } else if (command.includes('schemes') || command.includes('government')) {
      window.location.href = '/government-schemes-hub';
    } else if (command.includes('culture') || command.includes('traditional')) {
      window.location.href = '/traditional-knowledge';
    } else if (command.includes('progress') || command.includes('tracking')) {
      window.location.href = '/progress-tracking';
    } else if (command.includes('stories') || command.includes('games')) {
      window.location.href = '/stories-games';
    } else if (command.includes('login') || command.includes('sign in')) {
      window.location.href = '/login-authentication';
    } else {
      // Speak the result back
      voiceManager.speak(`You said: ${result}`);
    }
  };

  const showVoiceCommands = () => {
    const commands = [
      'Say "Home" to go to dashboard',
      'Say "Learn" to start learning',
      'Say "Schemes" for government schemes',
      'Say "Culture" for traditional knowledge',
      'Say "Progress" to view your progress',
      'Say "Stories" for stories and games'
    ];

    const commandText = commands.join('. ');
    voiceManager.speak(commandText);
  };

  const speakWelcome = () => {
    const welcomeText = getText(
      'Welcome to Tribal Education Portal. Use voice commands to navigate.',
      'గిరిజన విద్యా పోర్టల్‌కు స్వాగతం. నావిగేట్ చేయడానికి వాయిస్ కమాండ్‌లను ఉపయోగించండి.'
    );
    voiceManager.speak(welcomeText);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end space-y-3">
        {/* Voice Commands Help */}
        <div className="hidden group-hover:block bg-card border border-border rounded-tribal p-3 shadow-tribal-lg max-w-xs">
          <h3 className="text-sm font-semibold text-foreground mb-2">
            {getText('Voice Commands', 'వాయిస్ కమాండ్‌లు')}
          </h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• {getText('Say "Home" for dashboard', '"హోమ్" చెప్పండి డ్యాష్‌బోర్డ్ కోసం')}</li>
            <li>• {getText('Say "Learn" to start learning', '"నేర్చుకోండి" చెప్పండి అభ్యాసం ప్రారంభించడానికి')}</li>
            <li>• {getText('Say "Schemes" for government schemes', '"పథకాలు" చెప్పండి ప్రభుత్వ పథకాల కోసం')}</li>
            <li>• {getText('Say "Culture" for traditional knowledge', '"సంస్కృతి" చెప్పండి సాంప్రదాయ జ్ఞానం కోసం')}</li>
          </ul>
        </div>

        {/* Main Voice Button */}
        <Button
          variant={isListening ? "default" : "outline"}
          size="icon"
          onClick={handleVoiceCommand}
          className={`h-14 w-14 rounded-full shadow-tribal-lg transition-all duration-300 ${
            isListening 
              ? 'bg-primary text-primary-foreground animate-pulse' 
              : 'bg-card hover:bg-primary hover:text-primary-foreground'
          }`}
          title={getText(
            isListening ? 'Listening... Click to stop' : 'Click to start voice navigation',
            isListening ? 'వినుతోంది... ఆపడానికి క్లిక్ చేయండి' : 'వాయిస్ నావిగేషన్ ప్రారంభించడానికి క్లిక్ చేయండి'
          )}
        >
          {isListening ? (
            <Icon name="Mic" size={24} className="animate-pulse" />
          ) : (
            <Icon name="Mic" size={24} />
          )}
        </Button>

        {/* Secondary Actions */}
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={speakWelcome}
            className="h-10 w-10 rounded-full bg-card border border-border shadow-tribal-md"
            title={getText('Welcome message', 'స్వాగత సందేశం')}
          >
            <Icon name="Volume2" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={showVoiceCommands}
            className="h-10 w-10 rounded-full bg-card border border-border shadow-tribal-md"
            title={getText('Voice commands help', 'వాయిస్ కమాండ్‌ల సహాయం')}
          >
            <Icon name="HelpCircle" size={16} />
          </Button>
        </div>

        {/* Status Indicator */}
        {isListening && (
          <div className="bg-primary/10 border border-primary/20 rounded-tribal px-3 py-2 text-xs text-primary">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>{getText('Listening...', 'వినుతోంది...')}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceNavigationButton;
