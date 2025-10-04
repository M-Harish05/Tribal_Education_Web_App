import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const SchemeCard = ({ scheme, onApply, onSave, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(scheme?.isSaved || false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(scheme?.id, !isSaved);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      default: return 'text-success bg-success/10 border-success/20';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Education': return 'GraduationCap';
      case 'Healthcare': return 'Heart';
      case 'Employment': return 'Briefcase';
      case 'Housing': return 'Home';
      default: return 'FileText';
    }
  };

  return (
    <div className="bg-card border border-border rounded-tribal shadow-tribal-sm hover:shadow-tribal-md smooth-transition">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-tribal">
              <Icon name={getCategoryIcon(scheme?.category)} size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                {scheme?.name}
              </h3>
              <p className="text-sm font-caption text-muted-foreground">
                {scheme?.nameTelugu}
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
            className="flex-shrink-0"
          >
            <Icon 
              name={isSaved ? "Bookmark" : "BookmarkPlus"} 
              size={20} 
              className={isSaved ? "text-primary fill-current" : "text-muted-foreground"}
            />
          </Button>
        </div>

        {/* Category and Urgency */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-tribal-sm">
              {scheme?.category}
            </span>
            <span className="text-xs font-caption text-muted-foreground">
              {scheme?.categoryTelugu}
            </span>
          </div>
          
          {scheme?.urgency && (
            <div className={`px-2 py-1 text-xs font-medium rounded-tribal-sm border ${getUrgencyColor(scheme?.urgency)}`}>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={12} />
                <span>{scheme?.deadline}</span>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-foreground leading-relaxed mb-3">
          {scheme?.description}
        </p>
        <p className="text-sm font-caption text-muted-foreground leading-relaxed">
          {scheme?.descriptionTelugu}
        </p>
      </div>
      {/* Benefits Preview */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-heading font-semibold text-foreground">
            Key Benefits
          </h4>
          <span className="text-xs font-caption text-muted-foreground">
            ప్రధాన ప్రయోజనాలు
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {scheme?.benefits?.slice(0, isExpanded ? scheme?.benefits?.length : 2)?.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={14} className="text-success flex-shrink-0" />
              <span className="text-sm text-foreground">{benefit}</span>
            </div>
          ))}
        </div>

        {scheme?.benefits?.length > 2 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-primary hover:text-primary/80"
          >
            {isExpanded ? 'Show Less' : `+${scheme?.benefits?.length - 2} more benefits`}
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} className="ml-1" />
          </Button>
        )}
      </div>
      {/* Expanded Details */}
      {isExpanded && (
        <div className="p-4 border-b border-border bg-muted/30">
          {/* Eligibility */}
          <div className="mb-4">
            <h5 className="text-sm font-heading font-semibold text-foreground mb-2">
              Eligibility Criteria
            </h5>
            <ul className="space-y-1">
              {scheme?.eligibility?.map((criteria, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Icon name="Dot" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{criteria}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Required Documents */}
          <div className="mb-4">
            <h5 className="text-sm font-heading font-semibold text-foreground mb-2">
              Required Documents
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {scheme?.documents?.map((doc, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="FileText" size={14} className="text-secondary flex-shrink-0" />
                  <span className="text-sm text-foreground">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Actions */}
      <div className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            onClick={() => onApply(scheme)}
            className="flex-1"
            iconName="ExternalLink"
            iconPosition="right"
          >
            <span className="sm:hidden">దరఖాస్తు చేసుకోండి</span>
            <span className="hidden sm:inline">Apply Now</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => onViewDetails(scheme)}
            className="flex-1"
            iconName="Info"
            iconPosition="left"
          >
            <span className="sm:hidden">వివరాలు</span>
            <span className="hidden sm:inline">View Details</span>
          </Button>
        </div>

        {/* Application Status */}
        {scheme?.applicationStatus && (
          <div className="mt-3 p-2 bg-muted rounded-tribal-sm">
            <div className="flex items-center space-x-2">
              <Icon 
                name={scheme?.applicationStatus === 'applied' ? 'CheckCircle' : 'Clock'} 
                size={14} 
                className={scheme?.applicationStatus === 'applied' ? 'text-success' : 'text-warning'}
              />
              <span className="text-xs font-medium text-foreground">
                {scheme?.applicationStatus === 'applied' ? 'Application Submitted' : 'Application in Progress'}
              </span>
            </div>
          </div>
        )}
      </div>
      {/* Cultural Pattern Overlay */}
      <div className="absolute inset-0 tribal-pattern opacity-5 pointer-events-none rounded-tribal" />
    </div>
  );
};

export default SchemeCard;