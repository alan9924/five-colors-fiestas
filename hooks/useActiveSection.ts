
import { useEffect, useState } from 'react';

export const useActiveSection = (sectionIds: string[], offset = 100) => {
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        const handleScroll = () => {
            let currentSection = '';

            for (const id of sectionIds) {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Check if the section is near the top of the viewport
                    if (rect.top <= offset && rect.bottom >= offset) {
                        currentSection = id;
                        break;
                    }
                }
            }

            if (currentSection && currentSection !== activeSection) {
                setActiveSection(currentSection);
                // Optimize URL updates to avoid history spam, only replace state
                window.history.replaceState(null, '', `#${currentSection}`);
            }
        };

        // Throttle scroll event for performance
        let timeoutId: number | null = null;
        const throttledScroll = () => {
            if (!timeoutId) {
                timeoutId = window.setTimeout(() => {
                    handleScroll();
                    timeoutId = null;
                }, 100);
            }
        };

        window.addEventListener('scroll', throttledScroll);

        // Initial check
        handleScroll();

        return () => {
            window.removeEventListener('scroll', throttledScroll);
            if (timeoutId) window.clearTimeout(timeoutId);
        };
    }, [sectionIds, activeSection, offset]);

    return activeSection;
};
