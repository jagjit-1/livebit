"use client"

import { useTransition } from "react";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { onBlock, onUnblock } from "@/actions/block";

interface ActionsProp {
    isFollowing: boolean,
    userId: string
}

export const Actions = ({ userId, isFollowing }: ActionsProp) => {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`Started following ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"))
        });
    }
    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => toast.success(`Unfollowed ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"));
        });
    }

    const handleUnblock = () => {
        startTransition(() => {
            onBlock(userId)
                .then((data) => toast.success(`Blocked ${data.blocked.username}`))
                .catch((err) => console.log(err))
        });
    }
    return (
        <div className="flex flex-col gap-y-2">
            <Button disabled={isPending || isFollowing} onClick={handleFollow} variant="primary">
                Follow
            </Button>
            <Button disabled={isPending} onClick={handleUnblock} variant="primary">
                Unblock
            </Button>
        </div>
    )
}