// src/lib/auth.ts

const DRIVER_KEY = "driver_token";

function hasWindow() {
  return typeof window !== "undefined";
}

export function setDriverToken(token: string) {
  if (!hasWindow()) return;
  window.localStorage.setItem(DRIVER_KEY, token);
}
export function getDriverToken() {
  if (!hasWindow()) return "";
  return window.localStorage.getItem(DRIVER_KEY) || "";
}
export function driverLogout() {
  if (!hasWindow()) return;
  window.localStorage.removeItem(DRIVER_KEY);
}