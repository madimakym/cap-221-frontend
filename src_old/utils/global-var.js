let urls = {
  development: "http://localhost:8001",
  // development: "https://demo.kimekoif.com",
  production: "https://demo.kimekoif.com",
};
export const API_ROOT = urls[process.env.NODE_ENV];
