import { add_to_queue } from "@/api-wrapper";
import { Album } from "@/types/backend";
import {Card, Image, Link, Spinner} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface AlbumCardProps {
  album: Album,
}

export default function AlbumCard({ album }: AlbumCardProps) {

  let navigate = useNavigate();

  return (
    <Card className="flex-column p-4 items-center justify-items-center gap-4 h-80 w-64 min-h-80 min-w-64 max-h-96"
      fullWidth={false}
      isPressable={true}
      isHoverable={true}
      disableRipple={true}
      onPress={() => {
        navigate('/album/' + album.id);
      }}>
      <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={"/api/static/" + album.id + "/cover.jpg"}
          width={196}
          height={196}
      />
      <div className="w-full">
        <h4 className="w-full font-bold text-large text-start truncate">{ album.title }</h4>
        <h4 className="text-medium w-full text-start truncate"  color="foreground">{ album.artists[0].name }</h4>
      </div>
    </Card>
  );
}