export const API_URL =
  import.meta.env.MODE === "development" ? "http://localhost:8000" : "";
console.log(API_URL)
