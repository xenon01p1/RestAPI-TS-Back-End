import express from "express";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  return res.json({ status: "ok" });
});

app.use("/auth", authRoutes);

app.listen(3000, () => {
    console.log("Server running on 3000");
});
