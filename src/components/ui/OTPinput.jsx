import { useState, useRef, useEffect } from 'react';


const OTPinput = ({
  onComplete,
  autoFocus = true,
  initialValue = '',
  onChange,
  inputClassName = '',
  containerClassName = '',
}) => {
  // State to store the 6 digits
  const [otp, setOtp] = useState(Array(6).fill(''));
  
  // Refs for each input field
  const inputRefs = useRef([]);
  
  // Initialize with initial value if provided
  useEffect(() => {
    if (initialValue && initialValue.length > 0) {
      const digits = initialValue.split('').slice(0, 6);
      const newOtp = [...otp];
      
      digits.forEach((digit, index) => {
        if (/^\d$/.test(digit)) {
          newOtp[index] = digit;
        }
      });
      
      setOtp(newOtp);
    }
  }, [initialValue]);
  
  // Auto-focus first input on mount if autoFocus is true
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);
  
  // Handle input change
  const handleChange = (e, index) => {
    const value = e.target.value;
    
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    // Update the OTP array
    const newOtp = [...otp];
    
    // Take only the last character if multiple characters are pasted
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    
    // Call onChange callback if provided
    if (onChange) {
      onChange(newOtp.join(''));
    }
    
    // Auto-focus next input if a digit was entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    
    // Check if OTP is complete and call onComplete
    const otpValue = newOtp.join('');
    if (otpValue.length === 6 && !newOtp.includes('') && onComplete) {
      onComplete(otpValue);
    }
  };
  
  // Handle key down events (for backspace and navigation)
  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    
    // Arrow left - move focus to previous input
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    
    // Arrow right - move focus to next input
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
  
  // Handle paste event to fill multiple inputs at once
  const handlePaste = (e, index) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // Filter out non-digits
    const digits = pastedData.replace(/\D/g, '').split('').slice(0, 6 - index);
    
    if (digits.length === 0) return;
    
    const newOtp = [...otp];
    
    // Fill the OTP array with pasted digits
    digits.forEach((digit, i) => {
      if (index + i < 6) {
        newOtp[index + i] = digit;
      }
    });
    
    setOtp(newOtp);
    
    // Focus the next empty input or the last input
    const nextIndex = Math.min(index + digits.length, 5);
    if (inputRefs.current[nextIndex]) {
      inputRefs.current[nextIndex].focus();
    }
    
    // Call onChange callback if provided
    if (onChange) {
      onChange(newOtp.join(''));
    }
    
    // Check if OTP is complete and call onComplete
    const otpValue = newOtp.join('');
    if (otpValue.length === 6 && !newOtp.includes('') && onComplete) {
      onComplete(otpValue);
    }
  };

  return (
    <div className={`flex justify-center space-x-3 ${containerClassName}`}>
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          className={`w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent ${inputClassName}`}
          aria-label={`Digit ${index + 1} of OTP`}
        />
      ))}
    </div>
  );
};

export default OTPinput;
