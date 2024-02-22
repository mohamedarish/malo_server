import express from "express";
import router from "./routes/route";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";

import { Request, Response, NextFunction } from "express";

const app = express();

app.use(cors());
app.options("*", cors());
const allowCrossDomain = function (
    _req: Request,
    res: Response,
    next: NextFunction,
) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
};
app.use(allowCrossDomain);

const CONNECTION_STRING = process.env.CONNECTION_STRING!;

mongoose.connect(CONNECTION_STRING).then(() => {
    console.log("Successfully connected to mongoDB");
});

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
