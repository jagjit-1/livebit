import { db } from "./db";

type fieldName = "username" | "id" | "externalId";


interface GetUserByFieldProps {
    fieldValue: string,
    fieldName: fieldName,
    fieldSelect?: []
}

export const getUserByField = async ({ fieldName, fieldValue }: GetUserByFieldProps) => {
    // IMPROVE : search on giving dynamic query keys
    let user;
    if (fieldName === "username") {
        user = await db.user.findUnique({
            where: {
                username: fieldValue
            },
            select: {
                id: true,
                username: true,
                bio: true,
                externalUserId: true,
                imageUrl: true,
                stream: {
                    select: {
                        id: true,
                        isChatDelayed: true,
                        isChatEnabled: true,
                        isChatFollowersOnly: true,
                        isLive: true,
                        thumbnailUrl: true,
                        name: true
                    }
                },
                _count: {
                    select: {
                        followedBy: true
                    }
                }
            },
        });
    }
    else if (fieldName === "id") {
        user = await db.user.findUnique({
            where: {
                id: fieldValue
            },
            select: {
                id: true,
                username: true,
                bio: true,
                externalUserId: true,
                imageUrl: true,
                stream: {
                    select: {
                        id: true,
                        isChatDelayed: true,
                        isChatEnabled: true,
                        isChatFollowersOnly: true,
                        isLive: true,
                        thumbnailUrl: true,
                        name: true
                    }
                },
                _count: {
                    select: {
                        followedBy: true
                    }
                }
            },
        });
    }
    else if (fieldName === "externalId") {
        user = await db.user.findUnique({
            where: {
                externalUserId: fieldValue
            },
            select: {
                id: true,
                username: true,
                bio: true,
                externalUserId: true,
                imageUrl: true,
                stream: {
                    select: {
                        id: true,
                        isChatDelayed: true,
                        isChatEnabled: true,
                        isChatFollowersOnly: true,
                        isLive: true,
                        thumbnailUrl: true,
                        name: true
                    }
                },
                _count: {
                    select: {
                        followedBy: true
                    }
                }
            },
        });
    }
    else {
        throw new Error("invalid field")
    }
    return user;
}