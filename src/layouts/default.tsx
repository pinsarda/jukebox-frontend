import { Link } from "@heroui/link";

import { Navbar } from "@/components/navbar";
import Player from "@/components/player";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Slider } from "@heroui/react";
import { Button } from "@heroui/button";
import { DetailsPanel } from "@/components/details-panel";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { socket } from "@/websocket";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
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

  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <PanelGroup autoSaveId="example" direction="horizontal">
        {/* <Panel defaultSize={25} minSize={5} className="pl-2 pb-2">
          <DetailsPanel isLoading={isLoading} state={data}/>
        </Panel>
        <PanelResizeHandle /> */}
        <Panel className="h-full" style={{overflowY: "scroll"}}>
          <main className="container mx-auto max-w-7xl px-6 flex-grow overflow-y-visible">
            {children}
          </main>
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={25} collapsible minSize={15} maxSize={35} className="pr-2 pb-2">
          <DetailsPanel isLoading={isLoading} state={data}/>
        </Panel>
      </PanelGroup>
      <div className="flex justify-center w-full justify-items-center bottom-0 z-10 pt-0 p-2">
        <Player isLoading={isLoading} state={data} refetch={refetch}/>
      </div>
    </div>
  );
}
