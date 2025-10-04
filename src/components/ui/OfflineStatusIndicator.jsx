import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const OfflineStatusIndicator = ({ className = '' }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState('synced'); // 'synced', 'syncing', 'pending'
  const [cachedContent, setCachedContent] = useState(85); // Percentage of cached content

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setSyncStatus('syncing');
      
      // Simulate sync process
      setTimeout(() => {
        setSyncStatus('synced');
      }, 2000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setSyncStatus('pending');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getStatusConfig = () => {
    if (!isOnline) {
      return {
        icon: 'WifiOff',
        text: 'Offline',
        telugu: 'ఆఫ్‌లైన్',
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        description: `${cachedContent}% content available`
      };
    }

    switch (syncStatus) {
      case 'syncing':
        return {
          icon: 'RefreshCw',
          text: 'Syncing',
          telugu: 'సింక్ అవుతోంది',
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          description: 'Updating content...',
          animate: true
        };
      case 'pending':
        return {
          icon: 'Clock',
          text: 'Pending',
          telugu: 'వేచి ఉంది',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          description: 'Will sync when online'
        };
      default:
        return {
          icon: 'Wifi',
          text: 'Online',
          telugu: 'ఆన్‌లైన్',
          color: 'text-success',
          bgColor: 'bg-success/10',
          description: 'All content updated'
        };
    }
  };

  const status = getStatusConfig();

  return (
    <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-tribal ${status?.bgColor} ${className}`}>
      <Icon 
        name={status?.icon} 
        size={16} 
        className={`${status?.color} ${status?.animate ? 'animate-spin' : ''} smooth-transition`}
      />
      {/* Desktop View */}
      <div className="hidden sm:flex flex-col">
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${status?.color}`}>
            {status?.text}
          </span>
          <span className="text-xs font-caption text-muted-foreground">
            {status?.telugu}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {status?.description}
        </span>
      </div>
      {/* Mobile View */}
      <div className="sm:hidden">
        <span className={`text-sm font-medium ${status?.color}`}>
          {status?.telugu}
        </span>
      </div>
      {/* Offline Content Indicator */}
      {!isOnline && (
        <div className="hidden md:flex items-center space-x-1 bg-background rounded-tribal-sm px-2 py-1">
          <Icon name="Download" size={12} className="text-success" />
          <span className="text-xs font-mono text-success font-medium">
            {cachedContent}%
          </span>
        </div>
      )}
    </div>
  );
};

export default OfflineStatusIndicator;