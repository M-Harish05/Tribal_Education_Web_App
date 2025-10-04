import React from 'react';

import Button from '../../../components/ui/Button';

const CategoryFilter = ({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  className = '' 
}) => {
  const categoryConfig = {
    all: { icon: 'Grid3X3', label: 'All', telugu: 'అన్నీ', color: 'text-foreground' },
    story: { icon: 'BookOpen', label: 'Stories', telugu: 'కథలు', color: 'text-primary' },
    song: { icon: 'Music', label: 'Songs', telugu: 'పాటలు', color: 'text-accent' },
    craft: { icon: 'Palette', label: 'Crafts', telugu: 'హస్తకళలు', color: 'text-secondary' },
    custom: { icon: 'Users', label: 'Customs', telugu: 'ఆచారాలు', color: 'text-warning' }
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {categories?.map((category) => {
        const config = categoryConfig?.[category];
        const isActive = activeCategory === category;
        
        return (
          <Button
            key={category}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            iconName={config?.icon}
            iconPosition="left"
            iconSize={16}
            className={`flex-shrink-0 smooth-transition ${
              !isActive ? `hover:${config?.color} hover:border-current` : ''
            }`}
          >
            <span className="hidden sm:inline">{config?.label}</span>
            <span className="sm:hidden font-caption">{config?.telugu}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;