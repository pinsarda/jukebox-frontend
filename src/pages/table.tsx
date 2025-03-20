import { useQuery } from "@tanstack/react-query";

import DefaultLayout from "@/layouts/default";
import MusicsTable from "@/components/music-table";
import { Music } from "@/types/backend";

export default function TablePage() {
  let musics: Music[] = [];

  const { isLoading, data } = useQuery({
    queryKey: ['musics'],
    queryFn: () =>
      fetch('/api/album/metadata?id=1', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) =>
        res.json(),
      ),
  });

  if (data) {
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
        <div className="inline-block text-center justify-center w-full">
          <MusicsTable isLoading={isLoading} musics={musics}/>
        </div>
      </section>
    </DefaultLayout>
  );
}
