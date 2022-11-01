import express from "express";
import cors from "cors";
import planning from "./api/planning.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/planning", planning);
app.use("*", (req, res) => res.status(404).json({ error: "not found"}));

export default app;