import { Skeleton } from "@/components/ui/skeleton";
import { ToggleCardSkeleton } from "../_components/toggle-card";

const ChatLoadingPage = () => {
    return (
        <div className="p-6 space-y-4">

            <div className="mb-4">
                <h1 className="text-2xl font-bold">
                    Chat settings
                </h1>
            </div>
            <div className="space-y-4">
                <ToggleCardSkeleton />
                <ToggleCardSkeleton />
                <ToggleCardSkeleton />
            </div>
        </div>
    );
}

export default ChatLoadingPage;