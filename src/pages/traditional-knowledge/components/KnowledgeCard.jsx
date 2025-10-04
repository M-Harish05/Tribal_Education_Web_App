import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const KnowledgeCard = ({ 
  item, 
  onPlay, 
  onContribute, 
  isPlaying = false,
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'story': return 'BookOpen';
      case 'song': return 'Music';
      case 'craft': return 'Palette';
      case 'custom': return 'Users';
      default: return 'Heart';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'story': return 'text-primary';
      case 'song': return 'text-accent';
      case 'craft': return 'text-secondary';
      case 'custom': return 'text-warning';
      default: return 'text-foreground';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-tribal shadow-tribal-sm hover:shadow-tribal-md smooth-transition ${className}`}>
      {/* Header Image */}
      <div className="relative h-48 overflow-hidden rounded-t-tribal">
        <Image
          src={item?.image}
          alt={item?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Type Badge */}
        <div className="absolute top-3 left-3 flex items-center space-x-1 bg-background/90 backdrop-blur-sm rounded-tribal px-2 py-1">
          <Icon 
            name={getTypeIcon(item?.type)} 
            size={14} 
            className={getTypeColor(item?.type)}
          />
          <span className="text-xs font-medium text-foreground capitalize">
            {item?.type}
          </span>
        </div>

        {/* Audio/Video Indicator */}
        {item?.hasAudio && (
          <div className="absolute top-3 right-3">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => onPlay(item)}
              className="h-8 w-8 bg-background/90 backdrop-blur-sm"
            >
              <Icon 
                name={isPlaying ? "Pause" : "Play"} 
                size={16} 
              />
            </Button>
          </div>
        )}

        {/* Elder Contributor */}
        {item?.contributor && (
          <div className="absolute bottom-3 left-3 flex items-center space-x-2 bg-background/90 backdrop-blur-sm rounded-tribal px-2 py-1">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <Image
                src={item?.contributor?.avatar}
                alt={item?.contributor?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-medium text-foreground">
              {item?.contributor?.name}
            </span>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <div className="mb-2">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
            {item?.title}
          </h3>
          <p className="text-sm font-caption text-muted-foreground">
            {item?.titleTelugu}
          </p>
        </div>

        {/* Description */}
        <div className="mb-3">
          <p className={`text-sm text-foreground leading-relaxed ${
            isExpanded ? '' : 'line-clamp-2'
          }`}>
            {item?.description}
          </p>
          {item?.description?.length > 100 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-1 p-0 h-auto text-primary hover:text-primary/80"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </Button>
          )}
        </div>

        {/* Cultural Context */}
        {item?.culturalContext && (
          <div className="mb-3 p-3 bg-muted rounded-tribal-sm">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-foreground mb-1">
                  Cultural Context
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item?.culturalContext}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={12} />
              <span>{item?.dateAdded}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={12} />
              <span>{item?.region}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={12} className="text-warning fill-current" />
            <span>{item?.rating}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {item?.hasAudio && (
            <Button
              variant="default"
              size="sm"
              onClick={() => onPlay(item)}
              iconName={isPlaying ? "Pause" : "Play"}
              iconPosition="left"
              iconSize={14}
              className="flex-1"
            >
              {isPlaying ? 'Pause' : 'Listen'}
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onContribute(item?.type)}
            iconName="Plus"
            iconPosition="left"
            iconSize={14}
            className="flex-1"
          >
            Contribute
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <Icon name="Share2" size={14} />
          </Button>
        </div>
      </div>
      {/* Cultural Pattern Overlay */}
      <div className="absolute inset-0 tribal-pattern opacity-5 pointer-events-none rounded-tribal" />
    </div>
  );
};

export default KnowledgeCard;