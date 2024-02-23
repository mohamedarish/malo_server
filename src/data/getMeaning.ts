import { datuk } from "../models/meaning";

export const getMeaning = async (words: string[]) => {
    const meanings: string[] = [];

    for (let i = 0; i < words.length; i += 1) {
        const meaning = await datuk.findOne({
            entry: { $regex: `^${words[i]}[0-9]+` },
        });

        if (meaning) {
            meaning.defs.forEach((mean) => {
                meanings.push(mean.entry);
            });
        }
    }

    return meanings;
};
