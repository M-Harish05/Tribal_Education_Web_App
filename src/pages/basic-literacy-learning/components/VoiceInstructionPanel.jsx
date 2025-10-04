import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceInstructionPanel = ({ 
  instructions = [],
  currentInstruction = 0,
  onInstructionComplete,
  autoPlay = true,
  className = '' 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLang, setCurrentLang] = useState('te-IN');
  const [playbackRate, setPlaybackRate] = useState(0.8);

  useEffect(() => {
    if (autoPlay && instructions?.length > 0) {
      playInstruction(currentInstruction);
    }
  }, [currentInstruction, autoPlay]);

  const playInstruction = (index, language = currentLang) => {
    if (!instructions?.[index] || isPlaying) return;

    const instruction = instructions?.[index];
    const text = language === 'te-IN' ? instruction?.textTelugu : instruction?.text;

    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = playbackRate;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
        if (onInstructionComplete) {
          onInstructionComplete(index);
        }
      };
      utterance.onerror = () => setIsPlaying(false);

      speechSynthesis.speak(utterance);
    }
  };

  const stopPlayback = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const toggleLanguage = () => {
    const newLang = currentLang === 'te-IN' ? 'en-US' : 'te-IN';
    setCurrentLang(newLang);
    if (isPlaying) {
      stopPlayback();
      setTimeout(() => playInstruction(currentInstruction, newLang), 100);
    }
  };

  const adjustSpeed = (newRate) => {
    setPlaybackRate(newRate);
    if (isPlaying) {
      stopPlayback();
      setTimeout(() => playInstruction(currentInstruction), 100);
    }
  };

  if (!instructions?.length) return null;

  const instruction = instructions?.[currentInstruction];

  return (
    <div className={`bg-card border border-border rounded-tribal p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Volume2" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-foreground">
            Voice Instructions
          </h3>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-xs"
          >
            {currentLang === 'te-IN' ? 'తెలుగు' : 'English'}
          </Button>
          
          {/* Speed Control */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => adjustSpeed(Math.max(0.5, playbackRate - 0.1))}
              className="h-6 w-6"
            >
              <Icon name="Minus" size={12} />
            </Button>
            <span className="text-xs font-mono w-8 text-center">
              {playbackRate?.toFixed(1)}x
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => adjustSpeed(Math.min(2.0, playbackRate + 0.1))}
              className="h-6 w-6"
            >
              <Icon name="Plus" size={12} />
            </Button>
          </div>
        </div>
      </div>
      {/* Current Instruction */}
      <div className="space-y-3 mb-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-sm font-mono text-primary">
              {currentInstruction + 1}
            </span>
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-sm text-foreground leading-relaxed">
              {currentLang === 'te-IN' ? instruction?.textTelugu : instruction?.text}
            </p>
            
            {/* Visual Cue */}
            {instruction?.visualCue && (
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Eye" size={14} />
                <span>{instruction?.visualCue}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Play/Pause Button */}
          <Button
            variant={isPlaying ? "default" : "outline"}
            size="sm"
            onClick={() => isPlaying ? stopPlayback() : playInstruction(currentInstruction)}
            iconName={isPlaying ? "Pause" : "Play"}
            iconPosition="left"
            iconSize={16}
            className={isPlaying ? 'voice-pulse' : ''}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </Button>

          {/* Repeat Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => playInstruction(currentInstruction)}
            disabled={isPlaying}
            iconName="RotateCcw"
            iconSize={16}
          >
            <span className="sr-only">Repeat</span>
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">
            {currentInstruction + 1} of {instructions?.length}
          </span>
          <div className="flex space-x-1">
            {instructions?.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentInstruction 
                    ? 'bg-primary' 
                    : index < currentInstruction 
                    ? 'bg-success' :'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Accessibility Note */}
      <div className="mt-3 p-2 bg-muted/30 rounded-tribal-sm">
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={14} className="text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            {currentLang === 'te-IN' ?'వినడానికి ప్లే బటన్ నొక్కండి లేదా స్పేస్ కీ వాడండి' :'Press play button or use spacebar to listen'
            }
          </p>
        </div>
      </div>
      {/* Cultural Pattern Overlay */}
      <div className="absolute inset-0 tribal-pattern opacity-5 pointer-events-none rounded-tribal" />
    </div>
  );
};

export default VoiceInstructionPanel;