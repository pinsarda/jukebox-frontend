import DefaultLayout from "@/layouts/default";
import MusicCard from "@/components/music-card";
import ArtistCard from "@/components/artist-card";
import { Music, Artist, Album, FetcherMusic } from "@/types/backend";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Spinner } from "@heroui/react";
import FetcherMusicCard from "@/components/fetcher-music-card";

export default function SearchPage() {

  const { query } = useParams();

  let musics: Music[] = [];
  let artists: Artist[] = [];
  let albums: Album[] = [];

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['musics', query],
    queryFn: () =>
      fetch('/api/search?' + new URLSearchParams({
            query: query ?? ''
        }).toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) =>
        res.json(),
      ),
  });

  if (data) {
    musics = data.musics;
    artists = data.artists;
    albums = data.albums;
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
        <div className="w-full justify-items-center flex">
            {/* {artists.length != 0 &&
              <ArtistCard artist={ artists[0] } />
            } */}
            <div className="w-full justify-items-center m-2 space-y-2">
                {musics.map((music) => (
                  <MusicCard music={music} />
                ))}
            </div>
        </div>
        <div>
              <h1 className="text-center text-large font-bold mb-5">Récupération depuis Youtube</h1>
              <FetcherSearch on_added={refetch}></FetcherSearch>
            </div>
      </section>
    </DefaultLayout>
  );
}

interface FetcherSearchProps {
  on_added?: Function
}


function FetcherSearch({ on_added }: FetcherSearchProps) {

  const { query } = useParams();

  let fetcher_musics: FetcherMusic[] = [];

  const { isLoading, data } = useQuery({
    queryKey: ['fetcher', query],
    queryFn: () =>
      fetch('/api/fetcher/ytmusic/search?' + new URLSearchParams({
            query: query ?? ''
        }).toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) =>
        res.json(),
      ),
  });

  if (data) {
    fetcher_musics = data;
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center">
        <Spinner></Spinner>
      </div>)
  }

  return (
    <div className="w-full justify-items-center m-2 space-y-2">
      {fetcher_musics.map((fetcher_music) => (
        <FetcherMusicCard fetcher_music={fetcher_music} on_added={on_added} />
      ))}
    </div>
  );
}