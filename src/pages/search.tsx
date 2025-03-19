import DefaultLayout from "@/layouts/default";
import Title from "@/components/music-card";
import ArtistCard from "@/components/artist-card";
import { Music, Artist, Album } from "@/types/musics";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function SearchPage() {

  const { query } = useParams();

  let musics: Music[] = [];
  let artists: Artist[] = [];
  let albums: Album[] = [];

  const { isLoading, data } = useQuery({
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
    console.log(data);

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