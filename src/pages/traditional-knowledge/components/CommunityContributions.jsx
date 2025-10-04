import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommunityContributions = ({ 
  contributions = [],
  onApprove,
  onReject,
  className = '' 
}) => {
  const [selectedContribution, setSelectedContribution] = useState(null);

  const mockContributions = [
    {
      id: 1,
      title: "Banjara Wedding Song",
      titleTelugu: "బంజారా వివాహ గీతం",
      type: "song",
      contributor: {
        name: "Lakshmi Bai",
        age: 65,
        role: "Community Elder",
        avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150"
      },
      description: "Traditional wedding song sung during Banjara marriage ceremonies, passed down through generations.",
      region: "Telangana Banjara Community",
      submittedAt: "2025-10-02",
      status: "pending_review",
      hasAudio: true,
      images: [
        "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400"
      ],
      culturalContext: "This song is traditionally sung by women during the mehendi ceremony, symbolizing blessings for the bride's new journey."
    },
    {
      id: 2,
      title: "Bamboo Basket Weaving",
      titleTelugu: "వెదురు బుట్ట నేయడం",
      type: "craft",
      contributor: {
        name: "Ravi Kumar",
        age: 45,
        role: "Master Craftsman",
        avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150"
      },
      description: "Step-by-step technique for weaving traditional bamboo baskets used for storing grains and carrying goods.",
      region: "Adilabad Tribal Area",
      submittedAt: "2025-10-01",
      status: "approved",
      hasAudio: false,
      images: [
        "https://images.pexels.com/photos/4050290/pexels-photo-4050290.jpeg?auto=compress&cs=tinysrgb&w=400",
        "https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=400"
      ],
      culturalContext: "These baskets are essential for daily life and are often given as gifts during harvest festivals."
    }
  ];

  const activeContributions = contributions?.length > 0 ? contributions : mockContributions;

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-success bg-success/10 border-success/20';
      case 'rejected': return 'text-error bg-error/10 border-error/20';
      case 'pending_review': return 'text-warning bg-warning/10 border-warning/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return 'CheckCircle';
      case 'rejected': return 'XCircle';
      case 'pending_review': return 'Clock';
      default: return 'AlertCircle';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'story': return 'BookOpen';
      case 'song': return 'Music';
      case 'craft': return 'Palette';
      case 'custom': return 'Users';
      default: return 'Heart';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Community Contributions
          </h2>
          <p className="text-sm font-caption text-muted-foreground">
            సమాజ సహకారం
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Users" size={16} />
          <span>{activeContributions?.length} contributions</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeContributions?.map((contribution) => (
          <div
            key={contribution?.id}
            className="bg-card border border-border rounded-tribal shadow-tribal-sm hover:shadow-tribal-md smooth-transition"
          >
            {/* Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 rounded-tribal overflow-hidden">
                    <Image
                      src={contribution?.contributor?.avatar}
                      alt={contribution?.contributor?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">
                      {contribution?.title}
                    </h3>
                    <p className="text-sm font-caption text-muted-foreground">
                      {contribution?.titleTelugu}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        by {contribution?.contributor?.name}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {contribution?.contributor?.role}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Type Badge */}
                  <div className="flex items-center space-x-1 bg-muted rounded-tribal px-2 py-1">
                    <Icon name={getTypeIcon(contribution?.type)} size={12} />
                    <span className="text-xs font-medium capitalize">
                      {contribution?.type}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className={`flex items-center space-x-1 rounded-tribal px-2 py-1 border ${getStatusColor(contribution?.status)}`}>
                    <Icon name={getStatusIcon(contribution?.status)} size={12} />
                    <span className="text-xs font-medium capitalize">
                      {contribution?.status?.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-sm text-foreground leading-relaxed mb-3">
                {contribution?.description}
              </p>

              {/* Cultural Context */}
              {contribution?.culturalContext && (
                <div className="mb-3 p-3 bg-accent/10 border border-accent/20 rounded-tribal-sm">
                  <div className="flex items-start space-x-2">
                    <Icon name="Info" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-foreground leading-relaxed">
                      {contribution?.culturalContext}
                    </p>
                  </div>
                </div>
              )}

              {/* Media Preview */}
              {contribution?.images && contribution?.images?.length > 0 && (
                <div className="mb-3">
                  <div className="grid grid-cols-3 gap-2">
                    {contribution?.images?.slice(0, 3)?.map((image, index) => (
                      <div key={index} className="aspect-square rounded-tribal overflow-hidden">
                        <Image
                          src={image}
                          alt={`${contribution?.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span>{contribution?.region}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>{contribution?.submittedAt}</span>
                  </div>
                </div>
                {contribution?.hasAudio && (
                  <div className="flex items-center space-x-1 text-primary">
                    <Icon name="Volume2" size={12} />
                    <span>Audio included</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedContribution(contribution)}
                  iconName="Eye"
                  iconPosition="left"
                  iconSize={14}
                  className="flex-1"
                >
                  View Details
                </Button>

                {contribution?.status === 'pending_review' && (
                  <>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onApprove(contribution?.id)}
                      iconName="Check"
                      iconPosition="left"
                      iconSize={14}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onReject(contribution?.id)}
                      iconName="X"
                      iconPosition="left"
                      iconSize={14}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Detailed View Modal */}
      {selectedContribution && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-tribal shadow-tribal-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  {selectedContribution?.title}
                </h2>
                <p className="text-sm font-caption text-muted-foreground">
                  {selectedContribution?.titleTelugu}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedContribution(null)}
                className="h-8 w-8"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading font-medium text-foreground mb-2">
                      Description
                    </h3>
                    <p className="text-sm text-foreground leading-relaxed">
                      {selectedContribution?.description}
                    </p>
                  </div>

                  {selectedContribution?.culturalContext && (
                    <div>
                      <h3 className="font-heading font-medium text-foreground mb-2">
                        Cultural Context
                      </h3>
                      <p className="text-sm text-foreground leading-relaxed">
                        {selectedContribution?.culturalContext}
                      </p>
                    </div>
                  )}

                  <div>
                    <h3 className="font-heading font-medium text-foreground mb-2">
                      Contributor Information
                    </h3>
                    <div className="space-y-2">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Name:</span> {selectedContribution?.contributor?.name}
                      </p>
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Age:</span> {selectedContribution?.contributor?.age}
                      </p>
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Role:</span> {selectedContribution?.contributor?.role}
                      </p>
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Region:</span> {selectedContribution?.region}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Media */}
                <div className="space-y-4">
                  {selectedContribution?.images && selectedContribution?.images?.length > 0 && (
                    <div>
                      <h3 className="font-heading font-medium text-foreground mb-2">
                        Images
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedContribution?.images?.map((image, index) => (
                          <div key={index} className="aspect-square rounded-tribal overflow-hidden">
                            <Image
                              src={image}
                              alt={`${selectedContribution?.title} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedContribution?.hasAudio && (
                    <div>
                      <h3 className="font-heading font-medium text-foreground mb-2">
                        Audio Recording
                      </h3>
                      <div className="p-4 bg-muted rounded-tribal border border-border">
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="default"
                            size="icon"
                            className="h-10 w-10"
                          >
                            <Icon name="Play" size={20} />
                          </Button>
                          <div className="flex-1">
                            <div className="h-2 bg-background rounded-full">
                              <div className="h-full bg-primary rounded-full w-1/3" />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>0:45</span>
                              <span>2:30</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityContributions;