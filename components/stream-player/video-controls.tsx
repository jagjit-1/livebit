import { Maximize, Minimize } from "lucide-react";
import { Hint } from "@/components/hint";

interface VideoControlsProps {
    isFullscreen: boolean;
    onToggle: () => void;
}

export const VideoControls = ({ isFullscreen, onToggle }: VideoControlsProps) => {
    const Icon = isFullscreen ? Minimize : Maximize;

    const label = isFullscreen ? "Exit Fullscreen" : "Enter fullscreen";
    return (
        <div className="flex w-full items-center justify-center gap-4">
            <div className="ml-auto">
                <Hint label={label} asChild>
                    <button
                        onClick={onToggle}
                        className="text-white p-1.5 hover:bg-white/10 rounded-lg"
                    >
                        <Icon className="h-5 w-5" />
                    </button>
                </Hint>
            </div>
        </div>
    )
}

