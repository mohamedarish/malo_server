import express from "express";
import en2ml from "../utils/transliterator";
import { getMeaning } from "../data/getMeaning";
import cors from "cors";

const router = express.Router();

router.get("/", cors(), (_req, res) => {
    res.status(200).send("The server is running!\n");
});

router.post("/rtrnsltrt", cors(), (req, res) => {
    let { word }: { word: string | null } = req.body;

    if (!word) {
        res.status(204).send();
        return;
    }

    word = word.split(" ")[0];

    if (!word) {
        res.status(204).send();
        return;
    }

    const resulting_words = en2ml(word);

    const lowercase_letters = /.*[a-z].*/;

    const result: string[] = [];

    resulting_words.forEach((w) => {
        if (!lowercase_letters.test(w)) {
            result.push(w);
        }
    });

    if (!result) {
        return res.status(204);
    }

    return res.status(200).json({ result });
});

router.post("/define", cors(), async (req, res) => {
    const { words } = req.body;

    if (!words) {
        res.status(204).send();
        return;
    }

    const meanings = await getMeaning(words);

    if (!meanings) {
        return res.status(204).send();
    }

    return res.status(200).json({ meanings });
});

export default router;
