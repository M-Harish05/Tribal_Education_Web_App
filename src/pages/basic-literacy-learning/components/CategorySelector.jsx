import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategorySelector = ({ 
  categories = [],
  selectedCategory,
  onCategorySelect,
  className = '' 
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Choose Learning Category
        </h2>
        <p className="text-sm font-caption text-muted-foreground">
          నేర్చుకునే విభాగాన్ని ఎంచుకోండి
        </p>
      </div>
      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories?.map((category) => (
          <Button
            key={category?.id}
            variant={selectedCategory === category?.id ? "default" : "outline"}
            onClick={() => onCategorySelect(category?.id)}
            className={`h-auto p-6 flex flex-col items-center space-y-3 smooth-transition ${
              selectedCategory === category?.id 
                ? 'ring-2 ring-primary shadow-tribal-md' 
                : 'hover:shadow-tribal-sm'
            }`}
          >
            {/* Icon */}
            <div className={`w-12 h-12 rounded-tribal flex items-center justify-center ${
              selectedCategory === category?.id 
                ? 'bg-primary-foreground text-primary' 
                : 'bg-primary/10 text-primary'
            }`}>
              <Icon name={category?.icon} size={24} />
            </div>

            {/* Content */}
            <div className="text-center space-y-1">
              <h3 className="font-heading font-semibold text-sm">
                {category?.title}
              </h3>
              <p className="text-xs font-caption opacity-80">
                {category?.titleTelugu}
              </p>
              
              {/* Progress Indicator */}
              {category?.progress !== undefined && (
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <div className="w-16 bg-muted rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full smooth-transition ${
                        selectedCategory === category?.id ? 'bg-primary-foreground' : 'bg-primary'
                      }`}
                      style={{ width: `${category?.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono opacity-80">
                    {category?.progress}%
                  </span>
                </div>
              )}

              {/* Lesson Count */}
              <div className="flex items-center justify-center space-x-1 text-xs opacity-80">
                <Icon name="BookOpen" size={12} />
                <span>{category?.lessonCount} lessons</span>
              </div>
            </div>

            {/* Completion Badge */}
            {category?.isCompleted && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={12} className="text-success-foreground" />
              </div>
            )}

            {/* Lock Badge */}
            {category?.isLocked && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                <Icon name="Lock" size={12} className="text-muted-foreground" />
              </div>
            )}
          </Button>
        ))}
      </div>
      {/* Selected Category Info */}
      {selectedCategory && (
        <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-tribal">
          {(() => {
            const selected = categories?.find(cat => cat?.id === selectedCategory);
            return selected ? (
              <div className="text-center space-y-2">
                <h3 className="font-heading font-semibold text-primary">
                  {selected?.title}
                </h3>
                <p className="text-sm text-foreground">
                  {selected?.description}
                </p>
                <p className="text-sm font-caption text-muted-foreground">
                  {selected?.descriptionTelugu}
                </p>
                
                {/* Quick Stats */}
                <div className="flex items-center justify-center space-x-6 mt-3 text-sm">
                  <div className="flex items-center space-x-1">
                    <Icon name="BookOpen" size={14} className="text-primary" />
                    <span>{selected?.lessonCount} lessons</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} className="text-primary" />
                    <span>{selected?.estimatedTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning" />
                    <span>{selected?.difficulty}</span>
                  </div>
                </div>
              </div>
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
};

export default CategorySelector;