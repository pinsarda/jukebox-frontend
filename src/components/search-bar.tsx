import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { useState } from "react";

import { SearchIcon } from "@/components/icons";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { getProvider, lastfm_provider, Provider, youtube_provider, ytmusic_provider } from "@/api-wrapper";

export const SearchBar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const provider_id = searchParams.get("provider") ?? "ytmusic";
  const [provider, setProvider] = useState<Provider>(getProvider(provider_id));

  const handleKeyPress = (e: { key: string }) => {
    if (e.key == "Enter" && value != "") {
      navigate("/search?" + new URLSearchParams({
        query: value,
        provider: provider.id
      }).toString(),);
    }
  };

  return (
    <div className="flex flex-row gap-2">
      <Input
        aria-label="Search"
        className="w-full"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        endContent={
          <Kbd className="hidden lg:inline-block" keys={["command"]}>
            K
          </Kbd>
        }
        labelPlacement="outside"
        placeholder="Search..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={handleKeyPress}
      />
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
