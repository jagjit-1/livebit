"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import { Video, VideoSkeleton } from "./video";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { Chat, ChatSkeleton } from "./chat";
import { ChatToggle } from "./chat-toggle";
import { Header } from "./header";


interface StreamPlayerProps {
    host: User & { stream: Stream | null };
    stream: Stream;
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
            </div>
            <div className="col-span-1 lg:col-span-2 h-full">
                <ChatSkeleton />
            </div>
        </div>
    )
}