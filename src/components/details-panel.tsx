import { PlayerState } from "@/types/backend";
import { Card, Image } from "@heroui/react";
import { Queue } from "./queue";


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
                <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={"/api/static/" + 
                    state.queue[state.queue_index].album_id
                    + "/cover.jpg"}
                />
                <p className="self-center">Artist : {state.queue[state.queue_index].artists[0].name}</p>
                <Queue isLoading={isLoading} state={state}/>
            </div>
            }
        </Card>
    );
};
