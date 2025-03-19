import { Music } from "@/types/musics";
import {Card, Image} from "@heroui/react";

interface MusicCardProps {
  music: Music,
}

export default function MusicCard({ music }: MusicCardProps) {

  

  return (
    <Card className="py-4 w-full h-12 flex-row pb-0 pt-2 px-4 items-start justify-items-center space-x-3">
      <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://heroui.com/images/hero-card-complete.jpeg"
          width={32.5}
          height={32.5}
      />
      <h4 className="font-bold text-large">{ music.title }</h4>
    </Card>
  );
}

/*<h4 className="font-bold text-large">Frontend Radio</h4>
<p className="text-tiny uppercase font-bold">Daily Mix</p>
<small className="text-default-500">12 Tracks</small>
*/