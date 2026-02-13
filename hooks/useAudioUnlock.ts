import { useState, useRef, useEffect, useCallback } from 'react';

interface AudioUnlockResult {
    audioCtx: AudioContext | null;
    isUnlocked: boolean;
    unlock: () => Promise<boolean>;
}

/**
 * Hook to manage AudioContext unlocking on mobile devices.
 * Browsers (especially iOS Safari) require a user gesture to resume/create AudioContext.
 */
export const useAudioUnlock = (): AudioUnlockResult => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const audioCtxRef = useRef<AudioContext | null>(null);

    // Initialize AudioContext lazily or on first use, but it stays suspended until unlocked.
    const getAudioContext = useCallback(() => {
        if (!audioCtxRef.current) {
            try {
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                if (AudioContextClass) {
                    audioCtxRef.current = new AudioContextClass();
                }
            } catch (e) {
                console.error("Web Audio API not supported", e);
            }
        }
        return audioCtxRef.current;
    }, []);

    const unlock = useCallback(async () => {
        const ctx = getAudioContext();
        if (!ctx) return false;

        if (ctx.state === 'running') {
            setIsUnlocked(true);
            return true;
        }

        try {
            // 1. Resume context
            await ctx.resume();

            // 2. Play a silent buffer (Critical for iOS)
            const buffer = ctx.createBuffer(1, 1, 22050);
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(ctx.destination);
            source.start(0);

            if (ctx.state === 'running') {
                setIsUnlocked(true);
                return true;
            }
        } catch (e) {
            console.error("Audio unlock failed", e);
        }
        return false;
    }, [getAudioContext]);

    // Clean up on unmount
    useEffect(() => {
        return () => {
            // Optional: Close context if this was the only user. 
            // For now, we keep it alive as games might share it or it's expensive to recreate.
            // If we wanted to be strict: 
            // if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
            //   audioCtxRef.current.close();
            // }
        };
    }, []);

    return {
        audioCtx: audioCtxRef.current,
        isUnlocked,
        unlock
    };
};
