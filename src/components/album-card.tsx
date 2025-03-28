import { Card, Image } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { Album } from "@/types/backend";

interface AlbumCardProps {
  album: Album;
}

export default function AlbumCard({ album }: AlbumCardProps) {
  let navigate = useNavigate();

  return (
    <Card
      className="flex-column p-4 items-center justify-items-center gap-4 h-80 w-64 min-h-80 min-w-64 max-h-96"
      disableRipple={true}
      fullWidth={false}
      isHoverable={true}
      isPressable={true}
      onPress={() => {
        navigate("/album/" + album.id);
      }}
    >
      <Image
        alt="Card background"
        className="object-cover rounded-xl"
        height={196}
        src={"/api/static/" + album.id + "/cover.jpg"}
        width={196}
      />
      <div className="w-full">
        <h4 className="w-full font-bold text-large text-start truncate">
          {album.title}
        </h4>
        <h4
          className="text-medium w-full text-start truncate"
          color="foreground"
        >
          {album.artists[0].name}
        </h4>
      </div>
    </Card>
  );
}
