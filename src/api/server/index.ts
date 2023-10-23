import http from "http";
import express from "express";
import routes from "../routes";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    return res.status(200).json({});
  }
  next();
});

// Process Routes
app.use("/", routes);

// Errors
app.use((_, res) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

// Server
const httpServer = http.createServer(app);
const PORT: string | number = process.env.PORT ?? 8080;
httpServer.listen(PORT, () =>
  console.log(`API running on http://localhost:${PORT}`)
);
