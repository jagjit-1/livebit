import { notFound } from "next/navigation";

import { getUserByField } from "@/lib/user-service";
import { isFollowingUser } from "@/lib/follow-service";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";

interface UserPageProps {
    params: {
        username: string
    }
}

const UserPage = async ({ params }: UserPageProps) => {
    const host = await getUserByField({ fieldName: "username", fieldValue: params.username });

    if (!host || !host.stream) notFound();

    const isFollowing = await isFollowingUser(host.id);
    const isBlocked = await isBlockedByUser(host.id);

    if (isBlocked) notFound();

    return (
        <StreamPlayer
            host={host}
            stream={host.stream}
            isFollowing={isFollowing}
        />
    );
}

export default UserPage;