import { regenerateSignedUrl } from "@/actions/s3";
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import {
    GetObjectCommand,
    PutObjectCommand,
    S3Client
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { revalidatePath } from "next/cache";

const s3 = new S3Client({
    region: process.env.AWS_DEFAULT_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
})

export async function POST(req: Request) {
    const self = await getSelf();
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const Body = (await file.arrayBuffer()) as Buffer;

    const putcommand = new PutObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: `thumbnail-stream-${self.username}`, Body, ContentType: file.type });
    s3.send(putcommand);
    await regenerateSignedUrl(self.username);

    return Response.json({}, { status: 200 });
}