import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LearningGoalsCard = ({ goals = [] }) => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    titleTelugu: '',
    targetDate: '',
    category: 'literacy'
  });

  const defaultGoals = [
    {
      id: 1,
      title: "Complete Basic Math Module",
      titleTelugu: "ప్రాథమిక గణిత మాడ్యూల్ పూర్తి చేయండి",
      category: "literacy",
      progress: 75,
      targetDate: "2024-10-31",
      createdDate: "2024-09-15",
      status: "active",
      milestones: [
        { id: 1, title: "Addition & Subtraction", completed: true },
        { id: 2, title: "Multiplication", completed: true },
        { id: 3, title: "Division", completed: false },
        { id: 4, title: "Word Problems", completed: false }
      ]
    },
    {
      id: 2,
      title: "Learn Traditional Weaving",
      titleTelugu: "సాంప్రదాయ నేత నేర్చుకోండి",
      category: "skills",
      progress: 40,
      targetDate: "2024-12-15",
      createdDate: "2024-09-20",
      status: "active",
      milestones: [
        { id: 1, title: "Basic Loom Setup", completed: true },
        { id: 2, title: "Thread Preparation", completed: true },
        { id: 3, title: "Pattern Creation", completed: false },
        { id: 4, title: "Final Project", completed: false }
      ]
    },
    {
      id: 3,
      title: "Earn Digital Literacy Certificate",
      titleTelugu: "డిజిటల్ అక్షరాస్యత సర్టిఫికేట్ పొందండి",
      category: "certification",
      progress: 0,
      targetDate: "2025-03-31",
      createdDate: "2024-10-01",
      status: "pending",
      milestones: [
        { id: 1, title: "Complete Prerequisites", completed: false },
        { id: 2, title: "Enroll in Program", completed: false },
        { id: 3, title: "Complete Coursework", completed: false },
        { id: 4, title: "Pass Final Assessment", completed: false }
      ]
    }
  ];

  const activeGoals = goals?.length > 0 ? goals : defaultGoals;

  const getCategoryConfig = (category) => {
    switch (category) {
      case 'literacy':
        return {
          icon: 'BookOpen',
          color: 'text-primary',
          bg: 'bg-primary/10',
          border: 'border-primary/20',
          label: 'Literacy',
          labelTelugu: 'అక్షరాస్యత'
        };
      case 'skills':
        return {
          icon: 'Wrench',
          color: 'text-secondary',
          bg: 'bg-secondary/10',
          border: 'border-secondary/20',
          label: 'Skills',
          labelTelugu: 'నైపుణ్యాలు'
        };
      case 'certification':
        return {
          icon: 'Award',
          color: 'text-accent',
          bg: 'bg-accent/10',
          border: 'border-accent/20',
          label: 'Certification',
          labelTelugu: 'సర్టిఫికేషన్'
        };
      default:
        return {
          icon: 'Target',
          color: 'text-muted-foreground',
          bg: 'bg-muted',
          border: 'border-border',
          label: 'General',
          labelTelugu: 'సాధారణ'
        };
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'active':
        return {
          color: 'text-success',
          bg: 'bg-success/10',
          label: 'Active',
          labelTelugu: 'చురుకుగా'
        };
      case 'completed':
        return {
          color: 'text-success',
          bg: 'bg-success/10',
          label: 'Completed',
          labelTelugu: 'పూర్తయింది'
        };
      case 'pending':
        return {
          color: 'text-warning',
          bg: 'bg-warning/10',
          label: 'Pending',
          labelTelugu: 'వేచి ఉంది'
        };
      default:
        return {
          color: 'text-muted-foreground',
          bg: 'bg-muted',
          label: 'Inactive',
          labelTelugu: 'నిష్క్రియ'
        };
    }
  };

  const handleAddGoal = () => {
    if (newGoal?.title?.trim()) {
      // In a real app, this would save to backend
      console.log('Adding new goal:', newGoal);
      setNewGoal({
        title: '',
        titleTelugu: '',
        targetDate: '',
        category: 'literacy'
      });
      setShowAddGoal(false);
    }
  };

  const getDaysRemaining = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-card border border-border rounded-tribal p-6 shadow-tribal-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Learning Goals
          </h2>
          <p className="text-sm font-caption text-muted-foreground">
            నేర్చుకునే లక్ష్యాలు
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddGoal(!showAddGoal)}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
        >
          <span className="hidden sm:inline">Add Goal</span>
          <span className="sm:hidden">లక్ష్యం జోడించండి</span>
        </Button>
      </div>
      {/* Add Goal Form */}
      {showAddGoal && (
        <div className="mb-6 p-4 bg-muted rounded-tribal border border-border">
          <h3 className="text-sm font-heading font-semibold text-foreground mb-4">
            Set New Learning Goal
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Goal Title"
                type="text"
                placeholder="Enter your learning goal"
                value={newGoal?.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e?.target?.value })}
              />
              <Input
                label="Telugu Title"
                type="text"
                placeholder="తెలుగులో లక్ష్యం"
                value={newGoal?.titleTelugu}
                onChange={(e) => setNewGoal({ ...newGoal, titleTelugu: e?.target?.value })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category
                </label>
                <select
                  value={newGoal?.category}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e?.target?.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-tribal text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="literacy">Literacy</option>
                  <option value="skills">Skills</option>
                  <option value="certification">Certification</option>
                </select>
              </div>
              <Input
                label="Target Date"
                type="date"
                value={newGoal?.targetDate}
                onChange={(e) => setNewGoal({ ...newGoal, targetDate: e?.target?.value })}
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleAddGoal}
                disabled={!newGoal?.title?.trim()}
              >
                Add Goal
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddGoal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Goals List */}
      <div className="space-y-4">
        {activeGoals?.map((goal) => {
          const categoryConfig = getCategoryConfig(goal?.category);
          const statusConfig = getStatusConfig(goal?.status);
          const daysRemaining = getDaysRemaining(goal?.targetDate);
          const completedMilestones = goal?.milestones?.filter(m => m?.completed)?.length || 0;
          const totalMilestones = goal?.milestones?.length || 0;
          
          return (
            <div
              key={goal?.id}
              className={`border rounded-tribal p-4 ${categoryConfig?.border} ${categoryConfig?.bg} smooth-transition hover:shadow-tribal-sm`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`flex items-center justify-center w-10 h-10 ${categoryConfig?.bg} rounded-tribal`}>
                    <Icon name={categoryConfig?.icon} size={20} className={categoryConfig?.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-heading font-semibold text-foreground">
                      {goal?.title}
                    </h3>
                    <p className="text-sm font-caption text-muted-foreground">
                      {goal?.titleTelugu}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`px-2 py-1 rounded-tribal text-xs font-medium ${categoryConfig?.bg} ${categoryConfig?.color}`}>
                        {categoryConfig?.label}
                      </span>
                      <span className={`px-2 py-1 rounded-tribal text-xs font-medium ${statusConfig?.bg} ${statusConfig?.color}`}>
                        {statusConfig?.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    Progress
                  </span>
                  <span className="text-sm font-mono font-medium text-foreground">
                    {goal?.progress}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-tribal h-2">
                  <div 
                    className={`h-2 ${categoryConfig?.color?.replace('text-', 'bg-')} rounded-tribal smooth-transition`}
                    style={{ width: `${goal?.progress}%` }}
                  />
                </div>
              </div>
              {/* Milestones */}
              {goal?.milestones && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Milestones
                    </span>
                    <span className="text-sm font-mono text-muted-foreground">
                      {completedMilestones}/{totalMilestones}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {goal?.milestones?.map((milestone) => (
                      <div key={milestone?.id} className="flex items-center space-x-3">
                        <Icon 
                          name={milestone?.completed ? "CheckCircle" : "Circle"} 
                          size={16} 
                          className={milestone?.completed ? "text-success" : "text-muted-foreground"}
                        />
                        <span className={`text-sm ${
                          milestone?.completed ? "text-foreground line-through" : "text-foreground"
                        }`}>
                          {milestone?.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Target: {new Date(goal.targetDate)?.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} className={daysRemaining < 7 ? "text-warning" : "text-muted-foreground"} />
                    <span className={`text-xs ${daysRemaining < 7 ? "text-warning" : "text-muted-foreground"}`}>
                      {daysRemaining > 0 ? `${daysRemaining} days left` : 'Overdue'}
                    </span>
                  </div>
                </div>
                
                {goal?.status === 'active' && (
                  <Button variant="ghost" size="sm">
                    <Icon name="Play" size={14} className="mr-1" />
                    Continue
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Empty State */}
      {activeGoals?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Target" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            No Learning Goals Set
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Set your first learning goal to track your progress
          </p>
          <Button
            variant="default"
            onClick={() => setShowAddGoal(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Your First Goal
          </Button>
        </div>
      )}
    </div>
  );
};

export default LearningGoalsCard;