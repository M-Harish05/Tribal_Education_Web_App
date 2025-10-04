import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import VoiceNavigationButton from '../../components/ui/VoiceNavigationButton';
import NotificationAlertBanner from '../../components/ui/NotificationAlertBanner';
import OfflineStatusIndicator from '../../components/ui/OfflineStatusIndicator';
import WelcomeHeader from './components/WelcomeHeader';
import LearningModuleCard from './components/LearningModuleCard';
import QuickAccessPanel from './components/QuickAccessPanel';
import RecentActivityFeed from './components/RecentActivityFeed';
import MotivationalQuote from './components/MotivationalQuote';

const DashboardHome = () => {
  const learningModules = [
    {
      title: 'Basic Literacy',
      titleTelugu: 'ప్రాథమిక అక్షరాస్యత',
      description: 'Learn Telugu alphabets, numbers, and basic reading skills with interactive lessons.',
      descriptionTelugu: 'ఇంటరాక్టివ్ పాఠాలతో తెలుగు అక్షరాలు, సంఖ్యలు మరియు ప్రాథమిక పఠన నైపుణ్యాలను నేర్చుకోండి.',
      icon: 'BookOpen',
      progress: 65,
      totalLessons: 15,
      completedLessons: 10,
      route: '/basic-literacy-learning',
      bgGradient: 'from-primary/20 to-primary/10',
      iconColor: 'text-primary',
      estimatedTime: '2-3 weeks'
    },
    {
      title: 'Skill Development',
      titleTelugu: 'నైపుణ్య అభివృద్ధి',
      description: 'Master traditional handicrafts, organic farming, and digital literacy skills.',
      descriptionTelugu: 'సాంప్రదాయ హస్తకళలు, సేంద్రీయ వ్యవసాయం మరియు డిజిటల్ అక్షరాస్యత నైపుణ్యాలను నేర్చుకోండి.',
      icon: 'Wrench',
      progress: 40,
      totalLessons: 20,
      completedLessons: 8,
      route: '/skill-development',
      bgGradient: 'from-secondary/20 to-secondary/10',
      iconColor: 'text-secondary',
      estimatedTime: '4-6 weeks',
      isNew: true
    },
    {
      title: 'Government Schemes',
      titleTelugu: 'ప్రభుత్వ పథకాలు',
      description: 'Discover education scholarships, skill development programs, and financial assistance.',
      descriptionTelugu: 'విద్యా స్కాలర్‌షిప్‌లు, నైపుణ్య అభివృద్ధి కార్యక్రమాలు మరియు ఆర్థిక సహాయాన్ని కనుగొనండి.',
      icon: 'FileText',
      progress: 25,
      totalLessons: 12,
      completedLessons: 3,
      route: '/government-schemes-hub',
      bgGradient: 'from-success/20 to-success/10',
      iconColor: 'text-success',
      estimatedTime: '1-2 weeks'
    },
    {
      title: 'Traditional Knowledge',
      titleTelugu: 'సాంప్రదాయ జ్ఞానం',
      description: 'Preserve and learn tribal stories, songs, customs, and cultural practices.',
      descriptionTelugu: 'గిరిజన కథలు, పాటలు, ఆచారాలు మరియు సాంస్కృతిక అభ్యాసాలను సంరక్షించండి మరియు నేర్చుకోండి.',
      icon: 'Heart',
      progress: 80,
      totalLessons: 10,
      completedLessons: 8,
      route: '/traditional-knowledge',
      bgGradient: 'from-accent/20 to-accent/10',
      iconColor: 'text-accent',
      estimatedTime: '2-3 weeks'
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'scheme',
      title: 'New Scholarship Available',
      titleTelugu: 'కొత్త స్కాలర్‌షిప్ అందుబాటులో',
      message: 'PM-JANMAN Education Scholarship applications are now open. Apply before December 31st, 2025.',
      messageTelugu: 'PM-JANMAN విద్యా స్కాలర్‌షిప్ దరఖాస్తులు ఇప్పుడు తెరవబడ్డాయి. డిసెంబర్ 31, 2025కి ముందు దరఖాస్తు చేసుకోండి.',
      priority: 'high',
      deadline: '2025-12-31',
      actionText: 'Apply Now',
      actionTextTelugu: 'ఇప్పుడే దరఖాస్తు చేసుకోండి'
    }
  ];

  useEffect(() => {
    // Text-to-speech for page title on load
    const speakPageTitle = () => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('Welcome to your learning dashboard. గిరిజన విద్యా పోర్టల్‌కు స్వాగతం.');
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      }
    };

    // Speak title after a short delay
    const timer = setTimeout(speakPageTitle, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard Home - Tribal Education Portal</title>
        <meta name="description" content="Your personalized learning dashboard for tribal education, skill development, and cultural preservation. Track progress, access modules, and connect with your community." />
        <meta name="keywords" content="tribal education, dashboard, learning progress, skill development, government schemes, traditional knowledge" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Offline Status Indicator */}
          <div className="mb-4">
            <OfflineStatusIndicator />
          </div>

          {/* Notification Banner */}
          <div className="mb-6">
            <NotificationAlertBanner 
              notifications={notifications} 
              onDismiss={(id) => console.log('Dismissed notification:', id)} 
            />
          </div>

          {/* Welcome Header */}
          <WelcomeHeader 
            userName="రాజు"
            currentStreak={7}
            totalProgress={65}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            {/* Learning Modules - Takes 2 columns on xl screens */}
            <div className="xl:col-span-2">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-foreground">
                      Learning Modules
                    </h2>
                    <p className="text-sm font-caption text-muted-foreground">
                      అభ్యాస మాడ్యూల్స్
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>4 modules available</span>
                    <span className="font-caption">4 మాడ్యూల్స్ అందుబాటులో</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {learningModules?.map((module, index) => (
                    <LearningModuleCard
                      key={index}
                      title={module.title}
                      titleTelugu={module.titleTelugu}
                      description={module.description}
                      descriptionTelugu={module.descriptionTelugu}
                      icon={module.icon}
                      progress={module.progress}
                      totalLessons={module.totalLessons}
                      completedLessons={module.completedLessons}
                      route={module.route}
                      bgGradient={module.bgGradient}
                      iconColor={module.iconColor}
                      isNew={module.isNew}
                      estimatedTime={module.estimatedTime}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Access Panel */}
              <QuickAccessPanel />
            </div>

            {/* Sidebar Content */}
            <div className="xl:col-span-1 space-y-6">
              {/* Motivational Quote */}
              <MotivationalQuote />
              
              {/* Recent Activity Feed */}
              <RecentActivityFeed />
            </div>
          </div>

          {/* Footer Stats */}
          <div className="bg-muted/30 rounded-tribal border border-border p-6 tribal-pattern">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-mono font-bold text-primary mb-1">
                  1,247
                </div>
                <div className="text-sm text-muted-foreground">Active Learners</div>
                <div className="text-xs font-caption text-muted-foreground">క్రియాశీల అభ్యాసకులు</div>
              </div>
              
              <div>
                <div className="text-2xl font-mono font-bold text-success mb-1">
                  89%
                </div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
                <div className="text-xs font-caption text-muted-foreground">విజయ రేటు</div>
              </div>
              
              <div>
                <div className="text-2xl font-mono font-bold text-warning mb-1">
                  156
                </div>
                <div className="text-sm text-muted-foreground">Certificates Issued</div>
                <div className="text-xs font-caption text-muted-foreground">జారీ చేసిన సర్టిఫికేట్లు</div>
              </div>
              
              <div>
                <div className="text-2xl font-mono font-bold text-secondary mb-1">
                  24/7
                </div>
                <div className="text-sm text-muted-foreground">Support Available</div>
                <div className="text-xs font-caption text-muted-foreground">మద్దతు అందుబాటులో</div>
              </div>
            </div>
          </div>
        </main>

        {/* Voice Navigation Button */}
        <VoiceNavigationButton />
      </div>
    </>
  );
};

export default DashboardHome;