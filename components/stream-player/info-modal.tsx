"use client";

import { ElementRef, useRef, useState, useTransition } from "react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { S3Image } from "../S3Image";
import { baseUrl } from "@/lib/utils";

interface InfoModalProps {
    initialName: string;
    initialThumbnailUrl: string | null;
    hostName: string
};

export const InfoModal = ({ initialName, initialThumbnailUrl, hostName }: InfoModalProps) => {
    const [name, setName] = useState(initialName);
    const [file, setFile] = useState<string | null>(null);
    const [fileBlob, setFileBlob] = useState<Blob | null>(null);
    const [isPending, startTransition] = useTransition();
    const closeRef = useRef<ElementRef<"button">>(null);

    const onDrop = async (acceptedFiles: Blob[]) => {
        if (acceptedFiles[0]) {
            setFileBlob(acceptedFiles[0])
            setFile(URL.createObjectURL(acceptedFiles[0]));
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            if (fileBlob) {
                const body = new FormData();
                body.append("file", fileBlob);
                fetch(`${baseUrl}/api/s3/upload`, { body, method: "POST" });
            }
            updateStream({ name })
                .then(() => {
                    toast.success("Stream updated");
                    closeRef?.current?.click();
                })
                .catch(() => toast.error("Something went wrong"))
        })
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="sm" className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit stream info
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-14">
                    <div className="space-y-2">
                        <Label>
                            Name
                        </Label>
                        <Input
                            placeholder="Stream name"
                            onChange={onChange}
                            value={name}
                            disabled={isPending}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Thumbnail</Label>
                        <div className="rounded-xl border outline-dashed outline-muted">
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <div className="relative w-full h-40">
                                    <S3Image src={file || initialThumbnailUrl} username={hostName} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            disabled={isPending}
                            variant="primary"
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}