import { FetcherMusic } from "@/types/backend";
import {Card, Image, Link, Spinner} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

interface FetcherMusicCardProps {
  fetcher_music: FetcherMusic,
  on_added?: Function
}

export default function FetcherMusicCard({ fetcher_music, on_added }: FetcherMusicCardProps) {

  const { isLoading, data, isError, refetch } = useQuery({
    queryKey: ['addquery_' + (fetcher_music.fetcher_id ?? (fetcher_music.title + fetcher_music.album_title))],
    enabled: false,
    refetchInterval: false,
    retry: false,
    queryFn: () =>
      fetch('/api/fetcher/ytmusic/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(fetcher_music)
      }).then((res) => {
          console.log(on_added);
          if (on_added) {
            on_added();
            on_added();
            on_added();
          }
          res.json()
        }
      ),
  });

  return (
    <Card className="flex-row p-4 items-center justify-items-center gap-4"
      fullWidth={true}
      isPressable={!isLoading}
      isHoverable={true}
      disableRipple={true}
      id={fetcher_music.title}
      onPress={() => {
        if (!isLoading) {
          refetch()
        }
      }}>
      <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://heroui.com/images/hero-card-complete.jpeg"
          width={60}
          height={60}
      />
      <div>
        <h4 className="font-bold text-large text-start">{ fetcher_music.title }</h4>
        <Link className="text-medium text-start w-full" underline="hover" color="foreground">{ fetcher_music.artists[0].name }</Link>
      </div>
      {isLoading &&
        <Spinner></Spinner>
      }
      <Link className="ml-auto text-medium" underline="hover" color="foreground">{ fetcher_music.album_title }</Link>
      <h4 className="text-medium">1:00</h4>
    </Card>
  );
}

/*<h4 className="font-bold text-large">Frontend Radio</h4>
<p className="text-tiny uppercase font-bold">Daily Mix</p>
<small className="text-default-500">12 Tracks</small>
*/