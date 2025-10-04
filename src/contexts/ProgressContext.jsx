import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState({
    // Basic stats
    totalXP: 0,
    level: 1,
    currentStreak: 0,
    longestStreak: 0,
    
    // Module progress
    modules: {
      'basic-literacy': {
        name: 'Basic Literacy',
        nameTelugu: 'ప్రాథమిక అక్షరాస్యత',
        totalLessons: 20,
        completedLessons: 0,
        xp: 0,
        isUnlocked: true,
        isCompleted: false
      },
      'skill-development': {
        name: 'Skill Development',
        nameTelugu: 'నైపుణ్య అభివృద్ధి',
        totalLessons: 25,
        completedLessons: 0,
        xp: 0,
        isUnlocked: false,
        isCompleted: false
      },
      'government-schemes': {
        name: 'Government Schemes',
        nameTelugu: 'ప్రభుత్వ పథకాలు',
        totalLessons: 15,
        completedLessons: 0,
        xp: 0,
        isUnlocked: false,
        isCompleted: false
      },
      'traditional-knowledge': {
        name: 'Traditional Knowledge',
        nameTelugu: 'సాంప్రదాయ జ్ఞానం',
        totalLessons: 18,
        completedLessons: 0,
        xp: 0,
        isUnlocked: false,
        isCompleted: false
      }
    },
    
    // Achievements
    achievements: [],
    
    // Daily goals
    dailyGoals: {
      lessonsCompleted: 0,
      targetLessons: 3,
      xpEarned: 0,
      targetXP: 100
    },
    
    // Statistics
    stats: {
      totalTimeSpent: 0, // in minutes
      averageSessionTime: 0,
      favoriteModule: null,
      lastActivity: null
    }
  });

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setUserProgress(parsed);
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  // Calculate level based on XP
  const calculateLevel = (xp) => {
    return Math.floor(xp / 1000) + 1;
  };

  // Calculate XP needed for next level
  const getXPForNextLevel = (currentLevel) => {
    return currentLevel * 1000;
  };

  // Calculate progress to next level
  const getProgressToNextLevel = () => {
    const currentLevel = userProgress.level;
    const xpForCurrentLevel = (currentLevel - 1) * 1000;
    const xpForNextLevel = currentLevel * 1000;
    const xpInCurrentLevel = userProgress.totalXP - xpForCurrentLevel;
    const xpNeeded = xpForNextLevel - xpForCurrentLevel;
    
    return {
      current: xpInCurrentLevel,
      needed: xpNeeded,
      percentage: (xpInCurrentLevel / xpNeeded) * 100
    };
  };

  // Complete a lesson
  const completeLesson = (moduleId, lessonId, xpEarned = 50) => {
    setUserProgress(prev => {
      const newProgress = { ...prev };
      
      // Update module progress
      if (newProgress.modules[moduleId]) {
        newProgress.modules[moduleId].completedLessons += 1;
        newProgress.modules[moduleId].xp += xpEarned;
        
        // Check if module is completed
        if (newProgress.modules[moduleId].completedLessons >= newProgress.modules[moduleId].totalLessons) {
          newProgress.modules[moduleId].isCompleted = true;
          
          // Unlock next module
          const moduleOrder = ['basic-literacy', 'skill-development', 'government-schemes', 'traditional-knowledge'];
          const currentIndex = moduleOrder.indexOf(moduleId);
          if (currentIndex < moduleOrder.length - 1) {
            const nextModuleId = moduleOrder[currentIndex + 1];
            if (newProgress.modules[nextModuleId]) {
              newProgress.modules[nextModuleId].isUnlocked = true;
            }
          }
        }
      }
      
      // Update total XP and level
      newProgress.totalXP += xpEarned;
      newProgress.level = calculateLevel(newProgress.totalXP);
      
      // Update daily goals
      newProgress.dailyGoals.lessonsCompleted += 1;
      newProgress.dailyGoals.xpEarned += xpEarned;
      
      // Update streak
      newProgress.currentStreak += 1;
      if (newProgress.currentStreak > newProgress.longestStreak) {
        newProgress.longestStreak = newProgress.currentStreak;
      }
      
      // Update last activity
      newProgress.stats.lastActivity = new Date().toISOString();
      
      return newProgress;
    });
  };

  // Reset daily goals (call this at midnight)
  const resetDailyGoals = () => {
    setUserProgress(prev => ({
      ...prev,
      dailyGoals: {
        lessonsCompleted: 0,
        targetLessons: 3,
        xpEarned: 0,
        targetXP: 100
      }
    }));
  };

  // Add achievement
  const addAchievement = (achievement) => {
    setUserProgress(prev => ({
      ...prev,
      achievements: [...prev.achievements, {
        ...achievement,
        id: Date.now(),
        unlockedAt: new Date().toISOString()
      }]
    }));
  };

  // Check and unlock achievements
  const checkAchievements = () => {
    const achievements = [];
    
    // First lesson achievement
    if (userProgress.modules['basic-literacy'].completedLessons >= 1 && 
        !userProgress.achievements.find(a => a.type === 'first-lesson')) {
      achievements.push({
        type: 'first-lesson',
        title: 'First Steps',
        titleTelugu: 'మొదటి అడుగులు',
        description: 'Completed your first lesson!',
        descriptionTelugu: 'మీ మొదటి పాఠాన్ని పూర్తి చేశారు!',
        icon: 'Star',
        xp: 100
      });
    }
    
    // Streak achievements
    if (userProgress.currentStreak >= 7 && 
        !userProgress.achievements.find(a => a.type === 'week-streak')) {
      achievements.push({
        type: 'week-streak',
        title: 'Week Warrior',
        titleTelugu: 'వారం యోధుడు',
        description: '7 days learning streak!',
        descriptionTelugu: '7 రోజుల నేర్చుకోవడం!',
        icon: 'Flame',
        xp: 200
      });
    }
    
    // Level achievements
    if (userProgress.level >= 5 && 
        !userProgress.achievements.find(a => a.type === 'level-5')) {
      achievements.push({
        type: 'level-5',
        title: 'Rising Star',
        titleTelugu: 'అధిరోహణ నక్షత్రం',
        description: 'Reached level 5!',
        descriptionTelugu: 'స్థాయి 5 చేరుకున్నారు!',
        icon: 'Award',
        xp: 500
      });
    }
    
    // Add achievements and XP
    achievements.forEach(achievement => {
      addAchievement(achievement);
      setUserProgress(prev => ({
        ...prev,
        totalXP: prev.totalXP + achievement.xp,
        level: calculateLevel(prev.totalXP + achievement.xp)
      }));
    });
  };

  // Get module progress percentage
  const getModuleProgress = (moduleId) => {
    const module = userProgress.modules[moduleId];
    if (!module) return 0;
    return (module.completedLessons / module.totalLessons) * 100;
  };

  // Get overall progress percentage
  const getOverallProgress = () => {
    const totalLessons = Object.values(userProgress.modules).reduce((sum, module) => sum + module.totalLessons, 0);
    const completedLessons = Object.values(userProgress.modules).reduce((sum, module) => sum + module.completedLessons, 0);
    return (completedLessons / totalLessons) * 100;
  };

  const value = {
    userProgress,
    completeLesson,
    resetDailyGoals,
    addAchievement,
    checkAchievements,
    getModuleProgress,
    getOverallProgress,
    getProgressToNextLevel,
    getXPForNextLevel,
    calculateLevel
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressContext;
