"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import { Video, VideoSkeleton } from "./video";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { Chat, ChatSkeleton } from "./chat";
import { ChatToggle } from "./chat-toggle";
import { Header, HeaderSkeleton } from "./header";
import { InfoCard } from "./info-card";
import { AboutCard } from "./about-card";

type CustomStream = {
    isLive: boolean;
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
}

type CustomUser = {
    id: string;
    username: string;
    bio: string | null;
    imageUrl: string;
    stream: CustomStream | null;
    _count: { followedBy: number }
}

interface StreamPlayerProps {
    host: CustomUser;
    stream: CustomStream;
    isFollowing: boolean
}

export const StreamPlayer = ({ host, stream, isFollowing }: StreamPlayerProps) => {
    const {
        token,
        name,
        identity
    } = useViewerToken(host.id);

    const { collapsed } = useChatSidebar((state) => state);

    if (!token || !name || !identity) {
        return (
            <StreamPlayerSkeleton />
        )
    }
    return (
        <>
            {collapsed && (
                <div className="hidden lg:block fixed top-[100px] right-2 z-50">
                    <ChatToggle />
                </div>
            )}
            <LiveKitRoom
                token={token}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
                connect
                className={cn(
                    "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-8 h-full lg:overflow-y-auto",
                    collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
                )}
            >
                <div className="space-y-4 col-span-1 lg:col-span-6 lg:overflow-y-auto hidden-scrollbar pb-10">

                    <Video
                        hostname={host.username}
                        hostIdentity={host.id}
                    />
                    <Header
                        hostName={host.username}
                        hostIdentity={host.id}
                        viewerIdentity={identity}
                        imageUrl={host.imageUrl}
                        isFollowing={isFollowing}
                        name={stream.name}
                    />
                    <InfoCard
                        hostIdentity={host.id}
                        viewerIdentity={identity}
                        name={stream.name}
                        thumbnailUrl={stream.thumbnailUrl}
                        hostName={host.username}
                    />
                    <AboutCard
                        hostName={host.username}
                        hostIdentity={host.id}
                        viewerIdentity={identity}
                        bio={host.bio}
                        followerByCount={host._count.followedBy}
                    />
                </div>
                <div className={cn(
                    "col-span-1 lg:col-span-2 h-full",
                    collapsed && "hidden"
                )}>
                    <Chat
                        hostname={host.username}
                        hostIdentity={host.id}
                        viewerName={name}
                        isFollowing={isFollowing}
                        isChatEnabled={stream.isChatEnabled}
                        isChatDelayed={stream.isChatDelayed}
                        isChatFollowersOnly={stream.isChatFollowersOnly}
                    />
                </div>
            </LiveKitRoom>
        </>
    )
};

export const StreamPlayerSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-8 h-full">
            <div className="space-y-4 col-span-1 lg:col-span-6 lg:overflow-y-auto hidden-scrollbar pb-10">
                <VideoSkeleton />
                <HeaderSkeleton />
            </div>
            <div className="col-span-1 lg:col-span-2 h-full">
                <ChatSkeleton />
            </div>
        </div>
    )
}