// Voice recognition and synthesis utilities for Telugu and English

export class VoiceManager {
  constructor() {
    this.recognition = null;
    this.synthesis = window.speechSynthesis;
    this.isListening = false;
    this.isSpeaking = false;
    this.currentLanguage = 'en-US';
    
    this.initializeRecognition();
  }

  initializeRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
      
      this.recognition.onstart = () => {
        this.isListening = true;
        console.log('Voice recognition started');
      };
      
      this.recognition.onend = () => {
        this.isListening = false;
        console.log('Voice recognition ended');
      };
      
      this.recognition.onerror = (event) => {
        console.error('Voice recognition error:', event.error);
        this.isListening = false;
      };
    }
  }

  // Set language for recognition and synthesis
  setLanguage(language) {
    this.currentLanguage = language;
    
    if (this.recognition) {
      // Map our language codes to speech recognition languages
      const recognitionLanguages = {
        'english': 'en-US',
        'telugu': 'te-IN'
      };
      
      this.recognition.lang = recognitionLanguages[language] || 'en-US';
    }
  }

  // Start listening for voice input
  startListening(onResult, onError) {
    if (!this.recognition) {
      onError('Voice recognition not supported');
      return;
    }

    if (this.isListening) {
      this.stopListening();
    }

    this.recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      onResult(result);
    };

    this.recognition.onerror = (event) => {
      onError(event.error);
    };

    try {
      this.recognition.start();
    } catch (error) {
      onError('Failed to start voice recognition');
    }
  }

  // Stop listening
  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }

  // Speak text with proper Telugu pronunciation
  speak(text, options = {}) {
    if (this.isSpeaking) {
      this.stopSpeaking();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice settings
    utterance.lang = this.currentLanguage === 'telugu' ? 'te-IN' : 'en-US';
    utterance.rate = options.rate || 0.8;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;

    // Try to use Telugu voice if available
    if (this.currentLanguage === 'telugu') {
      const voices = this.synthesis.getVoices();
      const teluguVoice = voices.find(voice => 
        voice.lang.includes('te') || 
        voice.name.includes('Telugu') ||
        voice.name.includes('తెలుగు')
      );
      
      if (teluguVoice) {
        utterance.voice = teluguVoice;
      }
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (options.onStart) options.onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (options.onEnd) options.onEnd();
    };

    utterance.onerror = (event) => {
      this.isSpeaking = false;
      console.error('Speech synthesis error:', event.error);
      if (options.onError) options.onError(event.error);
    };

    this.synthesis.speak(utterance);
  }

  // Stop speaking
  stopSpeaking() {
    if (this.synthesis.speaking) {
      this.synthesis.cancel();
      this.isSpeaking = false;
    }
  }

  // Speak with Telugu pronunciation guide
  speakWithPronunciation(text, pronunciation) {
    const fullText = `${text}. ${pronunciation}`;
    this.speak(fullText);
  }

  // Get available voices
  getAvailableVoices() {
    return this.synthesis.getVoices();
  }

  // Check if voice recognition is supported
  isRecognitionSupported() {
    return !!(this.recognition);
  }

  // Check if speech synthesis is supported
  isSynthesisSupported() {
    return !!(this.synthesis);
  }

  // Get Telugu pronunciation for common words
  getTeluguPronunciation(word) {
    const pronunciations = {
      'hello': 'హలో',
      'thank you': 'ధన్యవాదాలు',
      'good': 'మంచిది',
      'bad': 'చెడ్డది',
      'yes': 'అవును',
      'no': 'కాదు',
      'please': 'దయచేసి',
      'sorry': 'క్షమించండి',
      'welcome': 'స్వాగతం',
      'goodbye': 'వీడ్కోలు',
      'name': 'పేరు',
      'age': 'వయస్సు',
      'home': 'ఇల్లు',
      'school': 'పాఠశాల',
      'book': 'పుస్తకం',
      'water': 'నీరు',
      'food': 'ఆహారం',
      'mother': 'అమ్మ',
      'father': 'నాన్న',
      'brother': 'సోదరుడు',
      'sister': 'సోదరి'
    };

    return pronunciations[word.toLowerCase()] || word;
  }

  // Convert English text to Telugu transliteration
  transliterateToTelugu(text) {
    const transliterationMap = {
      'a': 'అ', 'aa': 'ఆ', 'i': 'ఇ', 'ii': 'ఈ', 'u': 'ఉ', 'uu': 'ఊ',
      'e': 'ఎ', 'ee': 'ఏ', 'o': 'ఒ', 'oo': 'ఓ', 'ai': 'ఐ', 'au': 'ఔ',
      'k': 'క', 'kh': 'ఖ', 'g': 'గ', 'gh': 'ఘ', 'ng': 'ఙ',
      'c': 'చ', 'ch': 'ఛ', 'j': 'జ', 'jh': 'ఝ', 'ny': 'ఞ',
      't': 'త', 'th': 'థ', 'd': 'ద', 'dh': 'ధ', 'n': 'న',
      'p': 'ప', 'ph': 'ఫ', 'b': 'బ', 'bh': 'భ', 'm': 'మ',
      'y': 'య', 'r': 'ర', 'l': 'ల', 'v': 'వ', 'sh': 'శ',
      's': 'స', 'h': 'హ', 'ksh': 'క్ష', 'jny': 'జ్ఞ'
    };

    // Simple transliteration (this is a basic implementation)
    let result = text.toLowerCase();
    
    // Replace common English words with Telugu equivalents
    const wordMap = {
      'hello': 'హలో',
      'thank you': 'ధన్యవాదాలు',
      'good': 'మంచిది',
      'yes': 'అవును',
      'no': 'కాదు'
    };

    Object.entries(wordMap).forEach(([english, telugu]) => {
      result = result.replace(new RegExp(english, 'gi'), telugu);
    });

    return result;
  }
}

// Create a singleton instance
export const voiceManager = new VoiceManager();

// Utility functions for common voice operations
export const speakText = (text, language = 'english', options = {}) => {
  voiceManager.setLanguage(language);
  voiceManager.speak(text, options);
};

export const startVoiceInput = (onResult, onError, language = 'english') => {
  voiceManager.setLanguage(language);
  voiceManager.startListening(onResult, onError);
};

export const stopVoiceInput = () => {
  voiceManager.stopListening();
};

export const stopSpeaking = () => {
  voiceManager.stopSpeaking();
};

export const isVoiceSupported = () => {
  return voiceManager.isRecognitionSupported() && voiceManager.isSynthesisSupported();
};

export default voiceManager;
