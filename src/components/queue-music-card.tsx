import { Card, Image, Link, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import prettyMilliseconds from "pretty-ms";

import { Music } from "@/types/backend";
import { add_to_queue } from "@/api-wrapper";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

interface QueueMusicCardProps {
  music: Music;
  highlighted?: boolean;
}

export default function QueueMusicCard({ music, highlighted = false }: QueueMusicCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: music.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <button ref={setNodeRef} className="w-full" style={style} {...listeners} {...attributes}
      onClick={() => {
        
      }}>
      <Card
        className={`flex-row p-4 items-center justify-items-center gap-4 ${highlighted ? 'bg-primary-50' : ''}`}
        disableRipple={true}
        fullWidth={true}
        isHoverable={true}
        isPressable={false}
      >
        <Image
          alt="Card background"
          className="object-cover rounded-xl min-w-14 min-h-14"
          height={56}
          src={"/api/static/" + music.album_id + "/cover.jpg"}
          width={56}
        />
        <h4 className="font-bold text-large w-full text-start">{music.title}</h4>
        <h4 className="text-medium text-end">
          {prettyMilliseconds(music.duration, { colonNotation: true })}
        </h4>
      </Card>
    </button>
  );
}

/*<h4 className="font-bold text-large">Frontend Radio</h4>
<p className="text-tiny uppercase font-bold">Daily Mix</p>
<small className="text-default-500">12 Tracks</small>
*/
