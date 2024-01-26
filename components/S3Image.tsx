"use client";

import { regenerateSignedUrl } from "@/actions/s3";
import { cn } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useState, useTransition } from "react";

interface S3ImageProps {
    username: string;
    onError?: () => any;
    className?: string
    src: string | null;
}

export const S3Image = ({ username, onError, className, src }: S3ImageProps) => {
    const [error, setError] = useState(false);
    const [isPending, startTransition] = useTransition();

    const regenerationError = () => {
        setError(true);
        if (onError) onError();
    }

    const handleImageError = () => {
        startTransition(() => {
            regenerateSignedUrl(username).catch(regenerationError);
        })
    }

    if (isPending || error) {
        return (
            <div>
                its loading bitch
            </div>
        )
    }
    return (
        <Image onError={handleImageError} src={src || ""} fill alt="Thumbnail" className={cn(className)} />
    )

}