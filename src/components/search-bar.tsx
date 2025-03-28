import { useNavigate } from "react-router-dom";
import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { useState } from "react";

import { SearchIcon } from "@/components/icons";

export const SearchBar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const handleKeyPress = (e: { key: string }) => {
    if (e.key == "Enter" && value != "") {
      navigate("/search/" + value);
    }
  };

  return (
    <Input
      aria-label="Search"
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
  );
};
