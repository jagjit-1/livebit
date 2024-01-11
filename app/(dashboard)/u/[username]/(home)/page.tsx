import { StreamPlayer } from "@/components/stream-player";
import { getUserByField } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs";

interface CreatorPageProps {
    params: {
        username: string;
    }
}

const CreaterPage = async ({ params }: CreatorPageProps) => {
    const viewer = await currentUser();
    const host = await getUserByField({ fieldName: "username", fieldValue: params.username });

    if (!host || host?.externalUserId !== viewer?.id || !host.stream) throw new Error("Unauthorized");

    return (
        <div className="h-full">
            <StreamPlayer
                host={host}
                stream={host.stream}
                isFollowing
            />
        </div>
    );
}

export default CreaterPage;