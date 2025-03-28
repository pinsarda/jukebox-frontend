import { Id } from "./types/backend";
import { UserData } from "./types/user";

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
