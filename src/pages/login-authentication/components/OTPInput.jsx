import React, { useState, useRef, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const OTPInput = ({ length = 6, onComplete, onPlayAudio, isLoading }) => {
  const [otp, setOtp] = useState(new Array(length)?.fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs?.current?.[0]) {
      inputRefs?.current?.[0]?.focus();
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element?.value)) return false;

    setOtp([...otp?.map((d, idx) => (idx === index ? element?.value : d))]);

    // Focus next input
    if (element?.nextSibling && element?.value !== '') {
      element?.nextSibling?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e?.key === 'Backspace') {
      if (otp?.[index] === '' && index > 0) {
        inputRefs?.current?.[index - 1]?.focus();
      }
      setOtp([...otp?.map((d, idx) => (idx === index ? '' : d))]);
    }
  };

  const handlePaste = (e) => {
    e?.preventDefault();
    const pastedData = e?.clipboardData?.getData('text')?.slice(0, length);
    const pastedArray = pastedData?.split('');
    
    setOtp([...pastedArray, ...new Array(length - pastedArray.length)?.fill('')]);
    
    if (pastedArray?.length === length) {
      onComplete(pastedData);
    }
  };

  useEffect(() => {
    const otpValue = otp?.join('');
    if (otpValue?.length === length) {
      onComplete(otpValue);
    }
  }, [otp, length, onComplete]);

  return (
    <div className="space-y-4">
      {/* OTP Input Fields */}
      <div className="flex justify-center space-x-2 sm:space-x-3">
        {otp?.map((data, index) => (
          <input
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            type="text"
            maxLength="1"
            value={data}
            onChange={(e) => handleChange(e?.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            disabled={isLoading}
            className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-mono font-semibold bg-input border-2 border-border rounded-tribal focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none smooth-transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>
      {/* Audio Playback Button */}
      <div className="flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={onPlayAudio}
          iconName="Volume2"
          iconPosition="left"
          iconSize={16}
          className="text-muted-foreground hover:text-primary"
        >
          <span className="text-sm">OTP వినండి / Play OTP</span>
        </Button>
      </div>
      {/* Instructions */}
      <div className="text-center space-y-1">
        <p className="text-sm text-muted-foreground">
          మీ మొబైల్‌కు వచ్చిన 6 అంకెల కోడ్ ఎంటర్ చేయండి
        </p>
        <p className="text-xs text-muted-foreground">
          Enter the 6-digit code sent to your mobile
        </p>
      </div>
    </div>
  );
};

export default OTPInput;