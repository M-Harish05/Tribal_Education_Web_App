import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import WelcomeHeader from './components/WelcomeHeader';
import LoginForm from './components/LoginForm';
import OTPInput from './components/OTPInput';
import TribalPattern from './components/TribalPattern';

const LoginAuthentication = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('mobile'); // 'mobile' or 'otp'
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Mock credentials for demonstration
  const mockCredentials = {
    mobile: '9876543210',
    otp: '123456'
  };

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleSendOTP = async (mobile) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMobileNumber(mobile);
      setStep('otp');
      setOtpSent(true);
      setResendTimer(30);
      
      // Show success message
      const successMessage = mobile === mockCredentials?.mobile 
        ? 'OTP sent successfully! Use: 123456' :'OTP sent successfully!';
      
      // You could show a toast notification here
      console.log(successMessage);
      
    } catch (err) {
      setError('OTP పంపడంలో సమస్య వచ్చింది. దయచేసి మళ్లీ ప్రయత్నించండి / Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (otp) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check mock credentials
      if (mobileNumber !== mockCredentials?.mobile || otp !== mockCredentials?.otp) {
        throw new Error('Invalid credentials');
      }
      
      // Store login status
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userMobile', mobileNumber);
      localStorage.setItem('loginTime', new Date()?.toISOString());
      
      // Navigate to dashboard
      navigate('/dashboard-home');
      
    } catch (err) {
      setError('తప్పు OTP. దయచేసి సరైన కోడ్ ఎంటర్ చేయండి / Invalid OTP. Please enter the correct code.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = () => {
    if (resendTimer === 0) {
      handleSendOTP(mobileNumber);
    }
  };

  const handlePlayOTP = () => {
    // Text-to-speech for OTP (mock implementation)
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `Your OTP is ${mockCredentials.otp.split('').join(' ')}`
      );
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const handleBackToMobile = () => {
    setStep('mobile');
    setOtpSent(false);
    setError('');
    setResendTimer(0);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Tribal Pattern Background */}
      <TribalPattern />
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-card border border-border rounded-tribal shadow-tribal-lg p-6 sm:p-8">
            {/* Welcome Header */}
            <WelcomeHeader />

            {/* Login Steps */}
            {step === 'mobile' ? (
              <LoginForm
                onSendOTP={handleSendOTP}
                isLoading={isLoading}
                error={error}
              />
            ) : (
              <div className="space-y-6">
                {/* Back Button */}
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBackToMobile}
                    iconName="ArrowLeft"
                    iconPosition="left"
                    iconSize={16}
                    disabled={isLoading}
                  >
                    వెనుకకు / Back
                  </Button>
                  <div className="flex-1 text-right">
                    <p className="text-sm text-muted-foreground">
                      OTP పంపబడింది: <span className="font-mono font-medium">+91 {mobileNumber}</span>
                    </p>
                  </div>
                </div>

                {/* OTP Input */}
                <OTPInput
                  length={6}
                  onComplete={handleVerifyOTP}
                  onPlayAudio={handlePlayOTP}
                  isLoading={isLoading}
                />

                {/* Error Message */}
                {error && (
                  <div className="flex items-center space-x-2 p-3 bg-error/10 border border-error/20 rounded-tribal">
                    <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
                    <p className="text-sm text-error">{error}</p>
                  </div>
                )}

                {/* Resend OTP */}
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    OTP రాలేదా? / Didn't receive OTP?
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResendOTP}
                    disabled={resendTimer > 0 || isLoading}
                    iconName="RefreshCw"
                    iconPosition="left"
                    iconSize={16}
                  >
                    {resendTimer > 0 ? (
                      <span>మళ్లీ పంపండి ({resendTimer}s) / Resend ({resendTimer}s)</span>
                    ) : (
                      <span>మళ్లీ OTP పంపండి / Resend OTP</span>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Mock Credentials Info */}
            <div className="mt-8 p-4 bg-muted/30 rounded-tribal border border-border">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Info" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Demo Credentials</span>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground font-mono">
                <p>Mobile: {mockCredentials?.mobile}</p>
                <p>OTP: {mockCredentials?.otp}</p>
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Icon name="HelpCircle" size={16} />
                <span>సహాయం కావాలా? / Need help?</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                వాయిస్ నావిగేషన్ కోసం మైక్ బటన్ ఉపయోగించండి
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card border border-border rounded-tribal p-6 shadow-tribal-lg">
            <div className="flex items-center space-x-3">
              <div className="animate-spin">
                <Icon name="Loader2" size={24} className="text-primary" />
              </div>
              <span className="text-foreground font-medium">
                {step === 'mobile' ? 'OTP పంపుతున్నాం...' : 'వెరిఫై చేస్తున్నాం...'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginAuthentication;