import { StreamPlayer } from "@/components/stream-player";
import { getUserByField } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs";

interface CreatorPageProps {
    params: {
        username: string;
    }
}

const CreaterPage = async ({ params }: CreatorPageProps) => {
    const externalUser = await currentUser();
    const user = await getUserByField({ fieldName: "username", fieldValue: params.username });

    if (!user || user?.externalUserId !== externalUser?.id || !user.stream) throw new Error("Unauthorized");

    return (
        <div className="h-full">
            <StreamPlayer
                user={user}
                stream={user.stream}
                isFollowing={true}
            />
        </div>
    );
}

export default CreaterPage;