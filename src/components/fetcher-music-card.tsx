import { Card, Image, Link, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import prettyMilliseconds from "pretty-ms";

import { FetcherMusic } from "@/types/backend";
import { Provider } from "@/api-wrapper";

interface FetcherMusicCardProps {
  fetcher_music: FetcherMusic;
  provider: Provider;
  on_added?: Function;
}

export default function FetcherMusicCard({
  fetcher_music,
  provider,
  on_added,
}: FetcherMusicCardProps) {
  const { isLoading, data, isError, refetch } = useQuery({
    queryKey: [
      "addquery_" +
        (fetcher_music.fetcher_id ??
          fetcher_music.title + fetcher_music.album_title),
    ],
    enabled: false,
    refetchInterval: false,
    retry: false,
    queryFn: () =>
      fetch("/api/fetcher/" + provider.id + "/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fetcher_music),
      }).then((res) => {
        if (on_added) {
          on_added();
        }
        res.json();
      }),
  });

  return (
    <Card
      className="flex-row p-4 items-center justify-items-center gap-4"
      disableRipple={true}
      fullWidth={true}
      id={fetcher_music.title}
      isHoverable={true}
      isPressable={!isLoading}
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
        src={
          fetcher_music.thumb_url ??
          "https://heroui.com/images/hero-card-complete.jpeg"
        }
        width={60}
      />
      <div>
        <h4 className="font-bold text-large text-start">
          {fetcher_music.title}
        </h4>
        <Link
          className="text-medium text-start w-full"
          color="foreground"
          underline="hover"
        >
          {fetcher_music.artists[0].name}
        </Link>
      </div>
      {isLoading && <Spinner />}
      <Link
        className="ml-auto text-medium"
        color="foreground"
        underline="hover"
      >
        {fetcher_music.album_title}
      </Link>
      <h4 className="text-medium">
        {prettyMilliseconds(fetcher_music.duration, { colonNotation: true })}
      </h4>
    </Card>
  );
}

/*<h4 className="font-bold text-large">Frontend Radio</h4>
<p className="text-tiny uppercase font-bold">Daily Mix</p>
<small className="text-default-500">12 Tracks</small>
*/
