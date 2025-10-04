import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickAccessPanel = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'community',
      title: 'Community Hub',
      titleTelugu: 'కమ్యూనిటీ హబ్',
      description: 'Connect with learners',
      descriptionTelugu: 'అభ్యాసకులతో కనెక్ట్ అవ్వండి',
      icon: 'Users',
      route: '/community-hub',
      bgColor: 'bg-accent/10',
      iconColor: 'text-accent',
      isAvailable: false
    },
    {
      id: 'recent',
      title: 'Recent Lessons',
      titleTelugu: 'ఇటీవలి పాఠాలు',
      description: 'Continue where you left',
      descriptionTelugu: 'మీరు వదిలిన చోట కొనసాగించండి',
      icon: 'History',
      route: '/recent-lessons',
      bgColor: 'bg-secondary/10',
      iconColor: 'text-secondary',
      isAvailable: false
    },
    {
      id: 'voice-search',
      title: 'Voice Search',
      titleTelugu: 'వాయిస్ సెర్చ్',
      description: 'Speak to navigate',
      descriptionTelugu: 'నావిగేట్ చేయడానికి మాట్లాడండి',
      icon: 'Mic',
      bgColor: 'bg-primary/10',
      iconColor: 'text-primary',
      isVoiceAction: true
    },
    {
      id: 'progress',
      title: 'My Progress',
      titleTelugu: 'నా పురోగతి',
      description: 'View achievements',
      descriptionTelugu: 'విజయాలను చూడండి',
      icon: 'TrendingUp',
      route: '/progress-tracking',
      bgColor: 'bg-success/10',
      iconColor: 'text-success',
      isAvailable: true
    }
  ];

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'te-IN';
      
      recognition.onresult = (event) => {
        const transcript = event?.results?.[0]?.[0]?.transcript?.toLowerCase();
        
        // Simple voice command routing
        if (transcript?.includes('learn') || transcript?.includes('నేర్చుకో')) {
          navigate('/basic-literacy-learning');
        } else if (transcript?.includes('scheme') || transcript?.includes('పథకం')) {
          navigate('/government-schemes-hub');
        } else if (transcript?.includes('culture') || transcript?.includes('సంస్కృతి')) {
          navigate('/traditional-knowledge');
        } else if (transcript?.includes('progress') || transcript?.includes('పురోగతి')) {
          navigate('/progress-tracking');
        }
      };
      
      recognition?.start();
    }
  };

  const handleActionClick = (action) => {
    if (action?.isVoiceAction) {
      handleVoiceSearch();
    } else if (action?.route && action?.isAvailable) {
      navigate(action?.route);
    }
  };

  return (
    <div className="bg-background rounded-tribal border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">
            Quick Access
          </h2>
          <p className="text-sm font-caption text-muted-foreground">
            త్వరిత యాక్సెస్
          </p>
        </div>
        
        <Icon name="Zap" size={24} className="text-warning" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions?.map((action) => (
          <div
            key={action?.id}
            className={`${action?.bgColor} rounded-tribal p-4 border border-border hover:shadow-tribal-md smooth-transition cursor-pointer group ${
              !action?.isAvailable && !action?.isVoiceAction ? 'opacity-60 cursor-not-allowed' : ''
            }`}
            onClick={() => handleActionClick(action)}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              {/* Icon */}
              <div className={`w-12 h-12 bg-background rounded-tribal flex items-center justify-center ${action?.iconColor} group-hover:scale-110 smooth-transition`}>
                <Icon name={action?.icon} size={24} />
              </div>

              {/* Content */}
              <div className="space-y-1">
                <h3 className="font-heading font-semibold text-foreground text-sm">
                  {action?.title}
                </h3>
                <p className="font-caption text-xs text-muted-foreground">
                  {action?.titleTelugu}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {action?.description}
                </p>
                <p className="font-caption text-xs text-muted-foreground leading-relaxed">
                  {action?.descriptionTelugu}
                </p>
              </div>

              {/* Status Indicator */}
              {!action?.isAvailable && !action?.isVoiceAction && (
                <div className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-tribal-sm">
                  Coming Soon
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Voice Instructions */}
      <div className="mt-4 p-3 bg-primary/5 rounded-tribal border border-primary/20">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground">
            <p className="mb-1">
              <strong>Voice Commands:</strong> Say "Learn", "Schemes", "Culture", or "Progress" to navigate
            </p>
            <p className="font-caption">
              <strong>వాయిస్ కమాండ్లు:</strong> "నేర్చుకో", "పథకం", "సంస్కృతి", లేదా "పురోగతి" అని చెప్పండి
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAccessPanel;