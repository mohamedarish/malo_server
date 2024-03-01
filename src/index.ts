import express from "express";
import router from "./routes/route";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());

const CONNECTION_STRING = process.env.CONNECTION_STRING!;

mongoose
    .connect(`${CONNECTION_STRING}?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Successfully connected to mongoDB");
    });

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
