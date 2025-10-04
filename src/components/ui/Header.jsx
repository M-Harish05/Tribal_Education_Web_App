import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import Icon from '../AppIcon';
import Button from './Button';
import LanguageToggle from './LanguageToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { getText } = useLanguage();

  const navigationItems = [
    { path: '/dashboard-home', label: 'Home', labelTelugu: 'హోమ్', icon: 'Home' },
    { path: '/basic-literacy-learning', label: 'Learn', labelTelugu: 'నేర్చుకోండి', icon: 'BookOpen' },
    { path: '/traditional-knowledge', label: 'Culture', labelTelugu: 'సంస్కృతి', icon: 'Heart' },
    { path: '/government-schemes-hub', label: 'Schemes', labelTelugu: 'పథకాలు', icon: 'FileText' },
    { path: '/stories-games', label: 'Stories & Games', labelTelugu: 'కథలు మరియు ఆటలు', icon: 'Gamepad2' },
  ];

  const secondaryItems = [
    { path: '/progress-tracking', label: 'Progress', labelTelugu: 'పురోగతి', icon: 'TrendingUp' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isActive = (path) => location?.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border shadow-tribal-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-tribal text-primary-foreground">
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="currentColor"
            >
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
              <path d="M8 11l2 2 4-4" stroke="white" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-heading font-semibold text-foreground">
              Tribal Education Portal
            </h1>
            <p className="text-xs font-caption text-muted-foreground">
              గిరిజన విద్యా పోర్టల్
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Button
              key={item?.path}
              variant={isActive(item?.path) ? "default" : "ghost"}
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={18}
              className="px-4 py-2 text-sm font-medium smooth-transition"
            >
              <span className="hidden xl:inline">{getText(item?.label, item?.labelTelugu)}</span>
              <span className="xl:hidden font-caption">{getText(item?.label, item?.labelTelugu)}</span>
            </Button>
          ))}
          
          {/* Language Toggle */}
          <LanguageToggle className="mr-2" />
          
          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              iconName="MoreHorizontal"
              iconSize={18}
              className="px-3 py-2"
            >
              <span className="sr-only">More options</span>
            </Button>
            
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-tribal shadow-tribal-md z-50">
                <div className="py-2">
                  {secondaryItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium text-left smooth-transition hover:bg-muted ${
                        isActive(item?.path) ? 'bg-muted text-primary' : 'text-foreground'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} className="mr-3" />
                      <span>{getText(item?.label, item?.labelTelugu)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center space-x-2">
          <LanguageToggle size="sm" />
          <Button
            variant="ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            iconName={isMenuOpen ? "X" : "Menu"}
            iconSize={20}
            className="p-2"
          >
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="px-4 py-2 space-y-1">
            {[...navigationItems, ...secondaryItems]?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center px-3 py-3 text-sm font-medium text-left rounded-tribal-sm smooth-transition ${
                  isActive(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} className="mr-3" />
                <div className="flex flex-col">
                  <span>{getText(item?.label, item?.labelTelugu)}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;