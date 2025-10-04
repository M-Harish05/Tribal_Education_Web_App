import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onVoiceSearch, placeholder = "Search schemes..." }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
    }
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const startVoiceSearch = () => {
    if (!isSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event?.results?.[0]?.[0]?.transcript;
      setSearchQuery(transcript);
      onSearch(transcript);
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

    recognition?.start();
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="bg-card border border-border rounded-tribal p-4 shadow-tribal-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Search Schemes
        </h3>
        <span className="text-sm font-caption text-muted-foreground">
          పథకాలను వెతకండి
        </span>
      </div>
      <div className="relative">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder={placeholder}
              value={searchQuery}
              onChange={(e) => handleSearch(e?.target?.value)}
              className="pl-10 pr-10"
            />
            
            {/* Search Icon */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Icon name="Search" size={18} className="text-muted-foreground" />
            </div>

            {/* Clear Button */}
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
              >
                <Icon name="X" size={14} className="text-muted-foreground" />
              </Button>
            )}
          </div>

          {/* Voice Search Button */}
          {isSupported && (
            <Button
              variant={isListening ? "default" : "outline"}
              size="icon"
              onClick={startVoiceSearch}
              disabled={isListening}
              className={`flex-shrink-0 ${isListening ? 'voice-pulse' : ''}`}
              title="Voice search - Say scheme name or category"
            >
              <Icon 
                name={isListening ? "MicIcon" : "Mic"} 
                size={18} 
                className={isListening ? "text-primary-foreground" : "text-primary"}
              />
            </Button>
          )}
        </div>

        {/* Voice Search Status */}
        {isListening && (
          <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-primary/10 border border-primary/20 rounded-tribal-sm">
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Mic" size={16} className="text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Listening for scheme search...
              </span>
            </div>
            <p className="text-xs text-center text-muted-foreground mt-1">
              Try saying "education schemes" or "employment programs"
            </p>
          </div>
        )}
      </div>
      {/* Search Suggestions */}
      {searchQuery && (
        <div className="mt-3 p-3 bg-muted/30 rounded-tribal-sm">
          <p className="text-xs font-caption text-muted-foreground mb-2">
            Quick suggestions:
          </p>
          <div className="flex flex-wrap gap-2">
            {['Scholarship', 'Employment', 'Healthcare', 'Housing']?.map((suggestion) => (
              <Button
                key={suggestion}
                variant="ghost"
                size="sm"
                onClick={() => handleSearch(suggestion)}
                className="text-xs px-2 py-1 h-auto"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;