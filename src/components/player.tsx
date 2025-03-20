import React from "react";
import {Card, CardBody, Button, Slider, Link} from "@heroui/react";
import {HeartIcon, NextIcon, PauseCircleIcon, PlayCircleIcon, PreviousIcon, RepeatOneIcon, ShuffleIcon} from "@/components/icons";
import { next, pause, play, previous } from "@/api-wrapper";
import { useQuery } from "@tanstack/react-query";
import { PlayerState } from "@/types/musics";

export default function Player() {

  var retry = true;

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['state', retry],
    queryFn: () =>
      fetch('/api/player/state?', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) =>
        res.json(),
      ),
  });

  let state: PlayerState = data;
  let empty = !isLoading && (state.queue.length == 0)

  return (
    <Card
      isBlurred
      className="w-full border-none bg-background/60 dark:bg-default-100/50"
      shadow="sm"
    >
      <CardBody>
        <div className="gap-6 md:gap-4 items-center justify-center">
          <div className="flex flex-col col-span-6 md:col-span-8">

          { !isLoading && (
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90">{ state.queue[state.queue_index].title ?? '---' }</h3>
                <Link className="text-medium text-start w-full" isDisabled={empty} underline="hover" color="foreground"
                  href={"/album/" + (state.queue[state.queue_index].album_id ?? '0') }>
                  { state.queue[state.queue_index].album_title ?? '----' }
                </Link>
                <Link className="text-medium text-start w-full" isDisabled={empty} underline="hover" color="foreground"
                  href={"/artist/" + (state.queue[state.queue_index].artists[0].id ?? '0') }>
                  { state.queue[state.queue_index].artists[0].name ?? '---' }
                </Link>
                <h1 className="text-small text-foreground/80">
                  
                </h1>
              </div>

              <div className="w-4/5 self-center">
                <div className="flex flex-col mt-3 gap-1 w-full">

                  <Slider
                    aria-label="Music progress"
                    classNames={{
                      track: "bg-default-500/30",
                      thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                    }}
                    color="foreground"
                    defaultValue={33}
                    size="sm"
                  />
                  <div className="flex justify-between">
                    <p className="text-small">1:23</p>
                    <p className="text-small text-foreground/50">4:32</p>
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
                      onPress={() => { previous(); refetch(); }}
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
                      {state.is_playing && 
                        <PauseCircleIcon size={54} />
                      }
                      {!state.is_playing && 
                        <PlayCircleIcon size={54} />
                      }
                    </Button>
                    <Button
                      isIconOnly
                      className="data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                      onPress={() => { next(); refetch(); }}
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
              <Button
                isIconOnly  // vérifier que ça ne bloque pas l'utilisabilité du "play button"
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                // onPress={() => setLiked((v) => !v)}
              >
                <HeartIcon
                  className={(!empty ? state.queue[state.queue_index].is_favorited : false) ? "[&>path]:stroke-transparent" : ""}
                  fill={(!empty ? state.queue[state.queue_index].is_favorited : false) ? "currentColor" : "none"}
                  // className={true ? "[&>path]:stroke-transparent" : ""}
                  // fill={true ? "currentColor" : "none"}
                />
              </Button>
            </div>
          )}

          </div>
        </div>
      </CardBody>
    </Card>
  );
}