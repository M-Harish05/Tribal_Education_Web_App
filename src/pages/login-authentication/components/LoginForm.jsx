import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import VoiceInputButton from './VoiceInputButton';

const LoginForm = ({ onSendOTP, isLoading, error }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isVoiceListening, setIsVoiceListening] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (mobileNumber?.length === 10) {
      onSendOTP(mobileNumber);
    }
  };

  const handleVoiceInput = (voiceNumber) => {
    setMobileNumber(voiceNumber);
    setIsVoiceListening(false);
  };

  const handleMobileChange = (e) => {
    const value = e?.target?.value?.replace(/\D/g, '')?.slice(0, 10);
    setMobileNumber(value);
  };

  const isValidMobile = mobileNumber?.length === 10;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Mobile Number Input */}
      <div className="space-y-2">
        <div className="relative">
          <Input
            type="tel"
            label="మొబైల్ నంబర్ / Mobile Number"
            placeholder="10 అంకెల మొబైల్ నంబర్ ఎంటర్ చేయండి"
            value={mobileNumber}
            onChange={handleMobileChange}
            error={error}
            required
            maxLength={10}
            className="pr-16 text-lg font-mono"
            disabled={isLoading}
          />
          
          {/* Voice Input Button */}
          <div className="absolute right-2 top-8">
            <VoiceInputButton
              onVoiceInput={handleVoiceInput}
              isListening={isVoiceListening}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Mobile Number Validation */}
        {mobileNumber?.length > 0 && (
          <div className="flex items-center space-x-2 text-sm">
            <Icon 
              name={isValidMobile ? "CheckCircle" : "AlertCircle"} 
              size={16} 
              className={isValidMobile ? "text-success" : "text-warning"}
            />
            <span className={isValidMobile ? "text-success" : "text-warning"}>
              {isValidMobile 
                ? "చెల్లుబాటు అయ్యే నంబర్ / Valid number"
                : `${10 - mobileNumber?.length} అంకెలు మిగిలాయి / ${10 - mobileNumber?.length} digits remaining`
              }
            </span>
          </div>
        )}
      </div>
      {/* Send OTP Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={!isValidMobile || isLoading}
        iconName="Send"
        iconPosition="right"
        iconSize={20}
        className="h-14 text-lg font-semibold"
      >
        {isLoading ? (
          <span>OTP పంపుతున్నాం... / Sending OTP...</span>
        ) : (
          <span>OTP పంపండి / Send OTP</span>
        )}
      </Button>
      {/* Instructions */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} />
          <span>మీ నంబర్ సురక్షితంగా ఉంచబడుతుంది</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Your number will be kept secure and used only for authentication
        </p>
      </div>
      {/* Voice Instructions */}
      <div className="bg-muted/50 rounded-tribal p-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Mic" size={18} className="text-primary" />
          <span className="text-sm font-medium text-foreground">వాయిస్ సహాయం / Voice Help</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          మైక్ బటన్ నొక్కి మీ మొబైల్ నంబర్ చెప్పండి\nPress the mic button and speak your mobile number
        </p>
      </div>
    </form>
  );
};

export default LoginForm;