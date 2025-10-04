import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContributionModal = ({ 
  isOpen, 
  onClose, 
  contributionType, 
  onSubmit,
  className = '' 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    titleTelugu: '',
    description: '',
    culturalContext: '',
    region: '',
    contributorName: '',
    contributorAge: '',
    contributorRole: ''
  });
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices?.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks?.push(event?.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setRecordedAudio(blob);
        stream?.getTracks()?.forEach(track => track?.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder?.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef?.current && isRecording) {
      mediaRecorderRef?.current?.stop();
      setIsRecording(false);
    }
  };

  const handleImageSelect = (event) => {
    const files = Array.from(event?.target?.files);
    setSelectedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev?.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    try {
      const contributionData = {
        ...formData,
        type: contributionType,
        audioFile: recordedAudio,
        images: selectedImages,
        submittedAt: new Date()?.toISOString(),
        status: 'pending_review'
      };

      await onSubmit(contributionData);
      
      // Reset form
      setFormData({
        title: '',
        titleTelugu: '',
        description: '',
        culturalContext: '',
        region: '',
        contributorName: '',
        contributorAge: '',
        contributorRole: ''
      });
      setRecordedAudio(null);
      setSelectedImages([]);
      onClose();
    } catch (error) {
      console.error('Error submitting contribution:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeTitle = () => {
    switch (contributionType) {
      case 'story': return 'Share a Folk Story';
      case 'song': return 'Share a Traditional Song';
      case 'craft': return 'Share Craft Knowledge';
      case 'custom': return 'Share Cultural Custom';
      default: return 'Share Knowledge';
    }
  };

  const getTypeTitleTelugu = () => {
    switch (contributionType) {
      case 'story': return 'జానపద కథ పంచుకోండి';
      case 'song': return 'సాంప్రదాయ పాట పంచుకోండి';
      case 'craft': return 'హస్తకళ జ్ఞానం పంచుకోండి';
      case 'custom': return 'సాంస్కృతిక ఆచారం పంచుకోండి';
      default: return 'జ్ఞానం పంచుకోండి';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-card border border-border rounded-tribal shadow-tribal-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              {getTypeTitle()}
            </h2>
            <p className="text-sm font-caption text-muted-foreground">
              {getTypeTitleTelugu()}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-medium text-foreground">
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Title (English)"
                type="text"
                value={formData?.title}
                onChange={(e) => handleInputChange('title', e?.target?.value)}
                placeholder="Enter title in English"
                required
              />
              
              <Input
                label="Title (Telugu)"
                type="text"
                value={formData?.titleTelugu}
                onChange={(e) => handleInputChange('titleTelugu', e?.target?.value)}
                placeholder="తెలుగులో శీర్షిక"
                required
              />
            </div>

            <Input
              label="Description"
              type="text"
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              placeholder="Describe the cultural significance and details"
              required
            />

            <Input
              label="Cultural Context"
              type="text"
              value={formData?.culturalContext}
              onChange={(e) => handleInputChange('culturalContext', e?.target?.value)}
              placeholder="When and how is this tradition practiced?"
            />

            <Input
              label="Region/Community"
              type="text"
              value={formData?.region}
              onChange={(e) => handleInputChange('region', e?.target?.value)}
              placeholder="Which tribal community or region?"
              required
            />
          </div>

          {/* Audio Recording */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-medium text-foreground">
              Audio Recording
            </h3>
            
            <div className="flex items-center space-x-4">
              <Button
                type="button"
                variant={isRecording ? "destructive" : "default"}
                onClick={isRecording ? stopRecording : startRecording}
                iconName={isRecording ? "Square" : "Mic"}
                iconPosition="left"
                iconSize={16}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Button>
              
              {recordedAudio && (
                <div className="flex items-center space-x-2 text-sm text-success">
                  <Icon name="CheckCircle" size={16} />
                  <span>Audio recorded successfully</span>
                </div>
              )}
            </div>

            {isRecording && (
              <div className="flex items-center space-x-2 text-sm text-primary">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>Recording in progress...</span>
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-medium text-foreground">
              Images (Optional)
            </h3>
            
            <div className="space-y-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef?.current?.click()}
                iconName="Upload"
                iconPosition="left"
                iconSize={16}
              >
                Upload Images
              </Button>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />

              {selectedImages?.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedImages?.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-tribal border border-border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 h-6 w-6"
                      >
                        <Icon name="X" size={12} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Contributor Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-medium text-foreground">
              Contributor Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Your Name"
                type="text"
                value={formData?.contributorName}
                onChange={(e) => handleInputChange('contributorName', e?.target?.value)}
                placeholder="Full name"
                required
              />
              
              <Input
                label="Age"
                type="number"
                value={formData?.contributorAge}
                onChange={(e) => handleInputChange('contributorAge', e?.target?.value)}
                placeholder="Age"
                min="1"
                max="120"
              />
              
              <Input
                label="Role in Community"
                type="text"
                value={formData?.contributorRole}
                onChange={(e) => handleInputChange('contributorRole', e?.target?.value)}
                placeholder="Elder, Artisan, etc."
              />
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              variant="default"
              loading={isSubmitting}
              iconName="Send"
              iconPosition="left"
              iconSize={16}
            >
              Submit for Review
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContributionModal;