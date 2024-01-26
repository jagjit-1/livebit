"use client"

import Image from "next/image";
import { UserAvatar } from "./user-avatar";
import { Skeleton } from "./ui/skeleton";
import { LiveBadge } from "@/app/(browse)/_components/live-badge";
import { useState, useTransition } from "react";
import { regenerateSignedUrl } from "@/actions/s3";
import { S3Image } from "./S3Image";
import { useAuth } from "@clerk/nextjs";

interface ThumbnailProps {
    src: string | null;
    fallback: string;
    isLive: boolean;
    username: string;
}

export const Thumbnail = ({ src, fallback, isLive, username }: ThumbnailProps) => {
    const [imageError, setImageError] = useState(false);
    let content;

    if (!src || imageError) {
        content = (
            <div className="bg-background flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover: -translate-y-2">
                <UserAvatar
                    size="lg"
                    showBadge
                    username={username}
                    imageUrl={fallback}
                    isLive={isLive}
                />
            </div>
        )
    }
    else {
        content = (
            <S3Image src={src} className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" username={username} onError={() => setImageError(true)} />
        )
    }

    return (
        <div className="group aspect-video relative rounded-md cursor-pointer">
            <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
            {content}
            {isLive && src && (
                <div className="absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
                    <LiveBadge />
                </div>
            )}
        </div>
    )
};

export const ThumbnailSkeleton = () => {
    return (
        <div className="group aspect-video relative rounded-xl cursor-pointer">
            <Skeleton className="h-full w-full" />
        </div>
    )
}