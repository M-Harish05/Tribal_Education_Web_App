import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from './Button';
import Icon from '../AppIcon';

const MediaPlayer = ({ 
  src, 
  type = 'audio', // 'audio' or 'video'
  title,
  titleTelugu,
  description,
  descriptionTelugu,
  poster,
  autoplay = false,
  loop = false,
  controls = true,
  className = '',
  onPlay,
  onPause,
  onEnded,
  onError
}) => {
  const { getText } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const mediaRef = useRef(null);
  const progressRef = useRef(null);

  // Update time display
  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const updateTime = () => {
      setCurrentTime(media.currentTime);
    };

    const updateDuration = () => {
      setDuration(media.duration);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      setError(null);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      if (onPlay) onPlay();
    };

    const handlePause = () => {
      setIsPlaying(false);
      if (onPause) onPause();
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (onEnded) onEnded();
    };

    const handleError = (e) => {
      setError('Failed to load media');
      setIsLoading(false);
      if (onError) onError(e);
    };

    media.addEventListener('timeupdate', updateTime);
    media.addEventListener('loadedmetadata', updateDuration);
    media.addEventListener('loadstart', handleLoadStart);
    media.addEventListener('canplay', handleCanPlay);
    media.addEventListener('play', handlePlay);
    media.addEventListener('pause', handlePause);
    media.addEventListener('ended', handleEnded);
    media.addEventListener('error', handleError);

    return () => {
      media.removeEventListener('timeupdate', updateTime);
      media.removeEventListener('loadedmetadata', updateDuration);
      media.removeEventListener('loadstart', handleLoadStart);
      media.removeEventListener('canplay', handleCanPlay);
      media.removeEventListener('play', handlePlay);
      media.removeEventListener('pause', handlePause);
      media.removeEventListener('ended', handleEnded);
      media.removeEventListener('error', handleError);
    };
  }, [onPlay, onPause, onEnded, onError]);

  const togglePlayPause = () => {
    const media = mediaRef.current;
    if (!media) return;

    if (isPlaying) {
      media.pause();
    } else {
      media.play();
    }
  };

  const handleSeek = (e) => {
    const media = mediaRef.current;
    if (!media) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    media.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (mediaRef.current) {
      mediaRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const media = mediaRef.current;
    if (!media) return;

    if (isMuted) {
      media.volume = volume;
      setIsMuted(false);
    } else {
      media.volume = 0;
      setIsMuted(true);
    }
  };

  const changePlaybackRate = (rate) => {
    setPlaybackRate(rate);
    if (mediaRef.current) {
      mediaRef.current.playbackRate = rate;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (error) {
    return (
      <div className={`bg-error/10 border border-error/20 rounded-tribal p-4 ${className}`}>
        <div className="flex items-center space-x-2 text-error">
          <Icon name="AlertCircle" size={20} />
          <span className="text-sm font-medium">{error}</span>
        </div>
        <p className="text-xs text-error/80 mt-1">
          {getText('Unable to load media file', 'మీడియా ఫైల్ లోడ్ చేయలేకపోయింది')}
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-tribal ${className}`}>
      {/* Media Element */}
      {type === 'audio' ? (
        <audio
          ref={mediaRef}
          src={src}
          preload="metadata"
          loop={loop}
          className="w-full"
        />
      ) : (
        <video
          ref={mediaRef}
          src={src}
          poster={poster}
          preload="metadata"
          loop={loop}
          className="w-full rounded-tribal"
        />
      )}

      {/* Media Info */}
      {(title || description) && (
        <div className="p-4 border-b border-border">
          {title && (
            <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
              {getText(title, titleTelugu)}
            </h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">
              {getText(description, descriptionTelugu)}
            </p>
          )}
        </div>
      )}

      {/* Controls */}
      {controls && (
        <div className="p-4 space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div
              ref={progressRef}
              className="w-full h-2 bg-muted rounded-full cursor-pointer relative"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-primary rounded-full transition-all duration-200"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlayPause}
                disabled={isLoading}
                className="h-10 w-10"
              >
                {isLoading ? (
                  <Icon name="Loader2" size={20} className="animate-spin" />
                ) : isPlaying ? (
                  <Icon name="Pause" size={20} />
                ) : (
                  <Icon name="Play" size={20} />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="h-8 w-8"
              >
                <Icon name={isMuted ? "VolumeX" : "Volume2"} size={16} />
              </Button>

              <div className="w-20">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-muted rounded-full appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">
                {getText('Speed', 'వేగం')}
              </span>
              <select
                value={playbackRate}
                onChange={(e) => changePlaybackRate(parseFloat(e.target.value))}
                className="text-xs bg-background border border-border rounded px-2 py-1"
              >
                <option value={0.5}>0.5x</option>
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaPlayer;
