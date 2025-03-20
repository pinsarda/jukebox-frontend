import { add_to_queue } from "@/api-wrapper";
import { Music } from "@/types/backend";
import {Card, Image, Link} from "@heroui/react";

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
        <Link className="text-medium text-start w-full" underline="hover" color="foreground" href={"/artist/" + music.artists[0].id }>{ music.artists[0].name }</Link>
      </div>
      <Link className="ml-auto text-medium" underline="hover" color="foreground" href={"/album/" + music.album_id }>{ music.album_title }</Link>
      <h4 className="text-medium">1:00</h4>
    </Card>
  );
}

/*<h4 className="font-bold text-large">Frontend Radio</h4>
<p className="text-tiny uppercase font-bold">Daily Mix</p>
<small className="text-default-500">12 Tracks</small>
*/