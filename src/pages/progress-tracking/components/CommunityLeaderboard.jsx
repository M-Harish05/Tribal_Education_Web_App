import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunityLeaderboard = ({ leaderboardData = [] }) => {
  const [activeTab, setActiveTab] = useState('weekly');

  const defaultLeaderboard = {
    weekly: [
      {
        id: 1,
        name: "Ravi Kumar",
        nameTelugu: "రవి కుమార్",
        village: "Bhadrachalam",
        villageTelugu: "భద్రాచలం",
        points: 1250,
        progress: 95,
        streak: 7,
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        isCurrentUser: false,
        achievements: 12
      },
      {
        id: 2,
        name: "Lakshmi Devi",
        nameTelugu: "లక్ష్మీ దేవి",
        village: "Khammam",
        villageTelugu: "ఖమ్మం",
        points: 1180,
        progress: 88,
        streak: 5,
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        isCurrentUser: false,
        achievements: 10
      },
      {
        id: 3,
        name: "Suresh Babu",
        nameTelugu: "సురేష్ బాబు",
        village: "Warangal",
        villageTelugu: "వరంగల్",
        points: 1120,
        progress: 82,
        streak: 4,
        avatar: "https://randomuser.me/api/portraits/men/56.jpg",
        isCurrentUser: true,
        achievements: 9
      },
      {
        id: 4,
        name: "Padma Reddy",
        nameTelugu: "పద్మ రెడ్డి",
        village: "Nizamabad",
        villageTelugu: "నిజామాబాద్",
        points: 1050,
        progress: 78,
        streak: 3,
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        isCurrentUser: false,
        achievements: 8
      },
      {
        id: 5,
        name: "Venkat Rao",
        nameTelugu: "వెంకట్ రావు",
        village: "Karimnagar",
        villageTelugu: "కరీంనగర్",
        points: 980,
        progress: 75,
        streak: 6,
        avatar: "https://randomuser.me/api/portraits/men/78.jpg",
        isCurrentUser: false,
        achievements: 7
      }
    ],
    monthly: [
      {
        id: 1,
        name: "Lakshmi Devi",
        nameTelugu: "లక్ష్మీ దేవి",
        village: "Khammam",
        villageTelugu: "ఖమ్మం",
        points: 4850,
        progress: 92,
        streak: 28,
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        isCurrentUser: false,
        achievements: 25
      },
      {
        id: 2,
        name: "Ravi Kumar",
        nameTelugu: "రవి కుమార్",
        village: "Bhadrachalam",
        villageTelugu: "భద్రాచలం",
        points: 4720,
        progress: 89,
        streak: 25,
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        isCurrentUser: false,
        achievements: 23
      },
      {
        id: 3,
        name: "Suresh Babu",
        nameTelugu: "సురేష్ బాబు",
        village: "Warangal",
        villageTelugu: "వరంగల్",
        points: 4420,
        progress: 85,
        streak: 22,
        avatar: "https://randomuser.me/api/portraits/men/56.jpg",
        isCurrentUser: true,
        achievements: 21
      }
    ],
    allTime: [
      {
        id: 1,
        name: "Ravi Kumar",
        nameTelugu: "రవి కుమార్",
        village: "Bhadrachalam",
        villageTelugu: "భద్రాచలం",
        points: 15420,
        progress: 100,
        streak: 45,
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        isCurrentUser: false,
        achievements: 48
      },
      {
        id: 2,
        name: "Lakshmi Devi",
        nameTelugu: "లక్ష్మీ దేవి",
        village: "Khammam",
        villageTelugu: "ఖమ్మం",
        points: 14850,
        progress: 98,
        streak: 42,
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        isCurrentUser: false,
        achievements: 45
      },
      {
        id: 3,
        name: "Suresh Babu",
        nameTelugu: "సురేష్ బాబు",
        village: "Warangal",
        villageTelugu: "వరంగల్",
        points: 12220,
        progress: 88,
        streak: 38,
        avatar: "https://randomuser.me/api/portraits/men/56.jpg",
        isCurrentUser: true,
        achievements: 35
      }
    ]
  };

  const activeLeaderboard = leaderboardData?.[activeTab] || defaultLeaderboard?.[activeTab];
  const currentUserRank = activeLeaderboard?.findIndex(user => user?.isCurrentUser) + 1;

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return { icon: 'Crown', color: 'text-warning' };
      case 2:
        return { icon: 'Medal', color: 'text-muted-foreground' };
      case 3:
        return { icon: 'Award', color: 'text-secondary' };
      default:
        return { icon: 'User', color: 'text-muted-foreground' };
    }
  };

  const tabs = [
    { id: 'weekly', label: 'Weekly', labelTelugu: 'వారపు' },
    { id: 'monthly', label: 'Monthly', labelTelugu: 'నెలవారీ' },
    { id: 'allTime', label: 'All Time', labelTelugu: 'మొత్తం' }
  ];

  return (
    <div className="bg-card border border-border rounded-tribal p-6 shadow-tribal-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Community Leaderboard
          </h2>
          <p className="text-sm font-caption text-muted-foreground">
            కమ్యూనిటీ లీడర్‌బోర్డ్
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Trophy" size={20} className="text-warning" />
          {currentUserRank > 0 && (
            <span className="text-sm font-mono font-medium text-foreground">
              Your Rank: #{currentUserRank}
            </span>
          )}
        </div>
      </div>
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-tribal p-1">
        {tabs?.map((tab) => (
          <Button
            key={tab?.id}
            variant={activeTab === tab?.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab?.id)}
            className="flex-1 text-xs"
          >
            <span className="hidden sm:inline">{tab?.label}</span>
            <span className="sm:hidden">{tab?.labelTelugu}</span>
          </Button>
        ))}
      </div>
      {/* Leaderboard List */}
      <div className="space-y-3">
        {activeLeaderboard?.map((user, index) => {
          const rank = index + 1;
          const rankConfig = getRankIcon(rank);
          
          return (
            <div
              key={user?.id}
              className={`flex items-center space-x-4 p-4 rounded-tribal border smooth-transition hover:shadow-tribal-sm ${
                user?.isCurrentUser
                  ? 'bg-primary/5 border-primary/20' :'bg-background border-border hover:bg-muted/50'
              }`}
            >
              {/* Rank */}
              <div className="flex items-center justify-center w-10 h-10">
                {rank <= 3 ? (
                  <Icon name={rankConfig?.icon} size={24} className={rankConfig?.color} />
                ) : (
                  <span className="text-lg font-heading font-bold text-muted-foreground">
                    {rank}
                  </span>
                )}
              </div>
              {/* Avatar */}
              <div className="relative">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-border"
                />
                {user?.streak >= 7 && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-warning rounded-full flex items-center justify-center">
                    <Icon name="Flame" size={12} className="text-warning-foreground" />
                  </div>
                )}
              </div>
              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-sm font-heading font-semibold text-foreground truncate">
                    {user?.name}
                  </h3>
                  {user?.isCurrentUser && (
                    <span className="px-2 py-0.5 bg-primary text-primary-foreground rounded-tribal text-xs font-medium">
                      You
                    </span>
                  )}
                </div>
                <p className="text-xs font-caption text-muted-foreground truncate">
                  {user?.nameTelugu} • {user?.village}
                </p>
                
                {/* Progress Bar */}
                <div className="mt-2">
                  <div className="w-full bg-muted rounded-tribal h-1.5">
                    <div 
                      className="h-1.5 bg-primary rounded-tribal smooth-transition"
                      style={{ width: `${user?.progress}%` }}
                    />
                  </div>
                </div>
              </div>
              {/* Stats */}
              <div className="text-right">
                <div className="flex items-center space-x-3 mb-1">
                  <div className="text-center">
                    <div className="text-sm font-heading font-bold text-foreground">
                      {user?.points?.toLocaleString()}
                    </div>
                    <div className="text-xs font-caption text-muted-foreground">
                      Points
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-heading font-bold text-foreground">
                      {user?.achievements}
                    </div>
                    <div className="text-xs font-caption text-muted-foreground">
                      Badges
                    </div>
                  </div>
                </div>
                
                {/* Streak */}
                <div className="flex items-center justify-end space-x-1">
                  <Icon name="Flame" size={12} className="text-warning" />
                  <span className="text-xs font-mono font-medium text-foreground">
                    {user?.streak} days
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Current User Summary (if not in top 5) */}
      {currentUserRank > 5 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-tribal">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-heading font-bold text-primary">
                #{currentUserRank}
              </span>
              <span className="text-sm font-medium text-foreground">
                Your Position
              </span>
            </div>
            <Button variant="outline" size="sm">
              <Icon name="TrendingUp" size={16} className="mr-2" />
              Improve Rank
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityLeaderboard;