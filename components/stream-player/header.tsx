"use client"

import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";
import { VerifiedMark } from "../verified-mark";
import { useParticipants, useRemoteParticipant } from "@livekit/components-react";
import { UserIcon } from "lucide-react";
import { Actions, ActionsSkeleton } from "./actions";
import { Skeleton } from "../ui/skeleton";

interface HeaderProps {
    hostName: string;
    hostIdentity: string;
    viewerIdentity: string;
    imageUrl: string;
    isFollowing: boolean;
    name: string;
}

export const Header = ({
    hostName,
    hostIdentity,
    viewerIdentity,
    imageUrl,
    isFollowing,
    name }: HeaderProps) => {
    const participants = useParticipants();
    const host = useRemoteParticipant(hostIdentity);
    const isLive = !!host;
    const participantCount = participants.length - 1;

    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer;

    return (
        <div className="flex flex-col-1 lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
            <div className="flex items-center gap-x-3">
                <UserAvatar imageUrl={imageUrl} username={name} isLive={isLive} showBadge size="lg" />
                <div className="space-y-1">
                    <div className="flex items-center gap-x-2">
                        <h2 className="text-lg font-semibold">
                            {hostName}
                        </h2>
                        <VerifiedMark />
                    </div>
                    <p>
                        {name}
                    </p>
                    {isLive ? (
                        <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
                            <UserIcon className="h-4 w-4" />
                            <p>
                                {participantCount} {participantCount === 1 ? "viewer" : "viewers"}
                            </p>
                        </div>
                    ) : (
                        <div className="font-semibold text-xs text-muted-foreground">
                            Offline
                        </div>
                    )}
                </div>
            </div>
            <Actions
                isFollowing={isFollowing}
                hostIdentity={hostIdentity}
                isHost={isHost}
            />

        </div>
    )
};

export const HeaderSkeleton = () => {
    return (
        <Skeleton className="flex flex-col-1 lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
            <div>
                <UserAvatarSkeleton />
                <div>
                    <Skeleton className="h-6 w-32"/>
                    <Skeleton className="h-4 w-24"/>
                </div>
            </div>
            <ActionsSkeleton />
        </Skeleton>
    )
}