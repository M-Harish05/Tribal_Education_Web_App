import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MotivationalQuote = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const motivationalQuotes = [
    {
      english: "Education is the most powerful weapon which you can use to change the world.",
      telugu: "విద్య అనేది ప్రపంచాన్ని మార్చడానికి మీరు ఉపయోగించగల అత్యంత శక్తివంతమైన ఆయుధం.",
      author: "Nelson Mandela",
      category: "education"
    },
    {
      english: "The roots of education are bitter, but the fruit is sweet.",
      telugu: "విద్య యొక్క మూలాలు చేదుగా ఉంటాయి, కానీ ఫలం తీయగా ఉంటుంది.",
      author: "Aristotle",
      category: "learning"
    },
    {
      english: "Knowledge is power. Information is liberating.",
      telugu: "జ్ఞానం శక్తి. సమాచారం విముక్తి కలిగిస్తుంది.",
      author: "Kofi Annan",
      category: "knowledge"
    },
    {
      english: "Every child deserves a champion – an adult who will never give up on them.",
      telugu: "ప్రతి పిల్లవాడు ఒక ఛాంపియన్‌కు అర్హుడు - వారిని ఎప్పటికీ వదులుకోని పెద్దవాడు.",
      author: "Rita Pierson",
      category: "support"
    },
    {
      english: "The beautiful thing about learning is that no one can take it away from you.",
      telugu: "అభ్యాసం గురించి అందమైన విషయం ఏమిటంటే దానిని ఎవరూ మీ నుండి తీసుకోలేరు.",
      author: "B.B. King",
      category: "learning"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => 
        (prevIndex + 1) % motivationalQuotes?.length
      );
    }, 10000); // Change quote every 10 seconds

    return () => clearInterval(interval);
  }, [motivationalQuotes?.length]);

  const currentQuote = motivationalQuotes?.[currentQuoteIndex];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'education':
        return 'GraduationCap';
      case 'learning':
        return 'BookOpen';
      case 'knowledge':
        return 'Lightbulb';
      case 'support':
        return 'Heart';
      default:
        return 'Quote';
    }
  };

  const handlePrevious = () => {
    setCurrentQuoteIndex((prevIndex) => 
      prevIndex === 0 ? motivationalQuotes?.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentQuoteIndex((prevIndex) => 
      (prevIndex + 1) % motivationalQuotes?.length
    );
  };

  return (
    <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-tribal border border-border p-6 tribal-pattern">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name={getCategoryIcon(currentQuote?.category)} size={24} className="text-accent" />
          <div>
            <h2 className="text-lg font-heading font-bold text-foreground">
              Daily Inspiration
            </h2>
            <p className="text-sm font-caption text-muted-foreground">
              రోజువారీ ప్రేరణ
            </p>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevious}
            className="w-8 h-8 bg-background rounded-tribal border border-border flex items-center justify-center hover:bg-muted smooth-transition"
            aria-label="Previous quote"
          >
            <Icon name="ChevronLeft" size={16} className="text-muted-foreground" />
          </button>
          
          <button
            onClick={handleNext}
            className="w-8 h-8 bg-background rounded-tribal border border-border flex items-center justify-center hover:bg-muted smooth-transition"
            aria-label="Next quote"
          >
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      {/* Quote Content */}
      <div className="space-y-4">
        <div className="relative">
          {/* Quote Icon */}
          <Icon name="Quote" size={32} className="absolute -top-2 -left-2 text-accent/20" />
          
          <div className="pl-8 space-y-3">
            <blockquote className="text-lg font-heading font-medium text-foreground leading-relaxed">
              "{currentQuote?.english}"
            </blockquote>
            
            <blockquote className="text-base font-caption text-muted-foreground leading-relaxed">
              "{currentQuote?.telugu}"
            </blockquote>
          </div>
        </div>

        {/* Author */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-1 h-8 bg-accent rounded-tribal" />
            <cite className="text-sm font-medium text-foreground not-italic">
              — {currentQuote?.author}
            </cite>
          </div>

          {/* Progress Indicators */}
          <div className="flex items-center space-x-1">
            {motivationalQuotes?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuoteIndex(index)}
                className={`w-2 h-2 rounded-full smooth-transition ${
                  index === currentQuoteIndex 
                    ? 'bg-accent' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to quote ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 opacity-5">
        <Icon name="Sparkles" size={48} className="text-accent" />
      </div>
    </div>
  );
};

export default MotivationalQuote;