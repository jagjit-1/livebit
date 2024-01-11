"use client";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { ChatCommunity } from "./chat-community";
import { Skeleton } from "../ui/skeleton";


interface ChatProps {
    hostname: string;
    hostIdentity: string;
    viewerName: string;
    isFollowing: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
};


export const Chat = ({
    hostname,
    hostIdentity,
    viewerName,
    isFollowing,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly }: ChatProps) => {
    const matches = useMediaQuery('(max-width:1024px)');
    const { variant, onExpand } = useChatSidebar(state => state);
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);

    const isOnline = participant && connectionState === ConnectionState.Connected;

    const isHidden = !isChatEnabled || !isOnline;

    const { chatMessages: messages } = useChat();

    useEffect(() => {
        if (matches) {
            onExpand();
        }
    }, [matches, onExpand]);

    return (
        <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
            <ChatHeader />
            {variant === ChatVariant.CHAT && (
                <>
                    <ChatList
                        messages={messages}
                        isHidden={isHidden}

                    />
                    <ChatForm
                        isHidden={isHidden}
                        isFollowersOnly={isChatFollowersOnly}
                        isDelayed={isChatDelayed}
                        isFollowing={isFollowing}
                    />
                </>
            )}
            {variant === ChatVariant.COMMUNITY && (
                <ChatCommunity viewerName={viewerName} hostName={hostname} isHidden={isHidden} />
            )}
        </div>
    )
};

export const ChatSkeleton = () => {
    return (
        <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
            <ChatHeaderSkeleton />
            <ChatListSkeleton />
            <ChatFormSkeleton />
        </div>
    )
}