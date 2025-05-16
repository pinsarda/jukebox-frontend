import { Id } from "./types/backend";
import { UserData } from "./types/user";

export type Provider = {
  name: string,
  id: string,
}

// In the long run, the server should be giving the available providers
// This code should be replaced
export const ytmusic_provider: Provider = {
  name: "Youtube Music",
  id: "ytmusic"
}

export const youtube_provider: Provider = {
  name: "Youtube",
  id: "youtube"
}

export const lastfm_provider: Provider = {
  name: "Last Fm",
  id: "lastfm"
}

export const getProvider = (provider_id: string) => {
  if (provider_id == ytmusic_provider.id) {
    return ytmusic_provider
  } else if (provider_id == youtube_provider.id) {
    return youtube_provider
  } else if (provider_id == lastfm_provider.id) {
    return lastfm_provider
  } else {
    console.log("Warning : unknown provider, defaulting to youtube music")
    return ytmusic_provider
  }
}

export async function login(user_data: UserData) {
  const res = await fetch("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user_data),
  });

  return res;
}

export async function signup(user_data: UserData) {
  const res = await fetch("/api/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user_data),
  });

  return res;
}

export async function add_to_queue(id: Id) {
  const res = await fetch("/api/player/add_to_queue", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });

  return res;
}

export async function play() {
  const res = await fetch("/api/player/play", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}

export async function pause() {
  const res = await fetch("/api/player/pause", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}

export async function next() {
  const res = await fetch("/api/player/next", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}

export async function previous() {
  const res = await fetch("/api/player/previous", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}

export async function seek(pos: number) {
  const res = await fetch("/api/player/seek", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pos: pos }),
  });

  return res;
}

export async function set_volume(volume: number) {
  const res = await fetch("/api/player/set_volume", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ volume: volume }),
  });

  return res;
}

export async function move_music_in_queue(old_index: number, new_index: number) {
  const res = await fetch("/api/player/move_music_in_queue", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ old_index: old_index, new_index: new_index }),
  });

  return res;
}

export async function move_in_queue(index: number) {
  const res = await fetch("/api/player/move_in_queue", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ index: index }),
  });

  return res;
}


export async function add_favorite_music(id: number) {
  const res = await fetch("/api/music/add_favorite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });

  return res;
}

export async function remove_favorite_music(id: number) {
  const res = await fetch("/api/music/remove_favorite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });

  return res;
}

export async function clear_song_queue() {
  const res = await fetch("api/player/clear_queue", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}


export async function shuffle_playlist() {
  const res = await fetch("api/player/shuffle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}
