"use client";
import { getAuth } from "firebase/auth";

export async function apiFetch(url, options = {}) {
  const auth = getAuth();
  const user = auth.currentUser;
  const idToken = user ? await user.getIdToken() : null;

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
    },
  });
}