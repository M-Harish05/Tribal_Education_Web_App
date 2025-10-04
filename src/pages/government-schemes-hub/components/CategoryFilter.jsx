import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, schemeCounts }) => {
  const categoryIcons = {
    'All': 'Grid3X3',
    'Education': 'GraduationCap',
    'Healthcare': 'Heart',
    'Employment': 'Briefcase',
    'Housing': 'Home'
  };

  const categoryTelugu = {
    'All': 'అన్నీ',
    'Education': 'విద్య',
    'Healthcare': 'ఆరోగ్యం',
    'Employment': 'ఉపాధి',
    'Housing': 'గృహనిర్మాణం'
  };

  return (
    <div className="bg-card border border-border rounded-tribal p-4 shadow-tribal-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Filter by Category
        </h3>
        <span className="text-sm font-caption text-muted-foreground">
          వర్గం ద్వారా వడపోత
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {categories?.map((category) => {
          const isSelected = selectedCategory === category;
          const count = schemeCounts?.[category] || 0;
          
          return (
            <Button
              key={category}
              variant={isSelected ? "default" : "outline"}
              onClick={() => onCategoryChange(category)}
              className={`flex flex-col items-center p-4 h-auto space-y-2 smooth-transition ${
                isSelected ? 'ring-2 ring-primary/20' : ''
              }`}
            >
              <Icon 
                name={categoryIcons?.[category]} 
                size={24} 
                className={isSelected ? "text-primary-foreground" : "text-primary"}
              />
              <div className="text-center">
                <div className={`text-sm font-medium ${
                  isSelected ? "text-primary-foreground" : "text-foreground"
                }`}>
                  {category}
                </div>
                <div className={`text-xs font-caption ${
                  isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}>
                  {categoryTelugu?.[category]}
                </div>
                
                {count > 0 && (
                  <div className={`inline-flex items-center justify-center w-5 h-5 text-xs font-mono font-medium rounded-full mt-1 ${
                    isSelected 
                      ? "bg-primary-foreground text-primary" 
                      : "bg-primary text-primary-foreground"
                  }`}>
                    {count}
                  </div>
                )}
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;