import express from "express";
import en2ml from "../utils/transliterator";


const router = express.Router();

router.get("/", (_req, res) => {
    res.send("The server is running!\n");
});

router.post("/rtrnsltrt", (req, res) => {
    const { word } = req.body;

    console.log("Atleast, here");
    if (!word) return;

    console.log(word);

    const resulting_words = en2ml(word);

    console.log(resulting_words);

    const lowercase_letters = /.*[a-z].*/;

    const result: string[] = [];

    resulting_words.forEach((w) => {
        if (!lowercase_letters.test(w)) {
            result.push(w);
        }
    });

    console.log(result);

    if (!result) {
        return res.status(204).json({message: "The word cannot be transliterated"});
    }

    return res.status(200).json({ result });
});

router.post("/define", (req, res) => {
    const { words } = req.body;

    if (!words) return;

    const meanings = getMeaning(words);

    if (!meanings) {
        return res.status(204).json({message: "The word does not have any meaning in the datuk"});
    }

    return res.status(200).json({meanings});
});

export default router;
