import app from "../server.js";

export default function handler(req, res) {
  if (!req.url.startsWith("/api")) {
    req.url = "/api" + req.url;
  }
  return app(req, res);
}

export const config = {
  api: { bodyParser: false },
};
