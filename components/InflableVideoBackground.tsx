import React from 'react';

export default function InflableVideoBackground() {
    const videoRef = React.useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Video autoplay failed:", error);
            });
        }
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="sticky top-0 w-full h-screen">
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster="https://via.placeholder.com/1920x1080/FFD700/FFFFFF?text=FiveColors+Loading" // Optional fallback
                >
                    <source src="/mascota-video-2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Subtle Overlay Gradient for Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-yellow/30 via-transparent to-transparent z-10 pointer-events-none mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent z-10 pointer-events-none" />
            </div>
        </div>
    );
}
