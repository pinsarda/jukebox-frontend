import { Button, Card, Image, Link, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import prettyMilliseconds from "pretty-ms";

import { Music } from "@/types/backend";
import { add_to_queue } from "@/api-wrapper";
import { AppleIcon, DeezerIcon, SpotifyIcon, YoutubeIcon } from "./icons";

interface MusicCardProps {
  music: Music;
}

export default function MusicCard({ music }: MusicCardProps) {
  const { isLoading, data, isError, refetch } = useQuery({
    queryKey: ["addtoqueue_" + music.id],
    enabled: false,
    refetchInterval: false,
    retry: false,
    queryFn: () =>
      add_to_queue({ id: music.id }).then((res) => {
        res.json();
      }),
  });

  return (
    <Card
      className="flex-row p-4 items-center justify-items-center gap-4"
      disableRipple={true}
      fullWidth={true}
      isHoverable={true}
      isPressable={true}
      onPress={() => {
        if (!isLoading) {
          refetch();
        }
      }}
    >
      <Image
        alt="Card background"
        className="object-cover rounded-xl"
        height={60}
        src={"/api/static/" + music.album_id + "/cover.jpg"}
        width={60}
      />
      <div>
        <h4 className="font-bold text-large text-start">{music.title}</h4>
        <Link
          className="text-medium text-start w-full"
          color="foreground"
          href={"/artist/" + music.artists[0].id}
          underline="hover"
        >
          {music.artists[0].name}
        </Link>
      </div>
      <div className="flex gap-4 items-center">
      <Button isIconOnly aria-label="Go to YouTube" color="default" variant="faded">
        <YoutubeIcon />
      </Button>
      <Button isIconOnly aria-label="Go to Deezer" color="default" variant="faded">
        <DeezerIcon />
      </Button>
      <Button isIconOnly aria-label="Go to Spotify" color="default" variant="faded">
        <SpotifyIcon />
      </Button>
      <Button isIconOnly aria-label="Go to AppleMusic" color="default" variant="faded">
        <AppleIcon />
      </Button>
      </div>
      {isLoading && <Spinner />}
      <Link
        className="ml-auto text-medium"
        color="foreground"
        href={"/album/" + music.album_id}
        underline="hover"
      >
        {music.album_title}
      </Link>
      <h4 className="text-medium">
        {prettyMilliseconds(music.duration, { colonNotation: true })}
      </h4>
    </Card>
  );
}

/*<h4 className="font-bold text-large">Frontend Radio</h4>
<p className="text-tiny uppercase font-bold">Daily Mix</p>
<small className="text-default-500">12 Tracks</small>
*/
