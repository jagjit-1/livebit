import { db } from "./db";
import { getSelf } from "./auth-service";
import { getUserByField } from "./user-service";

export const isFollowingUser = async (id: string) => {
    try {
        const self = await getSelf();
        const otherUser = await db.user.findUnique({
            where: {
                id
            }
        });
        if (!otherUser) throw new Error("Invalid User Id");
        if (otherUser.id === self.id) return true;

        const existingFollow = await db.follow.findFirst({
            where: {
                followerId: self.id,
                followingId: otherUser.id
            }
        });

        return !!existingFollow;
    }
    catch {
        return false;
    }
};

export const followUser = async (id: string) => {
    const self = await getSelf();
    const otherUser = await getUserByField({ fieldName: "id", fieldValue: id });

    if (!otherUser) throw new Error("Invalid user Id");

    if (otherUser.id === self.id) throw new Error("Cannot follow self");

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id
        }
    });

    if (existingFollow) throw new Error("Already following");

    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id
        },
        include: {
            follower: true,
            following: true
        }
    });

    return follow;
};

export const unfollowUser = async (id: string) => {
    const self = await getSelf();
    const otherUser = await getUserByField({ fieldName: "id", fieldValue: id });

    if (!otherUser) throw new Error("User not found");

    if (otherUser.id === self.id) throw new Error("Cannot follow yourself");

    const existingUser = await db.follow.findUnique({
        where: {
            followerId_followingId: {
                followerId: self.id,
                followingId: otherUser.id
            }
        }
    });
    if (!existingUser) throw new Error("Cannot unfollow");
    const unfollowedUser = db.follow.delete({
        where: {
            followerId_followingId: {
                followerId: self.id,
                followingId: otherUser.id
            }
        },
        include: {
            following: true
        }
    });

    return unfollowedUser;
};

export const getFollowedUsers = async () => {
    try {
        const self = await getSelf();

        const followedUsers = await db.follow.findMany({
            where: {
                followerId: self.id,
                following: {
                    blocking: {
                        none: {
                            blockedId: self.id
                        }
                    }
                }
            },
            include: {
                following: {
                    include: {
                        stream: {
                            select: {
                                isLive: true
                            }
                        }
                    },
                },
            },
        });
        return followedUsers;
    } catch (error) {
        return [];
    }
}