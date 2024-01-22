"use client"

import { useAuth } from "@clerk/nextjs";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export const UploadDropZone = () => {
    const { userId } = useAuth();
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const body = new FormData();
        acceptedFiles.forEach((file) => {

            body.append("file", file, `thumbnail-${userId}`);
        });
        const res = await fetch("http://localhost:3000/api/s3/upload", { body, method: "POST" });
        const resBody = await res.json();
        console.log(resBody);
    }, [])
    // TODO: configure the input to accept a max size and a file type and use on drop on save!
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and Drop files</p>
        </div>
    )
}