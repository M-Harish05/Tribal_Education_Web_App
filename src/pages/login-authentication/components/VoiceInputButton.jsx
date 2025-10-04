import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceInputButton = ({ onVoiceInput, isListening, disabled }) => {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
    }
  }, []);

  const handleVoiceInput = () => {
    if (!isSupported || disabled) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'te-IN'; // Telugu language

    recognition.onresult = (event) => {
      const transcript = event?.results?.[0]?.[0]?.transcript;
      // Extract numbers from speech
      const numbers = transcript?.replace(/\D/g, '');
      if (numbers?.length >= 10) {
        onVoiceInput(numbers?.slice(-10)); // Take last 10 digits
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event?.error);
    };

    recognition?.start();
  };

  if (!isSupported) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleVoiceInput}
      disabled={disabled}
      className={`h-12 w-12 rounded-tribal ${isListening ? 'voice-pulse' : ''}`}
      title="మీ మొబైల్ నంబర్ చెప్పండి / Speak your mobile number"
    >
      <Icon 
        name={isListening ? "MicIcon" : "Mic"} 
        size={20} 
        className={isListening ? "text-primary" : "text-muted-foreground"}
      />
    </Button>
  );
};

export default VoiceInputButton;