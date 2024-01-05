import { Play } from "lucide-react"
import { Button } from "../ui/button"



export const PausedVideo = () => {
    return (
        <div className="h-full flex flex-col space-y-4 justify-center bg-black items-center">
            <Button size="lg" variant="ghost" className="paddinghover:cursor-pointer text-primary">
                <Play className="h-15 w-15" />
            </Button>


        </div>
    )
}