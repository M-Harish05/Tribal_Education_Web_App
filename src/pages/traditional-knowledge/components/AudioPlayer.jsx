import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AudioPlayer = ({ 
  currentTrack, 
  onClose, 
  onNext, 
  onPrevious,
  className = '' 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showTranscription, setShowTranscription] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentTrack && audioRef?.current) {
      audioRef.current.src = currentTrack?.audioUrl;
      audioRef?.current?.load();
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (audioRef?.current) {
      if (isPlaying) {
        audioRef?.current?.pause();
      } else {
        audioRef?.current?.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef?.current) {
      setCurrentTime(audioRef?.current?.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef?.current) {
      setDuration(audioRef?.current?.duration);
    }
  };

  const handleSeek = (e) => {
    const rect = e?.currentTarget?.getBoundingClientRect();
    const percent = (e?.clientX - rect?.left) / rect?.width;
    const newTime = percent * duration;
    
    if (audioRef?.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    if (audioRef?.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  if (!currentTrack) return null;

  return (
    <div className={`bg-card border border-border rounded-tribal shadow-tribal-lg ${className}`}>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-tribal overflow-hidden">
            <img
              src={currentTrack?.image}
              alt={currentTrack?.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">
              {currentTrack?.title}
            </h3>
            <p className="text-sm font-caption text-muted-foreground">
              {currentTrack?.titleTelugu}
            </p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8"
        >
          <Icon name="X" size={16} />
        </Button>
      </div>
      {/* Progress Bar */}
      <div className="px-4 py-2">
        <div 
          className="w-full h-2 bg-muted rounded-full cursor-pointer"
          onClick={handleSeek}
        >
          <div 
            className="h-full bg-primary rounded-full smooth-transition"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          />
        </div>
        <div className="flex justify-between text-xs font-mono text-muted-foreground mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      {/* Controls */}
      <div className="flex items-center justify-center space-x-4 px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          className="h-10 w-10"
        >
          <Icon name="SkipBack" size={20} />
        </Button>

        <Button
          variant="default"
          size="icon"
          onClick={togglePlay}
          className="h-12 w-12"
        >
          <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          className="h-10 w-10"
        >
          <Icon name="SkipForward" size={20} />
        </Button>
      </div>
      {/* Volume Control */}
      <div className="flex items-center space-x-3 px-4 py-2">
        <Icon name="Volume2" size={16} className="text-muted-foreground" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="flex-1 h-1 bg-muted rounded-full appearance-none cursor-pointer"
        />
      </div>
      {/* Transcription Toggle */}
      {currentTrack?.transcription && (
        <div className="px-4 pb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTranscription(!showTranscription)}
            iconName={showTranscription ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            iconSize={14}
            className="w-full justify-between"
          >
            <span>Telugu Transcription</span>
          </Button>
          
          {showTranscription && (
            <div className="mt-2 p-3 bg-muted rounded-tribal-sm">
              <p className="text-sm font-caption text-foreground leading-relaxed">
                {currentTrack?.transcription}
              </p>
            </div>
          )}
        </div>
      )}
      {/* Cultural Context */}
      {currentTrack?.culturalContext && (
        <div className="px-4 pb-4">
          <div className="p-3 bg-accent/10 border border-accent/20 rounded-tribal-sm">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-foreground mb-1">
                  Cultural Significance
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {currentTrack?.culturalContext}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
