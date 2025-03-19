import { Id } from "./types/musics";
import { UserData } from "./types/user";

export async function login(user_data:UserData) {
  const res = await fetch("/api/user/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(user_data)
  });
  return res
}

export async function signup(user_data:UserData) {
    const res = await fetch("/api/user/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(user_data)
    });
    return res
}

export async function add_to_queue(id:Id) {
  const res = await fetch("/api/player/add_to_queue", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(id)
  });
  return res
}