"use server"


import { db } from "@/lib/db";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { revalidatePath } from "next/cache";

export const regenerateSignedUrl = async (username: string) => {
    const s3 = new S3Client({
        region: process.env.AWS_DEFAULT_REGION as string,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
        },
    })

    const getCommand = new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: `thumbnail-stream-${username}` });
    const url = await getSignedUrl(s3, getCommand, { expiresIn: 60 * 60 * 24 });
    const user = await db.user.findUnique({
        where: {
            username
        },
        select: {
            id: true
        }
    });
    if (!user) return;
    await db.stream.update({
        where: {
            userId: user.id
        },
        data: {
            thumbnailUrl: url
        }
    })
    revalidatePath("/");
    revalidatePath(`/u/${username}`);
    revalidatePath(`/${username}`);
    return;
}