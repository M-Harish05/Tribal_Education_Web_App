import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({ notifications, onMarkAsRead, onDismiss }) => {
  const [expandedNotification, setExpandedNotification] = useState(null);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_scheme': return 'Plus';
      case 'deadline': return 'Clock';
      case 'approval': return 'CheckCircle';
      case 'rejection': return 'XCircle';
      case 'document': return 'FileText';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-error bg-error/10 border-error/20';
    if (priority === 'medium') return 'text-warning bg-warning/10 border-warning/20';
    
    switch (type) {
      case 'approval': return 'text-success bg-success/10 border-success/20';
      case 'rejection': return 'text-error bg-error/10 border-error/20';
      default: return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-tribal shadow-tribal-sm">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Notifications
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-caption text-muted-foreground">
              నోటిఫికేషన్లు
            </span>
            {notifications?.filter(n => !n?.isRead)?.length > 0 && (
              <div className="flex items-center justify-center w-6 h-6 bg-error text-error-foreground text-xs font-mono font-medium rounded-full">
                {notifications?.filter(n => !n?.isRead)?.length}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications?.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-1">No notifications yet</p>
            <p className="text-sm font-caption text-muted-foreground">
              నోటిఫికేషన్లు లేవు
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {notifications?.map((notification) => (
              <div
                key={notification?.id}
                className={`p-4 hover:bg-muted/30 smooth-transition ${
                  !notification?.isRead ? 'bg-primary/5' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Icon */}
                  <div className={`flex-shrink-0 p-2 rounded-tribal border ${getNotificationColor(notification?.type, notification?.priority)}`}>
                    <Icon 
                      name={getNotificationIcon(notification?.type)} 
                      size={16} 
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-sm font-heading font-semibold text-foreground mb-1">
                          {notification?.title}
                        </h4>
                        <p className="text-sm font-caption text-muted-foreground">
                          {notification?.titleTelugu}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-2">
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(notification?.timestamp)}
                        </span>
                        {!notification?.isRead && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                    </div>

                    {/* Message Preview */}
                    <p className="text-sm text-foreground leading-relaxed mb-2">
                      {expandedNotification === notification?.id 
                        ? notification?.message 
                        : `${notification?.message?.substring(0, 100)}${notification?.message?.length > 100 ? '...' : ''}`
                      }
                    </p>

                    {/* Telugu Message */}
                    {expandedNotification === notification?.id && (
                      <p className="text-sm font-caption text-muted-foreground leading-relaxed mb-3">
                        {notification?.messageTelugu}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      {notification?.message?.length > 100 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedNotification(
                            expandedNotification === notification?.id ? null : notification?.id
                          )}
                          className="text-xs px-2 py-1 h-auto"
                        >
                          {expandedNotification === notification?.id ? 'Show Less' : 'Read More'}
                        </Button>
                      )}

                      {!notification?.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onMarkAsRead(notification?.id)}
                          className="text-xs px-2 py-1 h-auto text-primary hover:text-primary/80"
                        >
                          Mark as Read
                        </Button>
                      )}

                      {notification?.actionUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(notification?.actionUrl, '_blank')}
                          className="text-xs px-2 py-1 h-auto"
                          iconName="ExternalLink"
                          iconPosition="right"
                        >
                          {notification?.actionText || 'View'}
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDismiss(notification?.id)}
                        className="text-xs px-2 py-1 h-auto text-muted-foreground hover:text-foreground"
                      >
                        <Icon name="X" size={12} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Mark All as Read */}
      {notifications?.filter(n => !n?.isRead)?.length > 0 && (
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => notifications?.forEach(n => !n?.isRead && onMarkAsRead(n?.id))}
            className="w-full text-primary hover:text-primary/80"
          >
            Mark All as Read
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;