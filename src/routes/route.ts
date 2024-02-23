import express from "express";
import en2ml from "../utils/transliterator";
import { getMeaning } from "../data/getMeaning";
import cors from "cors";

const router = express.Router();

router.get("/", cors(), (_req, res) => {
    res.send("The server is running!\n");
});

router.post("/rtrnsltrt", cors(), (req, res) => {
    const { word } = req.body;

    if (!word) return;

    const resulting_words = en2ml(word);

    const lowercase_letters = /.*[a-z].*/;

    const result: string[] = [];

    resulting_words.forEach((w) => {
        if (!lowercase_letters.test(w)) {
            result.push(w);
        }
    });

    if (!result) {
        return res
            .status(204)
            .json({ message: "The word cannot be transliterated" });
    }

    return res.status(200).json({ result });
});

router.post("/define", cors(), async (req, res) => {
    const { words } = req.body;

    if (!words) return;

    const meanings = await getMeaning(words);

    if (!meanings) {
        return res.status(204);
    }

    return res.status(200).json({ meanings });
});

export default router;
