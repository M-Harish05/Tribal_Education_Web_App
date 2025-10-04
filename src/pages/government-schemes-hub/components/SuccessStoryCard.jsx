import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SuccessStoryCard = ({ story }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = () => {
    if (isPlaying) {
      // In a real app, this would pause the audio
      setIsPlaying(false);
    } else {
      // In a real app, this would play the audio narrative
      setIsPlaying(true);
      // Simulate audio duration
      setTimeout(() => {
        setIsPlaying(false);
      }, 3000);
    }
  };

  return (
    <div className="bg-card border border-border rounded-tribal shadow-tribal-sm overflow-hidden">
      {/* Header with Photo */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={story?.photo}
          alt={story?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Audio Play Button */}
        <Button
          variant="default"
          size="icon"
          onClick={handlePlayAudio}
          className="absolute top-4 right-4 w-10 h-10 rounded-full shadow-tribal-md"
        >
          <Icon 
            name={isPlaying ? "Pause" : "Play"} 
            size={20} 
            className="text-primary-foreground"
          />
        </Button>

        {/* Name Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-heading font-semibold text-white mb-1">
            {story?.name}
          </h3>
          <p className="text-sm font-caption text-white/80">
            {story?.nameTelugu}
          </p>
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        {/* Location and Scheme */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{story?.location}</span>
          </div>
          <div className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-tribal-sm">
            {story?.scheme}
          </div>
        </div>

        {/* Story Summary */}
        <p className="text-sm text-foreground leading-relaxed mb-3">
          {story?.summary}
        </p>
        <p className="text-sm font-caption text-muted-foreground leading-relaxed mb-4">
          {story?.summaryTelugu}
        </p>

        {/* Impact Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-muted/30 rounded-tribal-sm">
            <div className="text-lg font-heading font-bold text-primary mb-1">
              {story?.impact?.income}
            </div>
            <div className="text-xs text-muted-foreground">Monthly Income</div>
            <div className="text-xs font-caption text-muted-foreground">నెలవారీ ఆదాయం</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-tribal-sm">
            <div className="text-lg font-heading font-bold text-success mb-1">
              {story?.impact?.beneficiaries}
            </div>
            <div className="text-xs text-muted-foreground">People Helped</div>
            <div className="text-xs font-caption text-muted-foreground">సహాయం పొందినవారు</div>
          </div>
        </div>

        {/* Key Achievements */}
        <div className="mb-4">
          <h4 className="text-sm font-heading font-semibold text-foreground mb-2">
            Key Achievements
          </h4>
          <div className="space-y-2">
            {story?.achievements?.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Icon name="Award" size={14} className="text-warning flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{achievement}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="p-3 bg-primary/5 border-l-4 border-primary rounded-tribal-sm mb-4">
          <blockquote className="text-sm italic text-foreground mb-2">
            "{story?.quote}"
          </blockquote>
          <blockquote className="text-sm font-caption italic text-muted-foreground">
            "{story?.quoteTelugu}"
          </blockquote>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePlayAudio}
            className="flex-1"
            iconName={isPlaying ? "Pause" : "Play"}
            iconPosition="left"
          >
            <span className="sm:hidden">{isPlaying ? 'పాజ్' : 'వినండి'}</span>
            <span className="hidden sm:inline">{isPlaying ? 'Pause Story' : 'Listen to Story'}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex-1"
            iconName="Share"
            iconPosition="left"
          >
            <span className="sm:hidden">పంచుకోండి</span>
            <span className="hidden sm:inline">Share Story</span>
          </Button>
        </div>

        {/* Audio Progress */}
        {isPlaying && (
          <div className="mt-3 p-2 bg-muted/30 rounded-tribal-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Volume2" size={14} className="text-primary" />
              <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '30%' }} />
              </div>
              <span className="text-xs font-mono text-muted-foreground">0:30</span>
            </div>
          </div>
        )}
      </div>
      {/* Cultural Pattern Overlay */}
      <div className="absolute inset-0 tribal-pattern opacity-5 pointer-events-none rounded-tribal" />
    </div>
  );
};

export default SuccessStoryCard;