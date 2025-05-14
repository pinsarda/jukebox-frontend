import { Button, Card, Image, Link } from "@heroui/react";

import { AppleIcon, DeezerIcon, HeartIcon, PlayCircleIcon, SpotifyIcon, YoutubeIcon } from "@/components/icons";
import { useNavigate } from "react-router-dom";

import { Album } from "@/types/backend";
import { Fetcher, SourceType } from "@/types";

interface FetcherButtonProps {
    type: SourceType,
    fetcher: Fetcher,
    fetcher_id: String
}

export default function FetcherButton({ type, fetcher, fetcher_id }: FetcherButtonProps) {

    switch (fetcher) {
        case "yt_music":
            let url = "https://music.youtube.com/"
            switch (type) {
                case "album": 
                    url += "playlist?list=" + fetcher_id;
                    break;
            }

            console.log(url);

            return (
                <Button isIconOnly isExternal as={Link} aria-label="Go to YouTube Music" href={url}  color="default" variant="faded">
                    <YoutubeIcon />
                </Button>
            );
    }

    
}
