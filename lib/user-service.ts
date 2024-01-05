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
            include: {
                stream: true
            }
        });
    }
    else if (fieldName === "id") {
        user = await db.user.findUnique({
            where: {
                id: fieldValue
            },
            include: {
                stream: true
            }
        });
    }
    else if (fieldName === "externalId") {
        user = await db.user.findUnique({
            where: {
                externalUserId: fieldValue
            },
            include: {
                stream: true
            }
        });
    }
    else {
        throw new Error("invalid field")
    }
    return user;
}