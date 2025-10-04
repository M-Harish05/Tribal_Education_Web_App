import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import VoiceNavigationButton from '../../components/ui/VoiceNavigationButton';
import OfflineStatusIndicator from '../../components/ui/OfflineStatusIndicator';
import NotificationAlertBanner from '../../components/ui/NotificationAlertBanner';

// Import page components
import KnowledgeCard from './components/KnowledgeCard';
import AudioPlayer from './components/AudioPlayer';
import ContributionModal from './components/ContributionModal';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import CommunityContributions from './components/CommunityContributions';

const TraditionalKnowledge = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showContributionModal, setShowContributionModal] = useState(false);
  const [contributionType, setContributionType] = useState('');
  const [showCommunityContributions, setShowCommunityContributions] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('english');

  // Mock data for traditional knowledge
  const knowledgeItems = [
    {
      id: 1,
      type: 'story',
      title: 'The Legend of Sammakka Saralamma',
      titleTelugu: 'సమ్మక్క సారలమ్మ కథ',
      description: `The inspiring tale of two tribal women warriors who fought against the Kakatiya dynasty to protect their people and land. This story represents courage, sacrifice, and the eternal bond between mother and daughter in tribal culture.\n\nSammakka and her daughter Saralamma became symbols of resistance and are worshipped as goddesses by tribal communities across Telangana.`,
      culturalContext: 'This legend is central to the Medaram Jatara, one of the largest tribal festivals in India, celebrated every two years.',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
      hasAudio: true,
      audioUrl: '/audio/sammakka-story.mp3',
      transcription: 'సమ్మక్క సారలమ్మల కథ చాలా పురాతनమైनది. వారు తమ ప్రజల కోసం పోरాडిन వీरాంగनలు...',
      contributor: {
        name: 'Bujji Bai',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      dateAdded: '2025-09-15',
      region: 'Warangal District',
      rating: 4.8
    },
    {
      id: 2,
      type: 'song',
      title: 'Harvest Festival Song',
      titleTelugu: 'పంట పండుగ పాట',
      description: `Traditional song sung during the harvest season to thank nature for the bountiful crops. The melody carries the joy and gratitude of tribal communities.\n\nThis song is typically performed by women in groups, accompanied by traditional drums and folk instruments.`,
      culturalContext: 'Sung during Bhogi festival to celebrate the harvest and express gratitude to Mother Earth.',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=600',
      hasAudio: true,
      audioUrl: '/audio/harvest-song.mp3',
      transcription: 'పంట పండిందిరా, పండుగ చేసుకుందాం, ధాन్యం పంडింदిరా...',
      contributor: {
        name: 'Lakshmi Devi',
        avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      dateAdded: '2025-09-20',
      region: 'Adilabad Tribal Area',
      rating: 4.6
    },
    {
      id: 3,
      type: 'craft',
      title: 'Bamboo Basket Weaving Technique',
      titleTelugu: 'వెदురు బుట్ట నేయడం',
      description: `Step-by-step traditional method of weaving bamboo baskets used for storing grains and carrying goods. This ancient craft requires skill and patience passed down through generations.\n\nThe baskets are not only functional but also represent the sustainable lifestyle of tribal communities.`,
      culturalContext: 'These baskets are essential for daily life and are often given as gifts during harvest festivals and weddings.',
      image: 'https://images.pexels.com/photos/4050290/pexels-photo-4050290.jpeg?auto=compress&cs=tinysrgb&w=600',
      hasAudio: false,
      contributor: {
        name: 'Ravi Kumar',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      dateAdded: '2025-09-25',
      region: 'Khammam District',
      rating: 4.7
    },
    {
      id: 4,
      type: 'custom',
      title: 'Marriage Ceremony Rituals',
      titleTelugu: 'वిवాహ వేडుకల ఆచారాలు',
      description: `Traditional tribal marriage customs that strengthen community bonds and celebrate the union of two families. These rituals have deep spiritual significance.\n\nThe ceremonies involve blessing from elders, exchange of traditional gifts, and community participation in songs and dances.`,
      culturalContext: 'Marriage ceremonies are community events that can last for several days, involving the entire village in celebrations.',
      image: 'https://images.pexels.com/photos/1024994/pexels-photo-1024994.jpeg?auto=compress&cs=tinysrgb&w=600',
      hasAudio: true,
      audioUrl: '/audio/marriage-ritual.mp3',
      transcription: 'वిवాహ వేडుకలో మొदట పెद్దల ఆశీర్వాदం తీసుకుంటారు...',
      contributor: {
        name: 'Yellamma',
        avatar: 'https://images.pexels.com/photos/1181684/pexels-photo-1181684.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      dateAdded: '2025-09-30',
      region: 'Mahbubnagar District',
      rating: 4.9
    },
    {
      id: 5,
      type: 'story',
      title: 'The Wise Crow and the Tribal Chief',
      titleTelugu: 'తెలివైन కాకి మरియు గిरిజन నాయకుడు',
      description: `A moral story about wisdom, patience, and learning from nature. The crow teaches the tribal chief important lessons about leadership and community welfare.\n\nThis story emphasizes the tribal belief in learning from all creatures and respecting the wisdom of nature.`,
      culturalContext: 'Often told to children to teach them about leadership qualities and the importance of listening to all voices in the community.',
      image: 'https://images.pexels.com/photos/1024995/pexels-photo-1024995.jpeg?auto=compress&cs=tinysrgb&w=600',
      hasAudio: true,
      audioUrl: '/audio/crow-story.mp3',
      transcription: 'ఒకప్పుడు ఒక గిरిజन గ్రామంలో చాలా తెలిवైन కాకి ఉంडేది...',
      contributor: {
        name: 'Ramesh Goud',
        avatar: 'https://images.pexels.com/photos/1043472/pexels-photo-1043472.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      dateAdded: '2025-10-01',
      region: 'Nizamabad District',
      rating: 4.5
    },
    {
      id: 6,
      type: 'song',
      title: 'Rain Calling Song',
      titleTelugu: 'వर్షం పిలుపు పాట',
      description: `Ancient song performed during drought to invoke rain gods. The rhythmic chanting and traditional dance movements are believed to bring rainfall.\n\nThis song represents the deep connection between tribal communities and natural elements.`,
      culturalContext: 'Performed collectively by the entire village during times of drought, usually led by the village shaman or elder women.',
      image: 'https://images.pexels.com/photos/1181678/pexels-photo-1181678.jpeg?auto=compress&cs=tinysrgb&w=600',
      hasAudio: true,
      audioUrl: '/audio/rain-song.mp3',
      transcription: 'వर్షం రా వर్షం రా, మా పంటలకు నీरు రా...',
      contributor: {
        name: 'Sita Devi',
        avatar: 'https://images.pexels.com/photos/1181687/pexels-photo-1181687.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      dateAdded: '2025-10-02',
      region: 'Karimnagar District',
      rating: 4.4
    }
  ];

  const categories = ['all', 'story', 'song', 'craft', 'custom'];

  // Check for saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Filter knowledge items based on category and search
  const filteredItems = knowledgeItems?.filter(item => {
    const matchesCategory = activeCategory === 'all' || item?.type === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.titleTelugu?.includes(searchQuery) ||
      item?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.region?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handlePlayAudio = (item) => {
    if (currentAudio?.id === item?.id && isPlaying) {
      setIsPlaying(false);
      setCurrentAudio(null);
    } else {
      setCurrentAudio(item);
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    const currentIndex = knowledgeItems?.findIndex(item => item?.id === currentAudio?.id);
    const nextIndex = (currentIndex + 1) % knowledgeItems?.length;
    const nextTrack = knowledgeItems?.[nextIndex];
    if (nextTrack?.hasAudio) {
      setCurrentAudio(nextTrack);
    }
  };

  const handlePreviousTrack = () => {
    const currentIndex = knowledgeItems?.findIndex(item => item?.id === currentAudio?.id);
    const prevIndex = currentIndex === 0 ? knowledgeItems?.length - 1 : currentIndex - 1;
    const prevTrack = knowledgeItems?.[prevIndex];
    if (prevTrack?.hasAudio) {
      setCurrentAudio(prevTrack);
    }
  };

  const handleContribute = (type) => {
    setContributionType(type);
    setShowContributionModal(true);
  };

  const handleSubmitContribution = async (contributionData) => {
    // Mock submission - in real app, this would send to backend
    console.log('Submitting contribution:', contributionData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('Thank you for your contribution! It will be reviewed by our community elders.');
  };

  const handleApproveContribution = (id) => {
    console.log('Approving contribution:', id);
    alert('Contribution approved and added to the knowledge base!');
  };

  const handleRejectContribution = (id) => {
    console.log('Rejecting contribution:', id);
    alert('Contribution has been rejected. Feedback sent to contributor.');
  };

  const handleVoiceSearch = (transcript) => {
    console.log('Voice search:', transcript);
    setSearchQuery(transcript);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Notification Banner */}
        <NotificationAlertBanner onDismiss={() => {}} />

        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-primary/10 to-accent/10 rounded-tribal p-8 overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-tribal text-primary-foreground">
                <Icon name="Heart" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Traditional Knowledge
                </h1>
                <p className="text-lg font-caption text-muted-foreground">
                  సాంప్రదాయ జ్ఞాनం
                </p>
              </div>
            </div>
            
            <p className="text-foreground leading-relaxed max-w-2xl mb-6">
              Preserve and share our rich cultural heritage through stories, songs, crafts, and customs. 
              Learn from community elders and contribute your own knowledge to strengthen our cultural identity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                onClick={() => handleContribute('story')}
                iconName="Plus"
                iconPosition="left"
                iconSize={18}
              >
                Share Your Knowledge
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowCommunityContributions(true)}
                iconName="Users"
                iconPosition="left"
                iconSize={18}
              >
                Community Contributions
              </Button>
            </div>
          </div>

          {/* Cultural Pattern Overlay */}
          <div className="absolute inset-0 tribal-pattern opacity-10" />
        </div>

        {/* Search and Filters */}
        <div className="bg-card border border-border rounded-tribal p-6">
          <div className="space-y-4">
            <SearchBar
              onSearch={setSearchQuery}
              onVoiceSearch={handleVoiceSearch}
              placeholder="Search traditions, stories, songs..."
              placeholderTelugu="సంప్రदాయాలు, కథలు, పాటలు వెతకండి..."
            />
            
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <OfflineStatusIndicator />
            <div className="text-sm text-muted-foreground">
              {filteredItems?.length} items found
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentLanguage(currentLanguage === 'english' ? 'telugu' : 'english')}
              iconName="Languages"
              iconPosition="left"
              iconSize={16}
            >
              {currentLanguage === 'english' ? 'తెలుగు' : 'English'}
            </Button>
          </div>
        </div>

        {/* Knowledge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems?.map((item) => (
            <KnowledgeCard
              key={item?.id}
              item={item}
              onPlay={handlePlayAudio}
              onContribute={handleContribute}
              isPlaying={currentAudio?.id === item?.id && isPlaying}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredItems?.length === 0 && (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-muted rounded-tribal flex items-center justify-center">
                <Icon name="Search" size={32} className="text-muted-foreground" />
              </div>
            </div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
              No knowledge found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or category filter
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Featured Elders Section */}
        <div className="bg-card border border-border rounded-tribal p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground">
                Featured Knowledge Keepers
              </h2>
              <p className="text-sm font-caption text-muted-foreground">
                జ్ఞాन సంरక్షకులు
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Bujji Bai', role: 'Story Teller', contributions: 12, avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150' },
              { name: 'Ravi Kumar', role: 'Master Craftsman', contributions: 8, avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150' },
              { name: 'Lakshmi Devi', role: 'Traditional Singer', contributions: 15, avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150' },
              { name: 'Yellamma', role: 'Cultural Expert', contributions: 10, avatar: 'https://images.pexels.com/photos/1181684/pexels-photo-1181684.jpeg?auto=compress&cs=tinysrgb&w=150' }
            ]?.map((elder, index) => (
              <div key={index} className="bg-muted rounded-tribal p-4 text-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3">
                  <Image
                    src={elder?.avatar}
                    alt={elder?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-heading font-medium text-foreground">
                  {elder?.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {elder?.role}
                </p>
                <div className="flex items-center justify-center space-x-1 text-xs text-primary">
                  <Icon name="Award" size={12} />
                  <span>{elder?.contributions} contributions</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      {/* Audio Player */}
      {currentAudio && (
        <div className="fixed bottom-20 left-4 right-4 z-40">
          <AudioPlayer
            currentTrack={currentAudio}
            onClose={() => {
              setCurrentAudio(null);
              setIsPlaying(false);
            }}
            onNext={handleNextTrack}
            onPrevious={handlePreviousTrack}
          />
        </div>
      )}
      {/* Contribution Modal */}
      <ContributionModal
        isOpen={showContributionModal}
        onClose={() => setShowContributionModal(false)}
        contributionType={contributionType}
        onSubmit={handleSubmitContribution}
      />
      {/* Community Contributions Modal */}
      {showCommunityContributions && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-tribal shadow-tribal-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  Community Contributions
                </h2>
                <p className="text-sm font-caption text-muted-foreground">
                  సమాజ సహకారం
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowCommunityContributions(false)}
                className="h-8 w-8"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            
            <div className="p-6">
              <CommunityContributions
                onApprove={handleApproveContribution}
                onReject={handleRejectContribution}
              />
            </div>
          </div>
        </div>
      )}
      {/* Voice Navigation */}
      <VoiceNavigationButton />
    </div>
  );
};

export default TraditionalKnowledge;