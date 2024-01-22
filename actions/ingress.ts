"use server"

import {
    CreateIngressOptions,
    IngressAudioEncodingPreset,
    IngressClient,
    IngressInput,
    IngressVideoEncodingPreset,
    RoomServiceClient,
} from "livekit-server-sdk";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);


const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export const resetIngress = async (hostIdentity: string) => {
    const ingresses = await ingressClient.listIngress({
        roomName: hostIdentity,
    });
    const rooms = await roomService.listRooms([hostIdentity]);


    await Promise.all(
        rooms.map((room) => new Promise((resolve, reject) => {
            roomService.deleteRoom(room.name)
                .then(() => resolve(1))
                .catch(() => reject())
        }))
    );

    await Promise.all(
        ingresses.map(ingress => {
            if (ingress.ingressId) {
                return new Promise((resolve, reject) => {
                    ingressClient.deleteIngress(ingress.ingressId || "")
                        .then(() => resolve(1))
                        .catch(() => reject())
                })
            }
            return;
        })
    );


}

export const createIngress = async (ingressType: IngressInput) => {
    const self = await getSelf();

    // Reset existing connections
    await resetIngress(self.id);

    const options: CreateIngressOptions = {
        name: self.username,
        roomName: self.id,
        participantName: self.username,
        participantIdentity: self.id
    };

    if (ingressType === IngressInput.WHIP_INPUT) {
        options.bypassTranscoding = true;
    } else {
        options.video = {
            source: TrackSource.CAMERA,
            preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
        }
        options.audio = {
            source: TrackSource.MICROPHONE,
            preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
        }
    }
    const ingress = await ingressClient.createIngress(ingressType, options);

    if (!ingress || !ingress.url || !ingress.streamKey) throw new Error("Failed to create ingress");

    await db.stream.update({
        where: {
            userId: self.id
        },
        data: {
            ingressId: ingress.ingressId,
            streamKey: ingress.streamKey,
            serverUrl: ingress.url
        },
    });

    revalidatePath(`/u/${self.username}/keys`);
    return ingress;
}