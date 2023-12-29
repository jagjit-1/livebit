"use client"

import qs from "query-string";
import { FormEvent, useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export const Search = () => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!value) return;

        const url = qs.stringifyUrl({ url: "/search", query: { term: value } }, { skipEmptyString: true });
        router.push(url);
    }
    const onClear = () => {
        setValue("");
    }
    return (

        <form onSubmit={onSubmit} className="relative w-full lg:w-[400px] flex items-center">
            <Input
                placeholder="Search"
                value={value}
                onChange={e => setValue(e.target.value)}
                className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
            />
            {value && (
                <X
                    onClick={onClear}
                    className="absolute top-2.5 right-14 h-5 w-5 cursor-pointer text-muted-foreground hover:opacity-75 transition"
                />
            )}
            <Button className="rounded-l-none hover:opacity-75 transition" type="submit" size="sm" variant="secondary">
                <SearchIcon className="h-5 w-5 text-muted-foreground" />
            </Button>

        </form>

    )
}