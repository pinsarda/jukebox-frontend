import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { Key, useMemo, useState } from "react";

import { SearchIcon } from "@/components/icons";
import { Autocomplete, AutocompleteItem, AutocompleteSection, Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { add_to_queue, getProvider, lastfm_provider, Provider, youtube_provider, ytmusic_provider } from "@/api-wrapper";
import { useQuery } from "@tanstack/react-query";
import { Album, Artist, Music, SearchResult } from "@/types/backend";

export const SearchBar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const provider_id = searchParams.get("provider") ?? "ytmusic";
  const [provider, setProvider] = useState<Provider>(getProvider(provider_id));

  const handleKeyPress = (e: { key: string }) => {
    if (e.key == "Enter" && value != "" && search_results.musics.length == 0 && search_results.albums.length == 0 && search_results.artists.length == 0) {
      navigate("/search?" + new URLSearchParams({
        query: value,
        provider: provider.id
      }).toString(),);
    }
  };

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["musics", value],
    queryFn: () =>
      fetch(
        "/api/search?" +
          new URLSearchParams({
            query: value,
          }).toString(),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      ).then((res) => res.json()),
  });

  const search_results: SearchResult = isLoading ? {
    musics: [],
    albums: [],
    artists: []
  } : data;

  const handleSelectionChange = (e: Key | null) => {
    if (e !== null) {
      const match = String(e).match(/^(\D+)\s+(\d+)$/);

      if (!match) {
        throw new Error('Invalid ID format');
      }

      const type = match[1];
      const id = parseInt(match[2], 10);

      switch (type) {
        case 'Music':
          add_to_queue({ id });
          break;
        case 'Album':
          navigate("/album/" + id);
          break;
        case 'Artist':
          navigate("/artist/" + id);
          break;
      };

      setValue("");
    }
  };

  return (
    <div className="flex flex-row gap-2 w-4/5">
      <Autocomplete
        className="w-full"
        placeholder="Search..."
        inputValue={value}
        onInputChange={(e) => {
          setValue(e);
          refetch();
        }}
        onKeyDown={handleKeyPress}
        onSelectionChange={handleSelectionChange}
      >
        <>
        {search_results.musics.length > 0 && (
          <AutocompleteSection showDivider title="Musiques">
            {search_results.musics.map((music: Music) => (
              <AutocompleteItem key={"Music " + music.id} textValue={music.title}>
                <div className="flex gap-2 items-center">
                  <Avatar radius="sm" alt={music.title} className="flex-shrink-0" size="sm" src={`/api/static/${music.album_id}/cover.jpg`} />
                  <div className="flex flex-col">
                    <span className="text-small">{music.title}</span>
                    <span className="text-tiny text-default-400">{music.artists[0].name}</span>
                  </div>
                </div>
              </AutocompleteItem>
            ))}
          </AutocompleteSection>
        )}
        {search_results.albums.length > 0 && (
          <AutocompleteSection showDivider title="Albums">
            {search_results.albums.map((album: Album) => 
              <AutocompleteItem key={"Album " + album.id} textValue={album.title}>
                <div className="flex gap-2 items-center">
                  <Avatar radius="sm" alt={album.title} className="flex-shrink-0" size="sm" src={"/api/static/" + album.id + "/cover.jpg"} />
                  <div className="flex flex-col">
                    <span className="text-small">{album.title}</span>
                    <span className="text-tiny text-default-400">{album.artists[0].name}</span>
                  </div>
                </div>
              </AutocompleteItem>
            )}
          </AutocompleteSection>
        )}
        {search_results.artists.length > 0 && (
          <AutocompleteSection showDivider title="Artistes">
            {search_results.artists.map((artist: Artist) => 
              <AutocompleteItem key={"Artist " + artist.id} textValue={artist.name}>
                <div className="flex gap-2 items-center">
                  <Avatar alt={artist.name} className="flex-shrink-0" src={"/api/static/artists/" + artist.id + ".jpg"} />
                  <div className="flex flex-col">
                    <span className="text-small">{artist.name}</span>
                  </div>
                </div>
              </AutocompleteItem>
            )}
          </AutocompleteSection>
        )}
        </>
      </Autocomplete>
      <Button isIconOnly variant="bordered">
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      </Button>
      <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="w-40">{provider.name}</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="ytmusic" onPress={() => {setProvider(ytmusic_provider)}}>{ytmusic_provider.name}</DropdownItem>
        <DropdownItem key="youtube" onPress={() => {setProvider(youtube_provider)}}>{youtube_provider.name}</DropdownItem>
        <DropdownItem key="lastfm"  onPress={() => {setProvider(lastfm_provider)}}>{lastfm_provider.name}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
  );
};
