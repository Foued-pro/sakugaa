"use client";

import { useState, useEffect, useRef, memo } from "react";
import { ArrowRight } from "lucide-react";
import { useInView } from '@/app/hook/useInView';
import { proxyUrl, getPosterUrl } from "@/lib/proxy";
import type { SakugabooruPost } from '@/app/type/sakugabooru';

interface VideoPlayerProps {
    clip: SakugabooruPost;
    playMode?: 'hover' | 'auto';
    showOverlay?: boolean;
    className?: string;
}

const VideoPlayer = memo(({ clip, playMode = 'hover', showOverlay = false, className = '' }: VideoPlayerProps) => {
    const { ref: containerRef, isInView } = useInView<HTMLDivElement>(0.2);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const secureFileUrl = proxyUrl(clip.file_url);
    const posterUrl = getPosterUrl(clip);

    useEffect(() => {
        setIsTouchDevice(window.matchMedia('(hover: none)').matches);
    }, []);

    useEffect(() => {
        return () => {
            const video = videoRef.current;
            if (video) {
                video.pause();
                video.removeAttribute('src');
                video.load();
            }
        };
    }, []);

    // auto mode : joue dès que visible, indépendamment du device
    useEffect(() => {
        if (playMode !== 'auto') return;
        const video = videoRef.current;
        if (!video) return;
        if (isInView) {
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    }, [playMode, isInView]);

    // hover mode desktop
    useEffect(() => {
        if (playMode !== 'hover' || isTouchDevice) return;
        const video = videoRef.current;
        if (!video || !isInView) return;
        if (isHovered) {
            video.play().catch(() => {});
        } else {
            video.pause();
            video.currentTime = 0;
        }
    }, [playMode, isHovered, isInView, isTouchDevice]);

    // hover mode mobile → fallback auto
    useEffect(() => {
        if (playMode !== 'hover' || !isTouchDevice) return;
        const video = videoRef.current;
        if (!video) return;
        if (isInView) {
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    }, [playMode, isTouchDevice, isInView]);

    return (
        <div
            ref={containerRef}
            className={`group/video relative w-full h-full bg-gray-200 ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={posterUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            {isInView && (
                <video
                    ref={videoRef}
                    src={secureFileUrl}
                    poster={posterUrl}
                    className="absolute inset-0 w-full h-full object-cover z-[1]"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                />
            )}
            {showOverlay && (
                <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover/video:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center transform translate-y-4 group-hover/video:translate-y-0 transition-all duration-300 border border-white/50">
                        <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                </div>
            )}
        </div>
    );
});

VideoPlayer.displayName = "VideoPlayer";
export default VideoPlayer;