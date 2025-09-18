import express from "express";

const app = express();

app.get("/api/ping", (_req, res) => {
  console.log("receiving ping");
  res.send("pong");
});

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
