/**
 * Text-to-Speech utility using Web Speech API
 * Provides controls for reading text aloud with a female voice
 */

class TextToSpeechService {
    constructor() {
        this.synth = window.speechSynthesis;
        this.utterance = null;
        this.isPaused = false;
        this.isSupported = 'speechSynthesis' in window;
    }

    /**
     * Check if browser supports speech synthesis
     */
    isAvailable() {
        return this.isSupported;
    }

    /**
     * Get the best available female voice
     */
    getFemaleVoice() {
        const voices = this.synth.getVoices();

        // Priority list for female voices (common across browsers)
        const femaleVoiceNames = [
            'Google UK English Female',
            'Google US English Female',
            'Microsoft Zira',
            'Microsoft Susan',
            'Samantha',
            'Victoria',
            'Karen',
            'Moira',
            'Fiona',
            'female'
        ];

        // Try to find a preferred female voice
        for (const name of femaleVoiceNames) {
            const voice = voices.find(v =>
                v.name.toLowerCase().includes(name.toLowerCase())
            );
            if (voice) return voice;
        }

        // Fallback: find any voice with "female" in the name
        const anyFemale = voices.find(v =>
            v.name.toLowerCase().includes('female')
        );
        if (anyFemale) return anyFemale;

        // Last resort: return first available voice
        return voices[0] || null;
    }

    /**
     * Speak the given text
     * @param {string} text - Text to speak
     * @param {object} options - Speech options
     * @returns {Promise} - Resolves when speech completes
     */
    speak(text, options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.isAvailable()) {
                reject(new Error('Speech synthesis not supported in this browser'));
                return;
            }

            // Cancel any ongoing speech
            this.stop();

            // Create new utterance
            this.utterance = new SpeechSynthesisUtterance(text);

            // Set voice
            const voice = this.getFemaleVoice();
            if (voice) {
                this.utterance.voice = voice;
            }

            // Configure speech parameters
            this.utterance.rate = options.rate || 0.9;      // Slightly slower for clarity
            this.utterance.pitch = options.pitch || 1.0;    // Normal pitch
            this.utterance.volume = options.volume || 1.0;  // Full volume

            // Event handlers
            this.utterance.onend = () => {
                this.isPaused = false;
                resolve();
            };

            this.utterance.onerror = (event) => {
                this.isPaused = false;
                reject(new Error(`Speech synthesis error: ${event.error}`));
            };

            // Start speaking
            this.synth.speak(this.utterance);
            this.isPaused = false;
        });
    }

    /**
     * Pause current speech
     */
    pause() {
        if (this.synth.speaking && !this.isPaused) {
            this.synth.pause();
            this.isPaused = true;
        }
    }

    /**
     * Resume paused speech
     */
    resume() {
        if (this.isPaused) {
            this.synth.resume();
            this.isPaused = false;
        }
    }

    /**
     * Stop and cancel current speech
     */
    stop() {
        this.synth.cancel();
        this.isPaused = false;
        this.utterance = null;
    }

    /**
     * Check if currently speaking
     */
    isSpeaking() {
        return this.synth.speaking;
    }

    /**
     * Check if currently paused
     */
    isPausedState() {
        return this.isPaused;
    }
}

// Export singleton instance
export const ttsService = new TextToSpeechService();

// Ensure voices are loaded (some browsers load them asynchronously)
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
        // Voices are now loaded
    };
}
