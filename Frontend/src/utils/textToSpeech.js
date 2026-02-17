class TextToSpeechService {
    constructor() {
        this.synth = window.speechSynthesis;
        this.utterance = null;
        this.isPaused = false;
        this.isSupported = 'speechSynthesis' in window;
    }

    isAvailable() {
        return this.isSupported;
    }

    getFemaleVoice() {
        const voices = this.synth.getVoices();

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

        for (const name of femaleVoiceNames) {
            const voice = voices.find(v =>
                v.name.toLowerCase().includes(name.toLowerCase())
            );
            if (voice) return voice;
        }

        const anyFemale = voices.find(v =>
            v.name.toLowerCase().includes('female')
        );
        if (anyFemale) return anyFemale;

        return voices[0] || null;
    }

    speak(text, options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.isAvailable()) {
                reject(new Error('Speech synthesis not supported in this browser'));
                return;
            }

            this.stop();

            this.utterance = new SpeechSynthesisUtterance(text);

            const voice = this.getFemaleVoice();
            if (voice) {
                this.utterance.voice = voice;
            }

            this.utterance.rate = options.rate || 0.9;
            this.utterance.pitch = options.pitch || 1.0;
            this.utterance.volume = options.volume || 1.0;

            this.utterance.onend = () => {
                this.isPaused = false;
                resolve();
            };

            this.utterance.onerror = (event) => {
                this.isPaused = false;
                reject(new Error(`Speech synthesis error: ${event.error}`));
            };

            this.synth.speak(this.utterance);
            this.isPaused = false;
        });
    }

    pause() {
        if (this.synth.speaking && !this.isPaused) {
            this.synth.pause();
            this.isPaused = true;
        }
    }

    resume() {
        if (this.isPaused) {
            this.synth.resume();
            this.isPaused = false;
        }
    }

    stop() {
        this.synth.cancel();
        this.isPaused = false;
        this.utterance = null;
    }

    isSpeaking() {
        return this.synth.speaking;
    }

    isPausedState() {
        return this.isPaused;
    }
}

export const ttsService = new TextToSpeechService();

if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => { };
}
