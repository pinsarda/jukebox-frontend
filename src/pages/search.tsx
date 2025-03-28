import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ScrollShadow, Spinner } from "@heroui/react";

import DefaultLayout from "@/layouts/default";
import MusicCard from "@/components/music-card";
import { Music, Artist, Album, FetcherMusic } from "@/types/backend";
import FetcherMusicCard from "@/components/fetcher-music-card";
import AlbumCard from "@/components/album-card";

export default function SearchPage() {
  const { query } = useParams();

  let musics: Music[] = [];
  let artists: Artist[] = [];
  let albums: Album[] = [];

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["musics", query],
    queryFn: () =>
      fetch(
        "/api/search?" +
          new URLSearchParams({
            query: query ?? "",
          }).toString(),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      ).then((res) => res.json()),
  });

  if (data) {
    musics = data.musics;
    artists = data.artists;
    albums = data.albums;
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
        <div className="w-full justify-items-center flex-column">
          {/* {artists.length != 0 &&
              <ArtistCard artist={ artists[0] } />
            } */}
          <div className="w-full justify-items-center m-2 space-y-2">
            {musics.map((music) => (
              <MusicCard key={music.id} music={music} />
            ))}
          </div>
          <ScrollShadow
            className="flex flex-row m-2 p-4 gap-2 overflow-scroll"
            orientation="horizontal"
          >
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </ScrollShadow>
        </div>
        <div>
          <h1 className="text-center text-large font-bold mb-5">
            Récupération depuis Youtube
          </h1>
          <FetcherSearch on_added={refetch} />
        </div>
      </section>
    </DefaultLayout>
  );
}

interface FetcherSearchProps {
  on_added?: Function;
}

function FetcherSearch({ on_added }: FetcherSearchProps) {
  const { query } = useParams();

  let fetcher_musics: FetcherMusic[] = [];

  const { isLoading, data } = useQuery({
    queryKey: ["fetcher", query],
    queryFn: () =>
      fetch(
        "/api/fetcher/ytmusic/search?" +
          new URLSearchParams({
            query: query ?? "",
          }).toString(),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      ).then((res) => res.json()),
  });

  if (data) {
    fetcher_musics = data;
  }

  if (isLoading) {
    return (
      <div className="w-full flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full justify-items-center m-2 space-y-2">
      {fetcher_musics.map((fetcher_music) => (
        <FetcherMusicCard
          key={fetcher_music.title}
          fetcher_music={fetcher_music}
          on_added={on_added}
        />
      ))}
    </div>
  );
}
