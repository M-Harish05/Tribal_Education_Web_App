import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentGuidance = ({ documents, onDownloadSample, onViewChecklist }) => {
  const [expandedDoc, setExpandedDoc] = useState(null);

  const getDocumentIcon = (type) => {
    switch (type) {
      case 'identity': return 'CreditCard';
      case 'income': return 'Receipt';
      case 'caste': return 'FileText';
      case 'residence': return 'Home';
      case 'education': return 'GraduationCap';
      case 'bank': return 'Building';
      default: return 'FileText';
    }
  };

  const getDocumentColor = (status) => {
    switch (status) {
      case 'required': return 'text-error bg-error/10 border-error/20';
      case 'optional': return 'text-warning bg-warning/10 border-warning/20';
      case 'recommended': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-tribal shadow-tribal-sm">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Document Preparation Guide
          </h3>
          <span className="text-sm font-caption text-muted-foreground">
            పత్రాల తయారీ గైడ్
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Prepare these documents before applying to schemes
        </p>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {documents?.map((doc) => (
            <div
              key={doc?.id}
              className="border border-border rounded-tribal overflow-hidden"
            >
              {/* Document Header */}
              <div className="p-4 bg-muted/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-tribal border ${getDocumentColor(doc?.status)}`}>
                      <Icon name={getDocumentIcon(doc?.type)} size={20} />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-sm font-heading font-semibold text-foreground">
                        {doc?.name}
                      </h4>
                      <p className="text-sm font-caption text-muted-foreground">
                        {doc?.nameTelugu}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-tribal-sm border ${getDocumentColor(doc?.status)}`}>
                      {doc?.status}
                    </span>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setExpandedDoc(expandedDoc === doc?.id ? null : doc?.id)}
                      className="h-8 w-8"
                    >
                      <Icon 
                        name={expandedDoc === doc?.id ? "ChevronUp" : "ChevronDown"} 
                        size={16} 
                      />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedDoc === doc?.id && (
                <div className="p-4 border-t border-border">
                  {/* Description */}
                  <div className="mb-4">
                    <p className="text-sm text-foreground leading-relaxed mb-2">
                      {doc?.description}
                    </p>
                    <p className="text-sm font-caption text-muted-foreground leading-relaxed">
                      {doc?.descriptionTelugu}
                    </p>
                  </div>

                  {/* Requirements */}
                  <div className="mb-4">
                    <h5 className="text-sm font-heading font-semibold text-foreground mb-2">
                      Requirements
                    </h5>
                    <ul className="space-y-2">
                      {doc?.requirements?.map((req, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="CheckCircle" size={14} className="text-success flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Where to Get */}
                  <div className="mb-4">
                    <h5 className="text-sm font-heading font-semibold text-foreground mb-2">
                      Where to Obtain
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {doc?.sources?.map((source, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-muted/30 rounded-tribal-sm">
                          <Icon name="MapPin" size={14} className="text-primary flex-shrink-0" />
                          <div>
                            <span className="text-sm font-medium text-foreground">{source?.name}</span>
                            <p className="text-xs text-muted-foreground">{source?.address}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Processing Time */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-tribal-sm">
                      <Icon name="Clock" size={16} className="text-warning" />
                      <div>
                        <span className="text-sm font-medium text-foreground">
                          Processing Time: {doc?.processingTime}
                        </span>
                        <p className="text-xs font-caption text-muted-foreground">
                          ప్రాసెసింగ్ సమయం: {doc?.processingTimeTelugu}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    {doc?.sampleUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDownloadSample(doc?.sampleUrl)}
                        className="flex-1"
                        iconName="Download"
                        iconPosition="left"
                      >
                        Download Sample
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewChecklist(doc?.id)}
                      className="flex-1"
                      iconName="CheckSquare"
                      iconPosition="left"
                    >
                      View Checklist
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Tips */}
        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-tribal">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-heading font-semibold text-foreground mb-2">
                Quick Tips
              </h4>
              <ul className="space-y-1 text-sm text-foreground">
                <li>• Keep photocopies of all original documents</li>
                <li>• Ensure all documents are attested by authorized officials</li>
                <li>• Check document validity dates before submission</li>
                <li>• Keep digital copies for online applications</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentGuidance;