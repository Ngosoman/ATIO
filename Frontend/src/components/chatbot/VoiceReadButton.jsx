import React, { useState, useEffect } from 'react';
import { extractPageContent } from '../../utils/contentExtractor.js';
import { ttsService } from '../../utils/textToSpeech.js';

export const VoiceReadButton = () => {
    const [state, setState] = useState('idle'); // idle, reading, paused, error
    const [errorMessage, setErrorMessage] = useState('');
    const [isSupported, setIsSupported] = useState(true);

    useEffect(() => {
        // Check browser support on mount
        if (!ttsService.isAvailable()) {
            setIsSupported(false);
            setErrorMessage('Voice reading not supported in this browser');
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
                throw new Error('No readable content found on this page');
            }

            // Read the content
            await ttsService.speak(content);

            // Finished reading
            setState('idle');
        } catch (error) {
            console.error('Voice reading error:', error);
            setErrorMessage(error.message || 'Failed to read content');
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
        if (state === 'reading') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
            );
        }

        if (state === 'paused') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
        }

        if (state === 'error') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            );
        }

        // Idle state - speaker icon
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
        );
    };

    const getButtonColor = () => {
        if (state === 'error') return 'bg-red-500';
        if (state === 'reading') return 'bg-maize-yellow';
        if (state === 'paused') return 'bg-orange-500';
        return 'bg-forest-green';
    };

    return (
        <div className="flex flex-col items-end gap-2">
            {/* Error tooltip */}
            {state === 'error' && errorMessage && (
                <div className="bg-red-500 text-white text-xs px-3 py-2 rounded-lg shadow-lg max-w-[200px] animate-in slide-in-from-bottom-2">
                    {errorMessage}
                </div>
            )}

            {/* Stop button (shown when reading or paused) */}
            {(state === 'reading' || state === 'paused') && (
                <button
                    onClick={handleStop}
                    className="bg-red-500 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95 border-4 border-white"
                    title="Stop reading"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                    </svg>
                </button>
            )}

            {/* Main voice button */}
            <button
                onClick={handleClick}
                disabled={!isSupported}
                className={`${getButtonColor()} text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95 border-4 border-white disabled:opacity-50 disabled:cursor-not-allowed`}
                title={
                    state === 'reading' ? 'Pause reading' :
                        state === 'paused' ? 'Resume reading' :
                            state === 'error' ? errorMessage :
                                'Read page aloud'
                }
            >
                {getIcon()}
            </button>
        </div>
    );
};
