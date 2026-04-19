import axios from "axios"

const isBrowser = typeof window !== "undefined"

export const api = axios.create({
  // In the browser, use same-origin requests to avoid cross-origin/CORS issues.
  // On the server, fall back to NEXT_PUBLIC_APP_URL for absolute URL contexts.
  baseURL: isBrowser ? "" : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  withCredentials: true,
})
