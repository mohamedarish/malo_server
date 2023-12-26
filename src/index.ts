import express from "express";
import router from "./routes/route";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
