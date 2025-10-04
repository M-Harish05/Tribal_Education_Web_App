import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationAlertBanner = ({ 
  notifications = [],
  onDismiss,
  className = '' 
}) => {
  const [currentNotification, setCurrentNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissedNotifications, setDismissedNotifications] = useState(new Set());

  // Sample notifications for demonstration
  const defaultNotifications = [
    {
      id: 1,
      type: 'scheme',
      title: 'New Government Scheme Available',
      titleTelugu: 'కొత్త ప్రభుత్వ పథకం అందుబాటులో',
      message: 'PM-JANMAN scheme applications are now open. Apply before December 31st.',
      messageTelugu: 'PM-JANMAN పథకం దరఖాస్తులు ఇప్పుడు తెరవబడ్డాయి. డిసెంబర్ 31కి ముందు దరఖాస్తు చేసుకోండి.',
      priority: 'high',
      deadline: '2025-12-31',
      actionText: 'Apply Now',
      actionTextTelugu: 'ఇప్పుడే దరఖాస్తు చేసుకోండి'
    },
    {
      id: 2,
      type: 'achievement',
      title: 'Congratulations! Course Completed',
      titleTelugu: 'అభినందనలు! కోర్సు పూర్తయింది',
      message: 'You have successfully completed Basic Literacy Level 1.',
      messageTelugu: 'మీరు ప్రాథమిక అక్షరాస్యత స్థాయి 1ని విజయవంతంగా పూర్తి చేశారు.',
      priority: 'medium',
      actionText: 'View Certificate',
      actionTextTelugu: 'సర్టిఫికేట్ చూడండి'
    }
  ];

  const activeNotifications = notifications?.length > 0 ? notifications : defaultNotifications;

  useEffect(() => {
    if (activeNotifications?.length > 0 && !currentNotification) {
      // Find first non-dismissed notification
      const availableNotification = activeNotifications?.find(n => !dismissedNotifications?.has(n?.id));
      if (availableNotification) {
        setCurrentNotification(availableNotification);
        setIsVisible(true);
      }
    }
  }, [activeNotifications, currentNotification, dismissedNotifications]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onDismiss) {
        onDismiss(currentNotification?.id);
      }
      
      // Mark notification as dismissed
      setDismissedNotifications(prev => new Set([...prev, currentNotification?.id]));
      
      // Find next non-dismissed notification
      const remainingNotifications = activeNotifications?.filter(n => !dismissedNotifications?.has(n?.id) && n?.id !== currentNotification?.id);
      if (remainingNotifications?.length > 0) {
        setCurrentNotification(remainingNotifications?.[0]);
        setIsVisible(true);
      } else {
        setCurrentNotification(null);
      }
    }, 300);
  };

  const handleAction = () => {
    // Handle notification action based on type
    if (currentNotification?.type === 'scheme') {
      // Navigate to schemes page or specific scheme
      window.location.href = '/government-schemes-hub';
    } else if (currentNotification?.type === 'achievement') {
      // Navigate to progress page
      window.location.href = '/progress-tracking';
    }
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'high':
        return {
          bg: 'bg-error/10 border-error/20',
          icon: 'AlertTriangle',
          iconColor: 'text-error',
          accent: 'bg-error'
        };
      case 'medium':
        return {
          bg: 'bg-warning/10 border-warning/20',
          icon: 'Info',
          iconColor: 'text-warning',
          accent: 'bg-warning'
        };
      default:
        return {
          bg: 'bg-primary/10 border-primary/20',
          icon: 'Bell',
          iconColor: 'text-primary',
          accent: 'bg-primary'
        };
    }
  };

  if (!currentNotification || !isVisible) {
    return null;
  }

  const styles = getPriorityStyles(currentNotification?.priority);

  return (
    <div className={`relative border rounded-tribal ${styles?.bg} ${className} smooth-transition ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
    }`}>
      {/* Priority Accent Bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${styles?.accent} rounded-l-tribal`} />
      <div className="flex items-start space-x-4 p-4 pl-6">
        {/* Icon */}
        <div className={`flex-shrink-0 ${styles?.iconColor}`}>
          <Icon name={styles?.icon} size={24} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-2">
            <h3 className="text-base font-heading font-semibold text-foreground">
              {currentNotification?.title}
            </h3>
            <span className="text-sm font-caption text-muted-foreground">
              {currentNotification?.titleTelugu}
            </span>
          </div>

          {/* Message */}
          <div className="space-y-1 mb-3">
            <p className="text-sm text-foreground leading-relaxed">
              {currentNotification?.message}
            </p>
            <p className="text-sm font-caption text-muted-foreground leading-relaxed">
              {currentNotification?.messageTelugu}
            </p>
          </div>

          {/* Deadline */}
          {currentNotification?.deadline && (
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Calendar" size={14} className="text-muted-foreground" />
              <span className="text-xs font-mono text-muted-foreground">
                Deadline: {new Date(currentNotification.deadline)?.toLocaleDateString()}
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
            <Button
              variant="default"
              size="sm"
              onClick={handleAction}
              className="w-full sm:w-auto"
            >
              <span className="sm:hidden">{currentNotification?.actionTextTelugu}</span>
              <span className="hidden sm:inline">{currentNotification?.actionText}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="w-full sm:w-auto text-muted-foreground hover:text-foreground"
            >
              <span className="sm:hidden">తీసివేయండి</span>
              <span className="hidden sm:inline">Dismiss</span>
            </Button>
          </div>
        </div>

        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDismiss}
          className="flex-shrink-0 h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <Icon name="X" size={16} />
          <span className="sr-only">Close notification</span>
        </Button>
      </div>
      {/* Cultural Pattern Overlay */}
      <div className="absolute inset-0 tribal-pattern opacity-5 pointer-events-none rounded-tribal" />
    </div>
  );
};

export default NotificationAlertBanner;