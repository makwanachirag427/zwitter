export const API_URL =
  import.meta.env.MODE === "development" ? "http://localhost:8000" : "https://zwitter-production.up.railway.app";
console.log(API_URL)
