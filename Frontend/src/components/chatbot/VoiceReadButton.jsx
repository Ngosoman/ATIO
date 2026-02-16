import React, { useState, useEffect } from 'react';
import { extractPageContent } from '../../utils/contentExtractor.js';
import { ttsService } from '../../utils/textToSpeech.js';
import { Volume2, VolumeX, AlertCircle, Play, Pause, Loader2 } from 'lucide-react';

export const VoiceReadButton = () => {
    const [state, setState] = useState('idle'); // idle, reading, paused, error
    const [errorMessage, setErrorMessage] = useState('');
    const [isSupported, setIsSupported] = useState(true);

    useEffect(() => {
        // Check browser support on mount
        if (!ttsService.isAvailable()) {
            setIsSupported(false);
            setErrorMessage('Voice reading not supported');
        }
    }, []);

    const handleClick = async () => {
        if (!isSupported) return;

        // If reading, pause it
        if (state === 'reading') {
            ttsService.pause();
            setState('paused');
            return;
        }

        // If paused, resume
        if (state === 'paused') {
            ttsService.resume();
            setState('reading');
            return;
        }

        // If idle, start reading
        try {
            setState('reading');
            setErrorMessage('');

            // Extract page content
            const content = extractPageContent();

            if (!content || content.length < 10) {
                throw new Error('No readable content found');
            }

            // Read the content
            await ttsService.speak(content);

            // Finished reading
            setState('idle');
        } catch (error) {
            console.error('Voice reading error:', error);
            setErrorMessage('Failed to read content');
            setState('error');

            // Reset error state after 3 seconds
            setTimeout(() => {
                setState('idle');
                setErrorMessage('');
            }, 3000);
        }
    };

    const handleStop = (e) => {
        e.stopPropagation();
        ttsService.stop();
        setState('idle');
    };

    // Don't render if not supported
    if (!isSupported) {
        return null;
    }

    const getIcon = () => {
        if (state === 'reading') return <Volume2 className="w-6 h-6 animate-pulse" />;
        if (state === 'paused') return <Pause className="w-6 h-6" />;
        if (state === 'error') return <AlertCircle className="w-6 h-6" />;
        return <Play className="w-6 h-6" />;
    };

    const getButtonColor = () => {
        if (state === 'error') return 'bg-red-500';
        if (state === 'reading') return 'bg-yellow-500';
        if (state === 'paused') return 'bg-orange-500';
        return 'bg-green-600';
    };

    return (
        <div className="fixed bottom-28 right-6 z-50 flex flex-col items-end gap-2">
            {/* Error Message Tooltip */}
            {state === 'error' && errorMessage && (
                <div className="absolute right-16 top-2 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                    {errorMessage}
                </div>
            )}

            {/* Stop button (shown when reading or paused) */}
            {(state === 'reading' || state === 'paused') && (
                <button
                    onClick={handleStop}
                    className="bg-red-500 text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95 mb-2"
                    title="Stop reading"
                >
                    <VolumeX className="w-5 h-5" />
                </button>
            )}

            {/* Main voice button */}
            <button
                onClick={handleClick}
                disabled={!isSupported}
                className={`${getButtonColor()} text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform active:scale-95 border-4 border-white`}
                title={state === 'reading' ? 'Pause reading' : 'Read page aloud'}
            >
                {getIcon()}
            </button>
        </div>
    );
};
