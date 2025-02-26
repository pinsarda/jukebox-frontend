import React from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
  } from "@heroui/table";
import { Music } from "@/types/musics";
import { Spinner } from "@heroui/react";

interface MusicsTableProps {
  musics: Music[],
  isLoading: boolean
}

export default function MusicsTable({ musics, isLoading }: MusicsTableProps) {

  const renderCell = React.useCallback((music: Music) => {
    return (
      <div className="flex flex-col">
        <p className="text-bold text-sm capitalize hover:underline hover:cursor-pointer w-min whitespace-nowrap">{music.title}</p>
        <p className="text-bold text-sm capitalize text-default-400 hover:underline hover:cursor-pointer w-min whitespace-nowrap">{music.artist.name}</p>
      </div>
    );
  }, []);

  return (
    <div className="flex flex-col gap-3 w-full">
        <Table
        aria-label="Example static collection table"
        color="primary"
        selectionMode="single"
        className="w-full"
        >
        <TableHeader>
            <TableColumn width={20}>#</TableColumn>
            <TableColumn>Titre</TableColumn>
            <TableColumn>Album</TableColumn>
            <TableColumn align="end" width={20}>Durée</TableColumn>
        </TableHeader>
        <TableBody isLoading={isLoading} loadingContent={<Spinner label="Chargement..." />}>
          {musics.map((music, index) => (
            <TableRow key={index + 1}>
              <TableCell>{index + 1}.</TableCell>
              <TableCell>
                {renderCell(music)}
              </TableCell>
              <TableCell>
                <p className="hover:underline hover:cursor-pointer w-min whitespace-nowrap">{music.album.title}</p>
              </TableCell>
              <TableCell>1:02</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
    </div>
  );
}

