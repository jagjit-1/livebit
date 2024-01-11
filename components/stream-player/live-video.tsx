"use client";

import { Participant, Track } from "livekit-client";
import { AudioTrack, AudioVisualizer, ConnectionQualityIndicator, ConnectionState, TrackReference, VideoTrack, useTracks } from "@livekit/components-react";
import { useRef, useState } from "react";
import { PausedVideo } from "./paused-video";
import { VideoControls } from "./video-controls";
import { useEventListener } from "usehooks-ts";

interface LiveVideoProps {
    participant: Participant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {

    const [isFullscreen, setIsFullscreen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const toggleFullscreen = () => {
        if (isFullscreen) {
            document.exitFullscreen()
        } else if (wrapperRef.current) {
            wrapperRef.current.requestFullscreen();
        }
        setIsFullscreen(!isFullscreen)
    }

    const handleFullscreenChange = () => {
        const isCurrentlyFullscreen = document.fullscreenElement !== null;
        setIsFullscreen(isCurrentlyFullscreen);
    }

    useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);


    useTracks([Track.Source.Camera, Track.Source.Microphone])
        .filter((trackRef) => trackRef.participant.identity === participant.identity)
        .forEach((track) => {
            console.log(videoRef.current)
            if (videoRef.current) {
                track.publication.track?.attach(videoRef.current);
            }
            return track;
        });


    return <>


        <div ref={wrapperRef} className="relative h-full flex">
            <video ref={videoRef} width="100%" />
            <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
                <div className="absolute bottom-1 flex w-full items-center justify-between ">
                    <VideoControls
                        isFullscreen={isFullscreen}
                        onToggle={toggleFullscreen}
                    />
                </div>
            </div>
        </div>
    </>

}