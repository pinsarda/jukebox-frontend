import React from "react";

import DefaultLayout from "@/layouts/default";
import MusicsTable from "@/components/music-table";
import { Music } from "@/types/musics";

export default function TablePage() {
  const [musics, setMusics] = React.useState<Music[]>([])

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
        <div className="inline-block text-center justify-center w-full">
          <MusicsTable musics={musics}/>
        </div>
      </section>
    </DefaultLayout>
  );
}
