import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchBar = ({ 
  onSearch, 
  onVoiceSearch, 
  placeholder = "Search traditions, stories, songs...",
  placeholderTelugu = "సంప్రదాయాలు, కథలు, పాటలు వెతకండి...",
  className = '' 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showTelugu, setShowTelugu] = useState(false);
  const recognitionRef = useRef(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice search is not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = showTelugu ? 'te-IN' : 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event?.results?.[0]?.[0]?.transcript;
      handleSearch(transcript);
      if (onVoiceSearch) {
        onVoiceSearch(transcript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event?.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition?.start();
  };

  const stopListening = () => {
    if (recognitionRef?.current && isListening) {
      recognitionRef?.current?.stop();
      setIsListening(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Input
          type="search"
          value={searchQuery}
          onChange={(e) => handleSearch(e?.target?.value)}
          placeholder={showTelugu ? placeholderTelugu : placeholder}
          className="pl-10 pr-20"
        />
        
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Icon name="Search" size={16} className="text-muted-foreground" />
        </div>

        {/* Action Buttons */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowTelugu(!showTelugu)}
            className="h-6 w-6 text-muted-foreground hover:text-foreground"
            title={showTelugu ? 'Switch to English' : 'Switch to Telugu'}
          >
            <span className="text-xs font-bold">
              {showTelugu ? 'EN' : 'తె'}
            </span>
          </Button>

          {/* Clear Button */}
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="h-6 w-6 text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={12} />
            </Button>
          )}

          {/* Voice Search Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={isListening ? stopListening : handleVoiceSearch}
            className={`h-6 w-6 ${
              isListening 
                ? 'text-primary animate-pulse' :'text-muted-foreground hover:text-foreground'
            }`}
            title={isListening ? 'Stop listening' : 'Voice search'}
          >
            <Icon name={isListening ? "MicOff" : "Mic"} size={12} />
          </Button>
        </div>
      </div>
      {/* Voice Search Status */}
      {isListening && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-primary/10 border border-primary/20 rounded-tribal">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-primary font-medium">
              {showTelugu ? 'వింటున్నాను...' : 'Listening...'}
            </span>
            <span className="text-xs text-muted-foreground">
              ({showTelugu ? 'Telugu' : 'English'})
            </span>
          </div>
        </div>
      )}
      {/* Search Suggestions */}
      {searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-tribal shadow-tribal-md z-10">
          <div className="p-2">
            <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
              Quick Suggestions
            </div>
            {[
              { en: 'Folk stories', te: 'జానపద కథలు' },
              { en: 'Traditional songs', te: 'సాంప్రదాయ పాటలు' },
              { en: 'Craft techniques', te: 'హస్తకళ పద్ధతులు' },
              { en: 'Festival customs', te: 'పండుగ ఆచారాలు' }
            ]?.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSearch(showTelugu ? suggestion?.te : suggestion?.en)}
                className="w-full text-left px-2 py-1 text-sm text-foreground hover:bg-muted rounded-tribal-sm smooth-transition"
              >
                {showTelugu ? suggestion?.te : suggestion?.en}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;