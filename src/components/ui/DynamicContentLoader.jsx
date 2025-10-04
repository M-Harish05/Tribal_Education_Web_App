import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import MediaPlayer from './MediaPlayer';
import Button from './Button';
import Icon from '../AppIcon';

const DynamicContentLoader = ({ 
  contentId, 
  contentType = 'lesson', // 'lesson', 'story', 'game'
  onLoad,
  onError,
  className = ''
}) => {
  const { getText } = useLanguage();
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mediaType, setMediaType] = useState('audio'); // 'audio', 'video', 'youtube', 'interactive'

  // Mock content data - in real app, this would come from API
  const contentData = {
    'lesson-1': {
      title: 'Telugu Alphabet - అ',
      titleTelugu: 'తెలుగు అక్షరం - అ',
      description: 'Learn the first letter of Telugu alphabet with proper pronunciation',
      descriptionTelugu: 'సరైన ఉచ్చారణతో తెలుగు వర్ణమాల యొక్క మొదటి అక్షరాన్ని నేర్చుకోండి',
      mediaType: 'audio',
      mediaUrl: '/audio/lessons/telugu-a.mp3',
      youtubeUrl: 'https://www.youtube.com/watch?v=example1',
      interactiveContent: {
        type: 'letter-practice',
        data: {
          letter: 'అ',
          sound: '/audio/letters/a.mp3',
          words: ['అమ్మ', 'అన్న', 'అక్క'],
          practice: 'Click and listen to the letter sound'
        }
      }
    },
    'story-1': {
      title: 'The Wise Old Tree',
      titleTelugu: 'ముదురు చెట్టు',
      description: 'A story about nature and conservation',
      descriptionTelugu: 'ప్రకృతి మరియు సంరక్షణ గురించి కథ',
      mediaType: 'video',
      mediaUrl: '/video/stories/wise-tree.mp4',
      youtubeUrl: 'https://www.youtube.com/watch?v=example2',
      interactiveContent: {
        type: 'story-quiz',
        data: {
          questions: [
            {
              question: 'Why was the tree sad?',
              questionTelugu: 'చెట్టు ఎందుకు విచారంగా ఉంది?',
              options: ['Because it was old', 'Because people were cutting trees', 'Because it had no fruits'],
              correctAnswer: 1
            }
          ]
        }
      }
    },
    'game-1': {
      title: 'Alphabet Matching Game',
      titleTelugu: 'అక్షరాల మ్యాచింగ్ ఆట',
      description: 'Match Telugu letters with their sounds',
      descriptionTelugu: 'తెలుగు అక్షరాలను వాటి ధ్వనులతో జతపరచండి',
      mediaType: 'interactive',
      mediaUrl: null,
      youtubeUrl: null,
      interactiveContent: {
        type: 'matching-game',
        data: {
          pairs: [
            { telugu: 'అ', english: 'A', sound: '/audio/letters/a.mp3' },
            { telugu: 'ఆ', english: 'AA', sound: '/audio/letters/aa.mp3' }
          ]
        }
      }
    }
  };

  useEffect(() => {
    loadContent();
  }, [contentId]);

  const loadContent = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const contentItem = contentData[contentId];
      if (!contentItem) {
        throw new Error('Content not found');
      }

      setContent(contentItem);
      setMediaType(contentItem.mediaType);
      
      if (onLoad) {
        onLoad(contentItem);
      }
    } catch (err) {
      setError(err.message);
      if (onError) {
        onError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderInteractiveContent = () => {
    if (!content?.interactiveContent) return null;

    const { type, data } = content.interactiveContent;

    switch (type) {
      case 'letter-practice':
        return (
          <div className="bg-primary/10 border border-primary/20 rounded-tribal p-6">
            <h3 className="text-lg font-heading font-semibold text-primary mb-4">
              {getText('Practice', 'అభ్యాసం')}
            </h3>
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-primary mb-4">
                {data.letter}
              </div>
              <Button
                variant="default"
                onClick={() => {
                  const audio = new Audio(data.sound);
                  audio.play();
                }}
                iconName="Volume2"
                iconPosition="left"
              >
                {getText('Listen to Sound', 'ధ్వనిని వినండి')}
              </Button>
              <div className="text-sm text-muted-foreground">
                {getText(data.practice, data.practice)}
              </div>
            </div>
          </div>
        );

      case 'story-quiz':
        return (
          <div className="bg-secondary/10 border border-secondary/20 rounded-tribal p-6">
            <h3 className="text-lg font-heading font-semibold text-secondary mb-4">
              {getText('Quiz', 'క్విజ్')}
            </h3>
            <div className="space-y-4">
              {data.questions.map((question, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="font-medium text-foreground">
                    {getText(question.question, question.questionTelugu)}
                  </h4>
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <Button
                        key={optionIndex}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => {
                          // Handle answer selection
                          console.log('Selected:', optionIndex);
                        }}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'matching-game':
        return (
          <div className="bg-accent/10 border border-accent/20 rounded-tribal p-6">
            <h3 className="text-lg font-heading font-semibold text-accent mb-4">
              {getText('Matching Game', 'మ్యాచింగ్ ఆట')}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {data.pairs.map((pair, index) => (
                <div key={index} className="bg-card border border-border rounded-tribal p-4 text-center">
                  <div className="text-2xl font-bold text-foreground mb-2">
                    {pair.telugu}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {pair.english}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const audio = new Audio(pair.sound);
                      audio.play();
                    }}
                    iconName="Volume2"
                  >
                    {getText('Listen', 'వినండి')}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className={`bg-card border border-border rounded-tribal p-8 ${className}`}>
        <div className="flex items-center justify-center space-x-3">
          <Icon name="Loader2" size={24} className="animate-spin text-primary" />
          <span className="text-foreground font-medium">
            {getText('Loading content...', 'కంటెంట్ లోడ్ అవుతోంది...')}
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-error/10 border border-error/20 rounded-tribal p-6 ${className}`}>
        <div className="flex items-center space-x-2 text-error mb-2">
          <Icon name="AlertCircle" size={20} />
          <span className="font-medium">{getText('Error Loading Content', 'కంటెంట్ లోడ్ చేయడంలో లోపం')}</span>
        </div>
        <p className="text-sm text-error/80 mb-4">{error}</p>
        <Button
          variant="outline"
          onClick={loadContent}
          iconName="RefreshCw"
          iconPosition="left"
        >
          {getText('Try Again', 'మళ్లీ ప్రయత్నించండి')}
        </Button>
      </div>
    );
  }

  if (!content) {
    return (
      <div className={`bg-muted/30 border border-border rounded-tribal p-6 ${className}`}>
        <div className="text-center text-muted-foreground">
          <Icon name="FileX" size={48} className="mx-auto mb-4" />
          <p>{getText('No content available', 'కంటెంట్ అందుబాటులో లేదు')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Content Header */}
      <div className="bg-card border border-border rounded-tribal p-6">
        <h2 className="text-xl font-heading font-bold text-foreground mb-2">
          {getText(content.title, content.titleTelugu)}
        </h2>
        <p className="text-muted-foreground mb-4">
          {getText(content.description, content.descriptionTelugu)}
        </p>
      </div>

      {/* Media Player */}
      {content.mediaUrl && (
        <MediaPlayer
          src={content.mediaUrl}
          type={mediaType}
          title={content.title}
          titleTelugu={content.titleTelugu}
          description={content.description}
          descriptionTelugu={content.descriptionTelugu}
          poster={content.poster}
        />
      )}

      {/* YouTube Integration */}
      {content.youtubeUrl && (
        <div className="bg-card border border-border rounded-tribal p-6">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            {getText('Related Video', 'సంబంధిత వీడియో')}
          </h3>
          <div className="aspect-video bg-muted/30 rounded-tribal flex items-center justify-center">
            <div className="text-center">
              <Icon name="Youtube" size={48} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-4">
                {getText('YouTube video integration coming soon', 'YouTube వీడియో ఏకీకరణ త్వరలో వస్తుంది')}
              </p>
              <Button
                variant="outline"
                onClick={() => window.open(content.youtubeUrl, '_blank')}
                iconName="ExternalLink"
                iconPosition="left"
              >
                {getText('Open in YouTube', 'YouTube లో తెరవండి')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Content */}
      {renderInteractiveContent()}
    </div>
  );
};

export default DynamicContentLoader;
