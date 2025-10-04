import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import VoiceNavigationButton from '../../components/ui/VoiceNavigationButton';
import OfflineStatusIndicator from '../../components/ui/OfflineStatusIndicator';
import NotificationAlertBanner from '../../components/ui/NotificationAlertBanner';

// Import components
import SchemeCard from './components/SchemeCard';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import SuccessStoryCard from './components/SuccessStoryCard';
import NotificationPanel from './components/NotificationPanel';
import DocumentGuidance from './components/DocumentGuidance';

const GovernmentSchemesHub = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('schemes');

  // Updated trending government schemes for 2025
  const schemes = [
    {
      id: 1,
      name: "PM-JANMAN Tribal Development Scheme 2025",
      nameTelugu: "PM-JANMAN గిరిజన అభివృద్ధి పథకం 2025",
      category: "Education",
      categoryTelugu: "విద్య",
      description: "Enhanced comprehensive development scheme for tribal communities with increased benefits and digital integration.",
      descriptionTelugu: "మెరుగైన ప్రయోజనాలు మరియు డిజిటల్ ఏకీకరణతో గిరిజన సమాజాల కోసం మెరుగైన సమగ్ర అభివృద్ధి పథకం.",
      benefits: [
        "₹75,000 annual scholarship for higher education (increased from ₹50,000)",
        "Free healthcare coverage up to ₹7.5 lakhs",
        "Digital literacy training programs",
        "Employment guarantee for 300 days",
        "Housing assistance up to ₹3 lakhs",
        "Free tablet/smartphone for students"
      ],
      eligibility: [
        "Must belong to Scheduled Tribe community",
        "Annual family income below ₹3 lakhs (increased from ₹2.5 lakhs)",
        "Age between 16-40 years for various schemes",
        "Valid tribal certificate required",
        "Aadhaar card mandatory"
      ],
      documents: [
        "Tribal Certificate",
        "Income Certificate",
        "Aadhaar Card",
        "Bank Account Details",
        "Educational Certificates",
        "Digital photo (for online applications)"
      ],
      urgency: "high",
      deadline: "Mar 31, 2025",
      applicationStatus: null,
      isSaved: false,
      isNew: true
    },
    {
      id: 2,
      name: "Ayushman Bharat Tribal Health Scheme 2025",
      nameTelugu: "ఆయుష్మాన్ భారత్ గిరిజన ఆరోగ్య పథకం 2025",
      category: "Healthcare",
      categoryTelugu: "ఆరోగ్యం",
      description: "Enhanced health insurance coverage for tribal families with telemedicine and mobile health services.",
      descriptionTelugu: "టెలిమెడిసిన్ మరియు మొబైల్ ఆరోగ్య సేవలతో గిరిజన కుటుంబాలకు మెరుగైన ఆరోగ్య బీమా కవరేజ్.",
      benefits: [
        "₹7.5 lakh annual health coverage (increased from ₹5 lakh)",
        "Free health checkups monthly",
        "Medicine subsidy up to 90%",
        "Emergency ambulance service 24/7",
        "Telemedicine consultations",
        "Mobile health units in remote areas",
        "Mental health counseling services"
      ],
      eligibility: [
        "Tribal community membership",
        "Family income below ₹4 lakhs annually (increased from ₹3 lakhs)",
        "Valid health card required",
        "Aadhaar card mandatory"
      ],
      documents: [
        "Tribal Certificate",
        "Income Certificate",
        "Aadhaar Card",
        "Family Photo",
        "Medical History",
        "Bank Account Details"
      ],
      urgency: "high",
      deadline: "Feb 28, 2025",
      applicationStatus: "applied",
      isSaved: true,
      isNew: true
    },
    {
      id: 3,
      name: "Digital India Tribal Empowerment Scheme 2025",
      nameTelugu: "డిజిటల్ ఇండియా గిరిజన సాధికారత పథకం 2025",
      category: "Employment",
      categoryTelugu: "ఉపాధి",
      description: "Comprehensive digital literacy and employment program for tribal communities with focus on technology skills.",
      descriptionTelugu: "టెక్నాలజీ నైపుణ్యాలపై దృష్టి సారించి గిరిజన సమాజాల కోసం సమగ్ర డిజిటల్ అక్షరాస్యత మరియు ఉపాధి కార్యక్రమం.",
      benefits: [
        "Free digital literacy training for 8 months",
        "₹7,000 monthly stipend during training",
        "Free laptop/tablet for participants",
        "Job placement guarantee in IT sector",
        "Startup incubation support",
        "Business loan up to ₹5 lakhs",
        "Digital marketing training",
        "E-commerce platform development"
      ],
      eligibility: [
        "Age between 16-50 years",
        "Tribal community certificate",
        "Minimum 10th standard education",
        "Basic computer knowledge preferred",
        "Aadhaar card mandatory"
      ],
      documents: [
        "Age Proof",
        "Educational Certificate",
        "Tribal Certificate",
        "Aadhaar Card",
        "Bank Account Details",
        "Digital photo"
      ],
      urgency: "high",
      deadline: "Apr 30, 2025",
      applicationStatus: null,
      isSaved: false,
      isNew: true
    },
    {
      id: 4,
      name: "Tribal Excellence Scholarship 2025",
      nameTelugu: "గిరిజన శ్రేష్ఠత స్కాలర్‌షిప్ 2025",
      category: "Education",
      categoryTelugu: "విద్య",
      description: "Merit-based scholarship program for outstanding tribal students pursuing higher education in premier institutions.",
      descriptionTelugu: "ప్రముఖ సంస్థలలో ఉన్నత విద్యను అనుసరించే అత్యుత్తమ గిరిజన విద్యార్థుల కోసం గుణాత్మక స్కాలర్‌షిప్ కార్యక్రమం.",
      benefits: [
        "₹1,00,000 annual scholarship",
        "Full tuition fee waiver",
        "Hostel accommodation support",
        "Laptop and study materials",
        "Mentorship program",
        "Internship opportunities",
        "Placement assistance",
        "Research funding support"
      ],
      eligibility: [
        "Must belong to Scheduled Tribe community",
        "Minimum 90% marks in 12th standard",
        "Admission in top 100 institutions",
        "Annual family income below ₹5 lakhs",
        "Valid tribal certificate required"
      ],
      documents: [
        "Tribal Certificate",
        "Income Certificate",
        "Educational Certificates",
        "Admission proof",
        "Bank Account Details",
        "Passport size photos"
      ],
      urgency: "high",
      deadline: "May 31, 2025",
      applicationStatus: null,
      isSaved: false,
      isNew: true
    },
    {
      id: 5,
      name: "Tribal Housing Development Scheme 2025",
      nameTelugu: "గిరిజన గృహనిర్మాణ అభివృద్ధి పథకం 2025",
      category: "Housing",
      categoryTelugu: "గృహనిర్మాణం",
      description: "Enhanced housing assistance program with smart home features and sustainable construction methods.",
      descriptionTelugu: "స్మార్ట్ హోమ్ లక్షణాలు మరియు స్థిరమైన నిర్మాణ పద్ధతులతో మెరుగైన గృహనిర్మాణ సహాయ కార్యక్రమం.",
      benefits: [
        "₹3.5 lakh construction grant (increased from ₹2.5 lakh)",
        "Technical assistance for construction",
        "Quality material supply",
        "Toilet construction subsidy",
        "Solar panel installation support",
        "Smart home features",
        "Rainwater harvesting system",
        "Waste management system"
      ],
      eligibility: [
        "Tribal family without pucca house",
        "Land ownership or lease rights",
        "Annual income below ₹3 lakhs (increased from ₹2 lakhs)",
        "Not benefited from other housing schemes",
        "Aadhaar card mandatory"
      ],
      documents: [
        "Land Documents",
        "Tribal Certificate",
        "Income Certificate",
        "House Photos (current)",
        "Bank Account Details",
        "Aadhaar Card"
      ],
      urgency: "medium",
      deadline: "Jun 30, 2025",
      applicationStatus: null,
      isSaved: true
    }
  ];

  // Mock success stories
  const successStories = [
    {
      id: 1,
      name: "Lakshmi Devi",
      nameTelugu: "లక్ష్మీ దేవి",
      location: "Araku Valley, Visakhapatnam",
      photo: "https://images.unsplash.com/photo-1494790108755-2616c9c1e8b3?w=400&h=400&fit=crop&crop=face",
      scheme: "PM-JANMAN Education",
      summary: "From a small tribal village, Lakshmi completed her engineering degree through the PM-JANMAN scholarship and now works as a software engineer, supporting 15 families in her community.",
      summaryTelugu: "చిన్న గిరిజన గ్రామం నుండి, లక్ష్మీ PM-JANMAN స్కాలర్‌షిప్ ద్వారా ఇంజనీరింగ్ డిగ్రీ పూర్తి చేసి ఇప్పుడు సాఫ్ట్‌వేర్ ఇంజనీర్‌గా పని చేస్తూ తన కమ్యూనిటీలోని 15 కుటుంబాలకు మద్దతు ఇస్తోంది.",
      impact: {
        income: "₹85,000",
        beneficiaries: "15"
      },
      achievements: [
        "First engineer from her village",
        "Established computer training center",
        "Mentoring 25+ tribal students"
      ],
      quote: "Education transformed not just my life, but my entire community's future.",
      quoteTelugu: "విద్య నా జీవితాన్ని మాత్రమే కాకుండా, నా మొత్తం సమాజం యొక్క భవిష్యత్తును మార్చింది."
    },
    {
      id: 2,
      name: "Ravi Kumar",
      nameTelugu: "రవి కుమార్",
      location: "Paderu, East Godavari",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      scheme: "Tribal Employment Program",
      summary: "Ravi started a successful organic farming business after completing skill training, now supplies organic produce to 50+ restaurants and employs 20 tribal youth.",
      summaryTelugu: "రవి నైపుణ్య శిక్షణ పూర్తి చేసిన తర్వాత విజయవంతమైన సేంద్రీయ వ్యవసాయ వ్యాపారాన్ని ప్రారంభించాడు, ఇప్పుడు 50+ రెస్టారెంట్లకు సేంద్రీయ ఉత్పాదనలను సరఫరా చేస్తూ 20 గిరిజన యువతకు ఉపాధి కల్పిస్తున్నాడు.",
      impact: {
        income: "₹1,20,000",
        beneficiaries: "20"
      },
      achievements: [
        "Organic farming certification",
        "Best entrepreneur award 2024",
        "Created 20 direct jobs"
      ],
      quote: "The training program gave me skills, but determination gave me success.",
      quoteTelugu: "శిక్షణా కార్యక్రమం నాకు నైపుణ్యాలను ఇచ్చింది, కానీ దృఢ సంకల్పం నాకు విజయాన్ని ఇచ్చింది."
    }
  ];

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      type: 'new_scheme',
      title: 'New Tribal Healthcare Scheme Launched',
      titleTelugu: 'కొత్త గిరిజన ఆరోగ్య పథకం ప్రారంభించబడింది',
      message: 'The government has launched a new comprehensive healthcare scheme for tribal communities with enhanced benefits and coverage.',
      messageTelugu: 'ప్రభుత్వం మెరుగైన ప్రయోజనాలు మరియు కవరేజీతో గిరిజన సమాజాల కోసం కొత్త సమగ్ర ఆరోగ్య పథకాన్ని ప్రారంభించింది.',
      priority: 'high',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false,
      actionText: 'View Scheme',
      actionUrl: '#'
    },
    {
      id: 2,
      type: 'deadline',
      title: 'Application Deadline Reminder',
      titleTelugu: 'దరఖాస్తు గడువు రిమైండర్',
      message: 'Only 5 days left to apply for PM-JANMAN Tribal Development Scheme. Complete your application before the deadline.',
      messageTelugu: 'PM-JANMAN గిరిజన అభివృద్ధి పథకానికి దరఖాస్తు చేసుకోవడానికి కేవలం 5 రోజులు మాత్రమే మిగిలి ఉన్నాయి. గడువుకు ముందు మీ దరఖాస్తును పూర్తి చేయండి.',
      priority: 'high',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: false,
      actionText: 'Apply Now',
      actionUrl: '#'
    },
    {
      id: 3,
      type: 'approval',
      title: 'Application Approved',
      titleTelugu: 'దరఖాస్తు ఆమోదించబడింది',
      message: 'Congratulations! Your application for Tribal Healthcare Insurance has been approved. You will receive your insurance card within 7 days.',
      messageTelugu: 'అభినందనలు! గిరిజన ఆరోగ్య బీమా కోసం మీ దరఖాస్తు ఆమోదించబడింది. మీరు 7 రోజులలో మీ బీమా కార్డును అందుకుంటారు.',
      priority: 'medium',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: true,
      actionText: 'Download Certificate',
      actionUrl: '#'
    }
  ];

  // Mock document guidance data
  const documentGuidance = [
    {
      id: 1,
      name: "Tribal Certificate",
      nameTelugu: "గిరిజన సర్టిఫికేట్",
      type: "identity",
      status: "required",
      description: "Official certificate proving tribal community membership issued by competent authority.",
      descriptionTelugu: "సమర్థ అధికారిచే జారీ చేయబడిన గిరిజన సమాజ సభ్యత్వాన్ని రుజువు చేసే అధికారిక సర్టిఫికేట్.",
      requirements: [
        "Original birth certificate",
        "Parents' tribal certificates",
        "Community verification letter",
        "Residence proof"
      ],
      sources: [
        { name: "Tehsildar Office", address: "District Collectorate" },
        { name: "Tribal Welfare Office", address: "Block Level" }
      ],
      processingTime: "15-30 days",
      processingTimeTelugu: "15-30 రోజులు",
      sampleUrl: "#"
    },
    {
      id: 2,
      name: "Income Certificate",
      nameTelugu: "ఆదాయ సర్టిఫికేట్",
      type: "income",
      status: "required",
      description: "Certificate showing annual family income from all sources for eligibility verification.",
      descriptionTelugu: "అర్హత ధృవీకరణ కోసం అన్ని మూలాల నుండి వార్షిక కుటుంబ ఆదాయాన్ని చూపించే సర్టిఫికేట్.",
      requirements: [
        "Salary certificates",
        "Agricultural income proof",
        "Business income details",
        "Bank statements"
      ],
      sources: [
        { name: "Village Revenue Officer", address: "Village Level" },
        { name: "Tehsildar Office", address: "Mandal Level" }
      ],
      processingTime: "7-15 days",
      processingTimeTelugu: "7-15 రోజులు",
      sampleUrl: "#"
    }
  ];

  const categories = ['All', 'Education', 'Healthcare', 'Employment', 'Housing', 'Digital'];

  // Calculate scheme counts by category
  const schemeCounts = categories?.reduce((acc, category) => {
    if (category === 'All') {
      acc[category] = schemes?.length;
    } else {
      acc[category] = schemes?.filter(scheme => scheme?.category === category)?.length;
    }
    return acc;
  }, {});

  // Filter schemes based on category and search
  useEffect(() => {
    let filtered = schemes;

    if (selectedCategory !== 'All') {
      filtered = filtered?.filter(scheme => scheme?.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered?.filter(scheme =>
        scheme?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        scheme?.nameTelugu?.includes(searchQuery) ||
        scheme?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        scheme?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    setFilteredSchemes(filtered);
  }, [selectedCategory, searchQuery]);

  // Initialize notifications
  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  const handleApplyScheme = (scheme) => {
    // In a real app, this would redirect to the application portal
    window.open(`https://pmjanman.gov.in/apply/${scheme?.id}`, '_blank');
  };

  const handleSaveScheme = (schemeId, isSaved) => {
    // Update saved status in local storage or backend
    console.log(`Scheme ${schemeId} ${isSaved ? 'saved' : 'unsaved'}`);
  };

  const handleViewSchemeDetails = (scheme) => {
    // Navigate to detailed scheme view
    console.log('View details for scheme:', scheme?.name);
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev =>
      prev?.map(notification =>
        notification?.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleDismissNotification = (notificationId) => {
    setNotifications(prev =>
      prev?.filter(notification => notification?.id !== notificationId)
    );
  };

  const handleDownloadSample = (url) => {
    // In a real app, this would download the sample document
    console.log('Downloading sample from:', url);
  };

  const handleViewChecklist = (docId) => {
    // Show detailed checklist for document
    console.log('View checklist for document:', docId);
  };

  const tabs = [
    { id: 'schemes', label: 'Schemes', labelTelugu: 'పథకాలు', icon: 'FileText' },
    { id: 'notifications', label: 'Notifications', labelTelugu: 'నోటిఫికేషన్లు', icon: 'Bell' },
    { id: 'documents', label: 'Documents', labelTelugu: 'పత్రాలు', icon: 'Folder' },
    { id: 'success', label: 'Success Stories', labelTelugu: 'విజయ కథలు', icon: 'Award' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-3">
            Government Schemes Hub
          </h1>
          <p className="text-lg font-caption text-muted-foreground mb-2">
            ప్రభుత్వ పథకాల కేంద్రం
          </p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Discover scholarships, benefits, and government programs designed for tribal communities
          </p>
        </div>

        {/* Alert Banner */}
        <NotificationAlertBanner
          notifications={notifications?.filter(n => !n?.isRead && n?.priority === 'high')?.slice(0, 1)}
          onDismiss={handleDismissNotification}
        />

        {/* Status Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-card border border-border rounded-tribal">
          <div className="flex items-center space-x-4">
            <OfflineStatusIndicator />
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Government Verified</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={16} />
              <span>2.5L+ Beneficiaries</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Award" size={16} />
              <span>₹500Cr+ Disbursed</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-card border border-border rounded-tribal p-1">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
            {tabs?.map((tab) => (
              <Button
                key={tab?.id}
                variant={activeTab === tab?.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab?.id)}
                className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 p-3 h-auto"
                iconName={tab?.icon}
                iconPosition="left"
              >
                <span className="hidden sm:inline">{tab?.label}</span>
                <span className="sm:hidden font-caption">{tab?.labelTelugu}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'schemes' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SearchBar
                  onSearch={setSearchQuery}
                  placeholder="Search schemes by name, category, or benefits..."
                />
              </div>
              <div>
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  schemeCounts={schemeCounts}
                />
              </div>
            </div>

            {/* Schemes Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSchemes?.map((scheme) => (
                <SchemeCard
                  key={scheme?.id}
                  scheme={scheme}
                  onApply={handleApplyScheme}
                  onSave={handleSaveScheme}
                  onViewDetails={handleViewSchemeDetails}
                />
              ))}
            </div>

            {filteredSchemes?.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  No schemes found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'notifications' && (
          <NotificationPanel
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onDismiss={handleDismissNotification}
          />
        )}

        {activeTab === 'documents' && (
          <DocumentGuidance
            documents={documentGuidance}
            onDownloadSample={handleDownloadSample}
            onViewChecklist={handleViewChecklist}
          />
        )}

        {activeTab === 'success' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                Success Stories
              </h2>
              <p className="text-muted-foreground">
                Real stories from tribal community members who transformed their lives
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {successStories?.map((story) => (
                <SuccessStoryCard key={story?.id} story={story} />
              ))}
            </div>
          </div>
        )}
      </main>
      <VoiceNavigationButton />
    </div>
  );
};

export default GovernmentSchemesHub;