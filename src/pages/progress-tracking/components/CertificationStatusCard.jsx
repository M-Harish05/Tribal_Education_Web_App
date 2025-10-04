import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CertificationStatusCard = ({ certifications = [] }) => {
  const defaultCertifications = [
    {
      id: 1,
      title: "Basic Literacy Certificate",
      titleTelugu: "ప్రాథమిక అక్షరాస్యత సర్టిఫికేట్",
      issuer: "Government of Telangana",
      issuerTelugu: "తెలంగాణ ప్రభుత్వం",
      status: "earned",
      earnedDate: "2024-09-20",
      validUntil: "2027-09-20",
      credentialId: "TG-BL-2024-001234",
      downloadUrl: "#",
      verificationUrl: "#",
      skills: ["Reading", "Writing", "Basic Math"],
      skillsTelugu: ["చదవడం", "రాయడం", "ప్రాథమిక గణితం"]
    },
    {
      id: 2,
      title: "Traditional Handicrafts Certificate",
      titleTelugu: "సాంప్రదాయ హస్తకళల సర్టిఫికేట్",
      issuer: "Tribal Welfare Department",
      issuerTelugu: "గిరిజన సంక్షేమ శాఖ",
      status: "in_progress",
      progress: 75,
      expectedDate: "2024-11-15",
      requirements: ["Complete 8/10 modules", "Submit final project", "Pass practical exam"],
      requirementsTelugu: ["8/10 మాడ్యూల్స్ పూర్తి చేయండి", "చివరి ప్రాజెక్ట్ సమర్పించండి", "ప్రాక్టికల్ పరీక్షలో ఉత్తీర్ణత పొందండి"]
    },
    {
      id: 3,
      title: "Digital Literacy Certificate",
      titleTelugu: "డిజిటల్ అక్షరాస్యత సర్టిఫికేట్",
      issuer: "Ministry of Electronics & IT",
      issuerTelugu: "ఎలక్ట్రానిక్స్ మరియు ఐటి మంత్రిత్వ శాఖ",
      status: "available",
      eligibilityMet: true,
      startDate: "2024-10-15",
      duration: "3 months",
      prerequisites: ["Complete Basic Literacy"],
      prerequisitesTelugu: ["ప్రాథమిక అక్షరాస్యత పూర్తి చేయండి"]
    }
  ];

  const activeCertifications = certifications?.length > 0 ? certifications : defaultCertifications;

  const getStatusConfig = (status) => {
    switch (status) {
      case 'earned':
        return {
          icon: 'CheckCircle',
          color: 'text-success',
          bg: 'bg-success/10',
          border: 'border-success/20',
          label: 'Earned',
          labelTelugu: 'పొందారు'
        };
      case 'in_progress':
        return {
          icon: 'Clock',
          color: 'text-warning',
          bg: 'bg-warning/10',
          border: 'border-warning/20',
          label: 'In Progress',
          labelTelugu: 'ప్రగతిలో'
        };
      case 'available':
        return {
          icon: 'Play',
          color: 'text-primary',
          bg: 'bg-primary/10',
          border: 'border-primary/20',
          label: 'Available',
          labelTelugu: 'అందుబాటులో'
        };
      default:
        return {
          icon: 'Lock',
          color: 'text-muted-foreground',
          bg: 'bg-muted',
          border: 'border-border',
          label: 'Locked',
          labelTelugu: 'లాక్ చేయబడింది'
        };
    }
  };

  return (
    <div className="bg-card border border-border rounded-tribal p-6 shadow-tribal-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Certifications
          </h2>
          <p className="text-sm font-caption text-muted-foreground">
            సర్టిఫికేషన్లు
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Award" size={20} className="text-primary" />
          <span className="text-sm font-mono font-medium text-foreground">
            {activeCertifications?.filter(c => c?.status === 'earned')?.length} Earned
          </span>
        </div>
      </div>
      {/* Certification Cards */}
      <div className="space-y-4">
        {activeCertifications?.map((cert) => {
          const statusConfig = getStatusConfig(cert?.status);
          
          return (
            <div
              key={cert?.id}
              className={`border rounded-tribal p-4 ${statusConfig?.border} ${statusConfig?.bg} smooth-transition hover:shadow-tribal-sm`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name={statusConfig?.icon} size={20} className={statusConfig?.color} />
                    <div>
                      <h3 className="text-base font-heading font-semibold text-foreground">
                        {cert?.title}
                      </h3>
                      <p className="text-sm font-caption text-muted-foreground">
                        {cert?.titleTelugu}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-foreground">
                      {cert?.issuer}
                    </span>
                    <span className="text-sm font-caption text-muted-foreground">
                      • {cert?.issuerTelugu}
                    </span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-tribal text-xs font-medium ${statusConfig?.bg} ${statusConfig?.color}`}>
                  <span className="hidden sm:inline">{statusConfig?.label}</span>
                  <span className="sm:hidden">{statusConfig?.labelTelugu}</span>
                </div>
              </div>
              {/* Status-specific Content */}
              {cert?.status === 'earned' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Earned Date</div>
                      <div className="text-sm font-medium text-foreground">
                        {new Date(cert.earnedDate)?.toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Valid Until</div>
                      <div className="text-sm font-medium text-foreground">
                        {new Date(cert.validUntil)?.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Credential ID</div>
                    <div className="text-sm font-mono text-foreground">
                      {cert?.credentialId}
                    </div>
                  </div>

                  {cert?.skills && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-2">Skills Certified</div>
                      <div className="flex flex-wrap gap-2">
                        {cert?.skills?.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-background rounded-tribal text-xs font-medium text-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="default" size="sm" className="flex-1">
                      <Icon name="Download" size={16} className="mr-2" />
                      Download Certificate
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Icon name="ExternalLink" size={16} className="mr-2" />
                      Verify Online
                    </Button>
                  </div>
                </div>
              )}
              {cert?.status === 'in_progress' && (
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Progress</span>
                      <span className="text-sm font-mono text-foreground">{cert?.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-tribal h-2">
                      <div 
                        className="h-2 bg-warning rounded-tribal smooth-transition"
                        style={{ width: `${cert?.progress}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Expected Completion</div>
                    <div className="text-sm font-medium text-foreground">
                      {new Date(cert.expectedDate)?.toLocaleDateString()}
                    </div>
                  </div>

                  {cert?.requirements && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-2">Remaining Requirements</div>
                      <ul className="space-y-1">
                        {cert?.requirements?.map((req, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Icon name="Circle" size={12} className="text-muted-foreground mt-0.5" />
                            <span className="text-xs text-foreground">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              {cert?.status === 'available' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Start Date</div>
                      <div className="text-sm font-medium text-foreground">
                        {new Date(cert.startDate)?.toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Duration</div>
                      <div className="text-sm font-medium text-foreground">
                        {cert?.duration}
                      </div>
                    </div>
                  </div>

                  {cert?.prerequisites && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-2">Prerequisites</div>
                      <ul className="space-y-1">
                        {cert?.prerequisites?.map((prereq, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Icon name="CheckCircle" size={12} className="text-success mt-0.5" />
                            <span className="text-xs text-foreground">{prereq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button variant="default" size="sm" className="w-full">
                    <Icon name="Play" size={16} className="mr-2" />
                    Start Certification Program
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CertificationStatusCard;