import DefaultLayout from "@/layouts/default";
import Title from "@/components/title";
import ArtistCard from "@/components/artist-card";
import { Music, Artist, Album } from "@/types/musics";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function SearchPage() {

  const { query } = useParams();

  let musics: Music[] = [];
  let artists: Artist[] = [];
  let albums: Album[] = [];

  let artist: Artist = {
    name: "tmp"
  };

  const { isLoading, data } = useQuery({
    queryKey: ['musics'],
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
    console.log(data);

    if (data.artists.length > 0) {
      artist = data.artists[0];
    }

    musics = (data.musics.map((music: {
      album_title: any;
      artists: any; title: any; 
    }) => (
      {
        title: music.title,
        artist: {name: music.artists[0].name},
        album: {title: music.album_title}
      }
    )))
  };



  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
        <div className="w-full justify-items-center flex">
            <ArtistCard artist={ artist } />
            <div className="w-full justify-items-center m-2 space-y-5">
                {musics.map((music) => (
                  <Title music={music} />
                ))}
            </div>
        </div>
      </section>
    </DefaultLayout>
  );
}