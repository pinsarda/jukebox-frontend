import { useQueries } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Divider, Spinner, Image, Button } from "@heroui/react";

import DefaultLayout from "@/layouts/default";
import { Album } from "@/types/backend";
import AlbumCard from "@/components/album-card";
import { AppleIcon, DeezerIcon, SpotifyIcon, YoutubeIcon } from "@/components/icons";

export default function ArtistPage() {
  const { id } = useParams();

  const [artistQuery, albumQuery] = useQueries({
    queries: [
      {
        queryKey: ["artist_data", id],
        queryFn: () =>
          fetch(
            "/api/artist/metadata?" +
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
      },
      {
        queryKey: ["artist_albums", id],
        queryFn: () =>
          fetch(
            "/api/artist/get_albums?" +
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
      }
    ]
  });

  return (
    <DefaultLayout>
      <section className="flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
        <div className="w-full flex gap-y-3 flex-col">
          {!artistQuery.isLoading &&
            <div className="flex space-x-6">
              <Image
                  alt="Card background"
                  className="rounded-full w-80"
                  src={"/api/static/artists/" + 
                    artistQuery.data.id
                      + ".jpg"}
                />
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-4xl">{artistQuery.data.name}</h1>
                <p className="">{artistQuery.data.description}</p>
                <div className="flex flex-row gap-3">
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
          }
          <Divider className="w-full mt-4 mb-4" />
          <h1 className="font-bold text-large">Albums :</h1>
          {!albumQuery.isLoading && (
            <div className="gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {albumQuery.data.map((album: Album) => (
                <div className="w-fit">
                  <AlbumCard key={album.id} album={album} />
                </div>
              ))}
            </div>
          )}
          {albumQuery.isLoading && artistQuery.isLoading && <Spinner className="w-full" />}
        </div>
      </section>
    </DefaultLayout>
  );
}
