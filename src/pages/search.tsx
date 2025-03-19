import DefaultLayout from "@/layouts/default";
import Artist from "@/components/artist";
import Title from "@/components/title";

export default function SearchPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
        <div className="w-full justify-items-center flex">
            <Artist />
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