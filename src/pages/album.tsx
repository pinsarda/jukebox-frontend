import DefaultLayout from "@/layouts/default";
import MusicCard from "@/components/music-card";
import ArtistCard from "@/components/artist-card";
import { Music, Artist, Album } from "@/types/musics";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Card, Skeleton, Spinner } from "@heroui/react";

export default function AlbumPage() {

  const { id } = useParams();

  let album: Album;

  const { isLoading, data } = useQuery({
    queryKey: ['musics', id],
    queryFn: () =>
      fetch('/api/album/metadata?' + new URLSearchParams({
            id: id ?? ''
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

    album = data;
  };


  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
        <div className="w-full justify-items-center flex">
            {!isLoading && 
                <div className="w-full justify-items-center m-2 space-y-2">
                    {data.musics.map((music: Music) => (
                        <MusicCard music={music} />
                    ))}
                </div>
            }
            {isLoading && 
                <Spinner className="w-full"></Spinner>
            }
        </div>
      </section>
    </DefaultLayout>
  );
}