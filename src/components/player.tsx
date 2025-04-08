import React, { useEffect, useMemo } from "react";
import {
  Card,
  CardBody,
  Button,
  Slider,
  Link,
  SliderValue,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import prettyMilliseconds from "pretty-ms";

import {
  HeartIcon,
  NextIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  PreviousIcon,
  RepeatOneIcon,
  ShuffleIcon,
} from "@/components/icons";
import {
  add_favorite_music,
  next,
  pause,
  play,
  previous,
  remove_favorite_music,
  seek,
} from "@/api-wrapper";
import { PlayerState } from "@/types/backend";
import { socket } from "@/websocket";

export default function Player() {
  const [value, setValue] = React.useState<SliderValue>(0);
  const [isDragging, setIsDragging] = React.useState(false);

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["state"],
    queryFn: () =>
      fetch("/api/player/state", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
  });

  useMemo(() => {
    socket.addEventListener("message", (event) => {
      console.log(event);
      refetch();
    });
  }, []);

  let state: PlayerState = data;
  let empty = !isLoading && state.queue.length == 0;

  useEffect(() => {
    if (state) {
      console.log(state.current_pos);
      setValue(state.current_pos);
    }
  }, [state]);

  const sliderValueToNumber = (value: number | number[]) => {
    if (Array.isArray(value)) {
      return value[0];
    } else {
      return value;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading && !isDragging && state.is_playing) {
        let tmp = sliderValueToNumber(value);

        if (tmp < state.queue[state.queue_index].duration) {
          setValue(tmp + 100);
        } else {
          refetch();
        }
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [value, state, isDragging]);

  return (
    <Card
      isBlurred
      className="w-full border-none bg-background/60 dark:bg-default-100/50"
      shadow="sm"
    >
      <CardBody>
        <div className="gap-6 md:gap-4 items-center justify-center">
          <div className="flex flex-col col-span-6 md:col-span-8">
            {!isLoading && (
              <div className="flex items-start">
                <div className="w-1/4 flex flex-col gap-0">
                  <h3 className="font-semibold text-foreground/90">
                    {!empty ? state.queue[state.queue_index].title : "---"}
                  </h3>
                  <Link
                    className="text-medium text-start w-full"
                    color="foreground"
                    href={
                      "/album/" +
                      (!empty ? state.queue[state.queue_index].album_id : "0")
                    }
                    isDisabled={empty}
                    underline="hover"
                  >
                    {!empty
                      ? state.queue[state.queue_index].album_title
                      : "----"}
                  </Link>
                  <Link
                    className="text-medium text-start w-full"
                    color="foreground"
                    href={
                      "/artist/" +
                      (!empty &&
                      state.queue[state.queue_index].artists.length > 0
                        ? state.queue[state.queue_index].artists[0].id
                        : "0")
                    }
                    isDisabled={empty}
                    underline="hover"
                  >
                    {!empty
                      ? state.queue[state.queue_index].artists[0].name
                      : "---"}
                  </Link>
                </div>

                <div className="w-1/2 self-center">
                  <div className="flex flex-col mt-3 gap-1 w-full">
                    <Slider
                      aria-label="Music progress"
                      color="primary"
                      defaultValue={33}
                      maxValue={
                        !empty ? state.queue[state.queue_index].duration : 1
                      }
                      size="sm"
                      value={value}
                      onChange={(value) => {
                        setValue(value);
                        setIsDragging(true);
                      }}
                      onChangeEnd={(value) => {
                        setIsDragging(false);
                        setValue(sliderValueToNumber(value));
                        seek(sliderValueToNumber(value));
                      }}
                    />
                    <div className="flex justify-between">
                      <p className="text-small">
                        {prettyMilliseconds(sliderValueToNumber(value), {
                          colonNotation: true,
                        })}
                      </p>
                      <p className="text-small text-foreground/50">
                        {prettyMilliseconds(
                          sliderValueToNumber(
                            !empty
                              ? state.queue[state.queue_index].duration
                              : 1,
                          ),
                          { colonNotation: true },
                        )}
                      </p>
                    </div>

                    <div className="flex w-full items-center justify-center">
                      <Button
                        isIconOnly
                        className="data-[hover]:bg-foreground/10"
                        radius="full"
                        variant="light"
                      >
                        <RepeatOneIcon className="text-foreground/80" />
                      </Button>
                      <Button
                        isIconOnly
                        className="data-[hover]:bg-foreground/10"
                        radius="full"
                        variant="light"
                        onPress={() => {
                          previous();
                          refetch();
                        }}
                      >
                        <PreviousIcon />
                      </Button>
                      <Button
                        isIconOnly
                        className="w-auto h-auto data-[hover]:bg-foreground/10"
                        radius="full"
                        variant="light"
                        onPress={() => {
                          switch (state.is_playing) {
                            case false:
                              play();
                              break;
                            case true:
                              pause();
                              break;
                          }
                          refetch();
                        }}
                      >
                        {empty && <PauseCircleIcon size={54} />}
                        {!empty && state.is_playing && (
                          <PauseCircleIcon size={54} />
                        )}
                        {!empty && !state.is_playing && (
                          <PlayCircleIcon size={54} />
                        )}
                      </Button>
                      <Button
                        isIconOnly
                        className="data-[hover]:bg-foreground/10"
                        radius="full"
                        variant="light"
                        onPress={() => {
                          next();
                          refetch();
                        }}
                      >
                        <NextIcon />
                      </Button>
                      <Button
                        isIconOnly
                        className="data-[hover]:bg-foreground/10"
                        radius="full"
                        variant="light"
                      >
                        <ShuffleIcon className="text-foreground/80" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="w-1/4 flex justify-end">
                  <Button
                    isIconOnly // vérifier que ça ne bloque pas l'utilisabilité du "play button"
                    className="text-default-900/60 data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                    onPress={async () => {
                      if (!empty) {
                        if (state.queue[state.queue_index].is_favorited) {
                          remove_favorite_music(
                            state.queue[state.queue_index].id,
                          ).then(() => {
                            refetch();
                          });
                        } else {
                          add_favorite_music(
                            state.queue[state.queue_index].id,
                          ).then(() => {
                            refetch();
                          });
                        }
                      }
                    }}
                  >
                    <HeartIcon
                      className={
                        (
                          !empty
                            ? state.queue[state.queue_index].is_favorited
                            : false
                        )
                          ? "[&>path]:stroke-transparent"
                          : ""
                      }
                      fill={
                        (
                          !empty
                            ? state.queue[state.queue_index].is_favorited
                            : false
                        )
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
