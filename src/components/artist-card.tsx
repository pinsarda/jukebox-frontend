import { Artist } from "@/types/backend";
import {Card, CardHeader, CardBody, Image} from "@heroui/react";

interface ArtistCardProps {
  artist: Artist,
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Card className="py-4 w-5/12">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://heroui.com/images/hero-card-complete.jpeg"
            width={150}
            height={150}
        />
      </CardHeader>
      <CardBody className="overflow-visible py-2 px-4">
        <h4 className="font-bold text-3xl">{artist.name}</h4>
      </CardBody>
    </Card>
  );
}