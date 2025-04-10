import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
} from "@/components/icons";
import { Logo } from "@/components/icons";
import { SearchBar } from "@/components/search-bar";
import { Image } from "@heroui/react";
import React from "react";

export const Navbar = () => {
  const [hasCustomLogo, setHasCustomLogo] = React.useState(true); 

  return (
    <HeroUINavbar maxWidth="full" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 w-fit">
          <Link
            className="flex justify-start items-center gap-2 w-14 mt-2"
            color="foreground"
            href="/"
          >
            {!hasCustomLogo ? <Logo />
            : <img src="/api/static/logo.svg" onError={() => {
                setHasCustomLogo(false);
              }}/>
            }
            {/* <p className="font-bold text-inherit">HackademINT</p> */}
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-4/5 sm:basis-full"
        justify="center"
      >
        <NavbarItem className="hidden w-full justify-center lg:flex">
          <SearchBar />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="flex basis-1"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      {/* <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent> */}

      <NavbarMenu>
        <SearchBar />
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
