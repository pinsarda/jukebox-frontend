import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Spinner } from "@heroui/react";

import DefaultLayout from "@/layouts/default";
import { Album } from "@/types/backend";
import AlbumCard from "@/components/album-card";

export default function ArtistPage() {
  const { id } = useParams();

  const { isLoading, data } = useQuery({
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
  });

  return (
    <DefaultLayout>
      <section className="flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
        <div className="w-full">
          {!isLoading && (
            <div className="gap-y-2 grid col-auto">
              {data.map((album: Album) => (
                <div className="w-fit">
                  <AlbumCard key={album.id} album={album} />
                </div>
              ))}
            </div>
          )}
          {isLoading && <Spinner className="w-full" />}
        </div>
      </section>
    </DefaultLayout>
  );
}
