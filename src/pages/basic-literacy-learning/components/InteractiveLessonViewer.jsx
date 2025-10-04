import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InteractiveLessonViewer = ({ 
  lesson, 
  onComplete, 
  onNext, 
  onPrevious,
  className = '' 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const canvasRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'te-IN'; // Telugu
    }
  }, []);

  const playAudio = (text, lang = 'te-IN') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
    }
  };

  const startListening = () => {
    if (recognitionRef?.current) {
      setIsListening(true);
      recognitionRef?.current?.start();
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event?.results?.[0]?.[0]?.transcript;
        setUserInput(transcript);
        checkAnswer(transcript);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  };

  const checkAnswer = (input) => {
    const currentStepData = lesson?.steps?.[currentStep];
    const isCorrect = currentStepData?.expectedAnswer && 
      input?.toLowerCase()?.includes(currentStepData?.expectedAnswer?.toLowerCase());
    
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      if (isCorrect && currentStep < lesson?.steps?.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }, 2000);
  };

  const handleNextStep = () => {
    if (currentStep < lesson?.steps?.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete && onComplete();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = lesson?.steps?.[currentStep];

  return (
    <div className={`bg-card border border-border rounded-tribal p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            {lesson?.title}
          </h2>
          <p className="text-sm font-caption text-muted-foreground">
            {lesson?.titleTelugu}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm font-mono text-muted-foreground">
            {currentStep + 1} / {lesson?.steps?.length}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => playAudio(currentStepData?.instruction, 'te-IN')}
            disabled={isPlaying}
            className="text-primary"
          >
            <Icon name={isPlaying ? "Volume2" : "VolumeX"} size={20} />
          </Button>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full smooth-transition"
            style={{ width: `${((currentStep + 1) / lesson?.steps?.length) * 100}%` }}
          />
        </div>
      </div>
      {/* Main Content */}
      <div className="space-y-6">
        {/* Visual Content */}
        {currentStepData?.type === 'letter' && (
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-primary/10 rounded-tribal border-2 border-primary/20">
              <span className="text-6xl font-heading font-bold text-primary">
                {currentStepData?.content}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">
                {currentStepData?.instruction}
              </p>
              <p className="text-sm font-caption text-muted-foreground">
                {currentStepData?.instructionTelugu}
              </p>
            </div>
          </div>
        )}

        {currentStepData?.type === 'word' && (
          <div className="text-center space-y-4">
            <Image
              src={currentStepData?.image}
              alt={currentStepData?.content}
              className="w-48 h-32 object-cover rounded-tribal mx-auto"
            />
            <div className="space-y-2">
              <p className="text-2xl font-heading font-semibold text-primary">
                {currentStepData?.content}
              </p>
              <p className="text-lg font-caption text-muted-foreground">
                {currentStepData?.contentTelugu}
              </p>
              <p className="text-sm text-foreground">
                {currentStepData?.instruction}
              </p>
            </div>
          </div>
        )}

        {currentStepData?.type === 'tracing' && (
          <div className="text-center space-y-4">
            <div className="bg-muted/50 rounded-tribal p-4">
              <canvas
                ref={canvasRef}
                width={300}
                height={200}
                className="border border-border rounded-tribal bg-background cursor-pointer mx-auto"
                style={{ touchAction: 'none' }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Trace the letter with your finger or mouse
            </p>
          </div>
        )}

        {/* Interactive Elements */}
        {currentStepData?.interactive && (
          <div className="flex flex-col items-center space-y-4">
            {/* Voice Input */}
            <Button
              variant={isListening ? "default" : "outline"}
              onClick={startListening}
              disabled={isListening}
              iconName="Mic"
              iconPosition="left"
              className={`${isListening ? 'voice-pulse' : ''}`}
            >
              {isListening ? 'Listening...' : 'Speak the Answer'}
            </Button>

            {/* Text Input */}
            <div className="w-full max-w-md">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e?.target?.value)}
                placeholder="Type your answer here..."
                className="w-full px-4 py-2 border border-border rounded-tribal bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <Button
              variant="default"
              onClick={() => checkAnswer(userInput)}
              disabled={!userInput?.trim()}
              iconName="Check"
              iconPosition="left"
            >
              Check Answer
            </Button>
          </div>
        )}

        {/* Feedback */}
        {showFeedback && (
          <div className={`text-center p-4 rounded-tribal ${
            userInput?.toLowerCase()?.includes(currentStepData?.expectedAnswer?.toLowerCase() || '')
              ? 'bg-success/10 border border-success/20' :'bg-warning/10 border border-warning/20'
          }`}>
            <Icon 
              name={userInput?.toLowerCase()?.includes(currentStepData?.expectedAnswer?.toLowerCase() || '') ? "CheckCircle" : "AlertCircle"} 
              size={24} 
              className={userInput?.toLowerCase()?.includes(currentStepData?.expectedAnswer?.toLowerCase() || '') ? "text-success" : "text-warning"}
            />
            <p className="mt-2 font-medium">
              {userInput?.toLowerCase()?.includes(currentStepData?.expectedAnswer?.toLowerCase() || '') 
                ? 'Excellent! Well done!' :'Try again! You can do it!'}
            </p>
          </div>
        )}
      </div>
      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePreviousStep}
          disabled={currentStep === 0}
          iconName="ChevronLeft"
          iconPosition="left"
        >
          Previous
        </Button>

        <div className="flex items-center space-x-2">
          {lesson?.steps?.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index <= currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <Button
          variant="default"
          onClick={handleNextStep}
          iconName={currentStep === lesson?.steps?.length - 1 ? "Check" : "ChevronRight"}
          iconPosition="right"
        >
          {currentStep === lesson?.steps?.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </div>
      {/* Cultural Pattern Overlay */}
      <div className="absolute inset-0 tribal-pattern opacity-5 pointer-events-none rounded-tribal" />
    </div>
  );
};

export default InteractiveLessonViewer;