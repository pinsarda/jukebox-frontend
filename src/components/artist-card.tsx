import { Card, Image } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { Artist } from "@/types/backend";

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  let navigate = useNavigate();

  return (
    <Card
      className="flex-column p-4 items-center justify-items-center gap-4 h-80 w-64 min-h-80 min-w-64 max-h-96"
      disableRipple={true}
      fullWidth={false}
      isHoverable={true}
      isPressable={true}
      onPress={() => {
        navigate("/artist/" + artist.id);
      }}
    >
      <Image
        alt="Card background"
        className="object-cover rounded-full"
        height={196}
        src={"/api/static/artists/" + artist.id + ".jpg"}
        width={196}
      />
      <div className="w-full">
        <h4 className="w-full font-bold text-large text-start truncate">
          {artist.name}
        </h4>
      </div>
    </Card>
  );
}
