let urls = {
  // development: "http://localhost:8001",
  development: "http://demo.kimekoif.com",
  production: "http://demo.kimekoif.com",
};
export const API_ROOT = urls[process.env.NODE_ENV];
