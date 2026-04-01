// src/lib/auth.ts

const KEY = "admin_token";

function hasWindow() {
  return typeof window !== "undefined";
}

export function setAdminToken(token: string) {
  if (!hasWindow()) return;
  window.localStorage.setItem(KEY, token);
}

export function getAdminToken() {
  if (!hasWindow()) return "";
  return window.localStorage.getItem(KEY) || "";
}

export function adminLogout() {
  if (!hasWindow()) return;
  window.localStorage.removeItem(KEY);
}