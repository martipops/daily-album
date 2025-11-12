import express from "express";
import cors from "cors";
import morgan from "morgan";
import tokenRouter from "./routes/tokens_routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API up and running!"})
});

app.use("/token/create", tokenRouter);

export default app;