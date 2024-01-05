"use client"

import { useSidebar } from "@/store/use-sidebar"
import { Follow, Stream, User } from "@prisma/client"
import { UserItem, UserItemSkeleton } from "./user-item"
import { Skeleton } from "@/components/ui/skeleton"

interface FollowingProps {
    data: (Follow & { following: User & { stream: { isLive: boolean } | null } })[]
}

export const Following = ({ data }: FollowingProps) => {
    const collapsed = useSidebar(state => state.collapsed);
    if (!data || !data.length) return null;
    return (
        <div>
            {!collapsed && (
                <div className="pl-6 mb-4">
                    <p className="text-sm text-muted-foreground">
                        Following
                    </p>
                </div>
            )}
            <ul className="space-y-2">
                {data.map(user =>
                    <UserItem
                        username={user.following.username}
                        imageUrl={user.following.imageUrl}
                        key={user.following.id}
                        isLive={user.following.stream?.isLive}
                    />
                )}
            </ul>
        </div>
    )
};

export const FollowingSkeleton = () => {
    return (
        <ul className="pt-2 lg:pt-0">
            {[...Array(3)].map((_, i) => <UserItemSkeleton key={i} />)}
        </ul>
    )
}