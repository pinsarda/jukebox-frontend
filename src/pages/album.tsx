import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Spinner } from "@heroui/react";

import DefaultLayout from "@/layouts/default";
import MusicCard from "@/components/music-card";
import { Music } from "@/types/backend";

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
            <div className="w-full justify-items-center m-2 space-y-2">
              {data.musics.map((music: Music) => (
                <MusicCard key={music.id} music={music} />
              ))}
            </div>
          )}
          {isLoading && <Spinner className="w-full" />}
        </div>
      </section>
    </DefaultLayout>
  );
}
