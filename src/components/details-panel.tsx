import { PlayerState } from "@/types/backend";
import { Card, Image } from "@heroui/react";


interface DetailsPanelProps {
    isLoading: boolean;
    state: PlayerState;
}

export const DetailsPanel = ({
    isLoading,
    state
  }: DetailsPanelProps) => {

    let empty = !isLoading && state.queue.length == 0;

    return (
        
        <Card
            isBlurred
            className="h-full w-full border-none bg-background/60 dark:bg-default-100/50"
            shadow="sm"
        >
            {!isLoading && !empty && 
<div className="h-full flex p-4 flex-col gap-5 overflow-scroll">
{/* Album Cover Section */}
<div className="flex justify-center">
    <Image
        alt="Album cover"
        className="object-cover rounded-xl w-48 h-48"
        src={"/api/static/" + state.queue[state.queue_index].album_id + "/cover.jpg"}
    />
</div>

{/* Artist Info Section */}
<div className="flex flex-col items-center bg-black/60 text-white rounded-xl p-4 gap-4">
    <Image
        alt="Artist"
        className="object-cover rounded-full w-32 h-32"
        src={"/api/static/artists/" + state.queue[state.queue_index].artists[0].id + ".jpg"}
    />
    <p className="text-lg font-semibold text-center">
        {state.queue[state.queue_index].artists[0].name}
    </p>
    <p className="text-sm text-center">
        {state.queue[state.queue_index].artists[0].description}
    </p>
</div>
</div>
            }
        </Card>
    );
};
