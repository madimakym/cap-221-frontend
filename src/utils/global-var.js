let urls = {
  development: "http://localhost:8001",
  //development: "https://demo.kimekoif.com",
  production: "https://demo.kimekoif.com",
};
export const API_ROOT = urls[process.env.NODE_ENV];
export const WIZALL_ROOT = urls[process.env.NODE_ENV];

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
