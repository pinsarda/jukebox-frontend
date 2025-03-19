import { add_to_queue } from "@/api-wrapper";
import { Music } from "@/types/musics";
import {Card, Image} from "@heroui/react";

interface MusicCardProps {
  music: Music,
}

export default function MusicCard({ music }: MusicCardProps) {

  

  return (
    <Card className="flex-row p-4 items-center justify-items-center gap-4"
      fullWidth={true}
      isPressable={true}
      isHoverable={true}
      disableRipple={true}
      onPress={() => {
        add_to_queue({ id : music.id });
      }}>
      <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://heroui.com/images/hero-card-complete.jpeg"
          width={60}
          height={60}
      />
      <div>
        <h4 className="font-bold text-large text-start">{ music.title }</h4>
        <h4 className="text-medium text-start">{ music.artists[0].name }</h4>
      </div>
      <h4 className="ml-auto text-medium">{ music.album_title }</h4>
      <h4 className="text-medium">1:00</h4>
    </Card>
  );
}

/*<h4 className="font-bold text-large">Frontend Radio</h4>
<p className="text-tiny uppercase font-bold">Daily Mix</p>
<small className="text-default-500">12 Tracks</small>
*/