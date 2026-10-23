import axios from "./axios";

// Ye token JWT nahi hai — backend uniqueId() se plain random string generate karta hai
// aur DB (admin.token column) me store karta hai. Isliye local JWT-decode/exp-check
// yahan lagana galat approach tha. Real validation server-side hi hoti hai
// (checktoken DB lookup + 403 handling jo ApiHelper me already hai).
const isTokenValid = (authToken: string): boolean => {
  // Sirf presence check — token exist karta hai aur empty nahi hai
  return typeof authToken === "string" && authToken.trim() !== "";
};

const setSession = (authToken?: string | null): void => {
  if (typeof authToken === "string" && authToken.trim() !== "") {
    localStorage.setItem("authToken", authToken);
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  } else {
    localStorage.removeItem("authToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isTokenValid, setSession };