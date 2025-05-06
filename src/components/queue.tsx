import { Music, PlayerState } from "@/types/backend";
import { Card, Image } from "@heroui/react";
import LightMusicCard from "./light-music-card";


interface QueueProps {
    isLoading: boolean;
    state: PlayerState;
}

export const Queue = ({
    isLoading,
    state
  }: QueueProps) => {

    let empty = !isLoading && state.queue.length == 0;

    console.log(state)

    return (
        
        <div>
            <div className="w-full justify-items-center m-2 space-y-2">
                {state.queue.map((music: Music, index: number) => (
                    index != state.queue_index ? (
                        <LightMusicCard key={index} music={music}/>
                    ) : (
                        <LightMusicCard key={index} music={music} highlighted={true}/>
                    )
                ))}
            </div>
        </div>
    );
};
