import { isFollowingUser } from "@/lib/follow-service";
import { getUserByField } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

interface UserPageProps {
    params: {
        username: string
    }
}

const UserPage = async ({ params }: UserPageProps) => {
    const user = await getUserByField({ fieldName: "username", fieldValue: params.username });
    // improve this 404 weirdness
    
    if (!user) {
        notFound()
    }
    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);
    if (isBlocked) return notFound();
    

    return (
        <div className="flex flex-col gap-y-4">
            <div>{user.id}</div>
            <div>{user.username}</div>
            <div>is following: {`${isFollowing}`}</div> 
            <div>is blocked by this user :{`${isBlocked}`}</div>
            <Actions userId={user.id} isFollowing={isFollowing} />
        </div>
    );
}

export default UserPage;