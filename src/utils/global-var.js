let urls = {
  // development: "http://localhost:8001",
  development: "https://api.cap221.com",
  production: "https://api.cap221.com",
};
export const API_ROOT = urls[process.env.NODE_ENV];
export const WIZALL_ROOT = "https://agent-api.wizall.com";

export const getUser = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }
};
