import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Button, Link, Spinner } from "@heroui/react";
import { Image, Divider } from "@heroui/react";

import DefaultLayout from "@/layouts/default";
import MusicCard from "@/components/music-card";
import { Artist, Music } from "@/types/backend";
import { AppleIcon, DeezerIcon, HeartIcon, PlayCircleIcon, SpotifyIcon, YoutubeIcon } from "@/components/icons";

export default function AlbumPage() {
  const { id } = useParams();

  const { isLoading, data } = useQuery({
    queryKey: ["musics", id],
    queryFn: () =>
      fetch(
        "/api/album/metadata?" +
          new URLSearchParams({
            id: id ?? "",
          }).toString(),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      ).then((res) => res.json()),
  });

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
        <div className="w-full justify-items-center flex">
          {!isLoading && (
            <div className="w-full">
              <div className="flex space-x-4">
                <Image
                  alt="Card background"
                  className="rounded-xl w-80"
                  src={"/api/static/" + 
                    data.id
                      + "/cover.jpg"}
                />
                {/* Mockup */}
                <div>
                  <h1 className="text-2xl">{data.title}</h1>
                  <div className="flex flex-row">
                    {/* to improve : */}
                    {data.artists.map((artist: Artist) => (
                      <span key={artist.id}>
                        <Link underline="hover" color="foreground" key={artist.id} className="text-lg">{artist.name}</Link>
                      </span>
                    ))}
                  </div>
                  <Divider className="w-full mt-4 mb-4" />
                  <p>Ajouté par <Link underline="hover">Narcisse</Link></p>
                  <p>Passée 42 fois, dont 21 par vous. <Link isExternal showAnchorIcon underline="hover">Toutes les statistiques</Link></p>
                  <div className="flex flex-row items-center gap-3">
                    <Button
                      isIconOnly
                      className="w-auto h-auto data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                      onPress={() => {
                      }}
                    >
                      <PlayCircleIcon size={54} />
                    </Button>
                    <Button
                      isIconOnly
                      className="text-default-900/60 data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                    >
                      <HeartIcon
                        className={
                          (data.is_favorited)
                            ? "[&>path]:stroke-transparent"
                            : ""
                        }
                        fill={
                          (data.is_favorited)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </Button>
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
                </div>
              </div>
              <Divider className="w-full m-4" />
              {/* <h2 className="w-full text-center font-bold self-center">Musiques :</h2> */}
              <div className="w-full justify-items-center m-2 space-y-2">
                {data.musics.map((music: Music) => (
                  <MusicCard key={music.id} music={music} />
                ))}
              </div>
            </div>
          )}
          {isLoading && <Spinner className="w-full" />}
        </div>
      </section>
    </DefaultLayout>
  );
}
