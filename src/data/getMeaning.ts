import { datuk } from "../models/meaning";

export const getMeaning = async (words: string[]) => {
    const meanings = [];
    for (let i = 0; i < words.length; i += 1) {
        const m: string[] = [];

        const meaning = await datuk.find({
            entry: { $regex: `^${words[i]}[0-9]+` },
        });

        if (meaning) {
            meaning.forEach((mean) => {
                mean.defs.forEach((mean) => {
                    m.push(mean.entry);
                });
            });
        }

        meanings.push({
            word: words[i],
            meanings: m,
        });
    }

    return {
        meanings,
    };
};
