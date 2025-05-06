import { Music, PlayerState } from "@/types/backend";
import { Card, Image } from "@heroui/react";
import QueueMusicCard from "./queue-music-card";
import {DndContext} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';  
import {restrictToParentElement} from '@dnd-kit/modifiers';  
import { useEffect, useState } from "react";
import { move_music_in_queue } from "@/api-wrapper";


interface QueueProps {
    isLoading: boolean;
    state: PlayerState;
}

export const Queue = ({
    isLoading,
    state
  }: QueueProps) => {

    // We use a sort of caching for the queue so we don't want a weird behaviour with drag and drop
    const [queueItems, setQueueItems] = useState(state.queue);

    useEffect(() => {
        setQueueItems(state.queue);
    }, [state]);

    function handleDragEnd(event: any) {
        const {active, over} = event;

        if (active.id !== over.id) {
            const oldIndex = queueItems.findIndex(music => music.id === active.id);
            const newIndex = queueItems.findIndex(music => music.id === over.id);

            setQueueItems(arrayMove(queueItems, oldIndex, newIndex));
            move_music_in_queue(oldIndex, newIndex);
        }
    }
    

    return (
        <div>
            <DndContext
                onDragEnd={handleDragEnd}
                modifiers={[restrictToParentElement]}
            >
                <SortableContext 
                    items={queueItems}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="w-full justify-items-center m-2 space-y-2">
                        {queueItems.map((music: Music, index: number) => (
                            index != state.queue_index ? (
                                <QueueMusicCard key={music.id} music={music}/>
                            ) : (
                                <QueueMusicCard key={music.id} music={music} highlighted={true}/>
                            )
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};
