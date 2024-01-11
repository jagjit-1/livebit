"use client";

import { ConnectionState, Track } from "livekit-client";

import {
    useConnectionState,
    useRemoteParticipant,
    useTracks,
} from "@livekit/components-react"
import { OfflineVideo } from "./offline-video";
import { LoadingVideo } from "./loading-video";
import { LiveVideo } from "./live-video";
import { Skeleton } from "../ui/skeleton";

interface VideoProps {
    hostname: string;
    hostIdentity: string;
}

export const Video = ({ hostname, hostIdentity }: VideoProps) => {
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone,
    ]).filter((track) => track.participant.identity === hostIdentity);

    let content;
    if (!participant && connectionState === ConnectionState.Connected) {
        content = <OfflineVideo username={hostname} />
    }
    else if (!participant && tracks.length === 0) {
        content = <LoadingVideo label={connectionState} />
    }
    else if (participant) {
        content = <LiveVideo participant={participant} />
    }
    // TODO : aspect ratio messes with the width settings, look into improvements for this  
    return (
        <div className=" max-h-[calc(100vh-5rem)] aspect-video border border-background">
            {content}
        </div>
    );
}

export const VideoSkeleton = () => {
    return (
        <div className="aspect-video border-x border-background">
            <Skeleton className="h-full w-full rounded-none" />
        </div>
    )
}