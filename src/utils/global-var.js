let urls = {
  development: "http://localhost:8000",
  production: "https://backend.kimekoif.com",
};
export const API_ROOT = urls[process.env.NODE_ENV];
