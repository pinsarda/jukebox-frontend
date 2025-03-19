import DefaultLayout from "@/layouts/default";
import Title from "@/components/title";
import ArtistCard from "@/components/artist-card";

export default function SearchPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
        <div className="w-full justify-items-center flex">
            <ArtistCard artist={ {name : "Dummy artist"} } />
            <div className="w-full justify-items-center m-2 space-y-5">
                <Title />
                <Title />
                <Title />
                <Title />
            </div>
        </div>
      </section>
    </DefaultLayout>
  );
}