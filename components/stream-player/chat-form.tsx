"use client"

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useChat } from "@livekit/components-react";
import { ChatInfo } from "./chat-info";

interface ChatFormProps {
    isHidden: boolean;
    isFollowersOnly: boolean;
    isFollowing: boolean;
    isDelayed: boolean;
}


export const ChatForm = ({
    isHidden,
    isFollowersOnly,
    isFollowing,
    isDelayed
}: ChatFormProps) => {
    const [value, setValue] = useState("");
    const [isDelayedBlocked, setIsDelayedBlocked] = useState(false);
    const { send } = useChat();

    const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
    const isDisabled = isHidden || isDelayedBlocked || isFollowersOnlyAndNotFollowing;

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation()
        if (!value || !send || isDisabled) return;

        if (isDelayed && !isDelayedBlocked) {
            setIsDelayedBlocked(true);
            setTimeout(() => {
                setIsDelayedBlocked(false);
                send(value);
                setValue("");
            }, 3000)
        } else {
            send(value);
            setValue("");
        }
    }

    if (isHidden) return null;

    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col items-center gap-y-4 p-3"
        >
            <div className="w-full">
                <ChatInfo
                    isDelayed={isDelayed}
                    isFollowersOnly={isFollowersOnly}
                />
                <Input
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    disabled={isDisabled}
                    placeholder="Send a message"
                    className={cn(
                        "border-white/10",
                        (isFollowersOnly || isDelayed) && "rounded-t-none border-t-0"
                    )}
                />
            </div>
            <div className="ml-auto">
                <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={isDisabled}
                >
                    Chat
                </Button>
            </div>
        </form>
    )
};


export const ChatFormSkeleton = () => {
    return (
        <div className="flex flex-col items-center gap-y-4 p-3">
            <Skeleton className="w-full h-10" />
            <div className="flex items-center gap-x-2 ml-auto">
                <Skeleton className="h-7 w-7" />
                <Skeleton className="h-7 w-12" />
            </div>

        </div>
    )
}