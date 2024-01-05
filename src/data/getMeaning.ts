import { datuk } from "../models/meaning";

export const getMeaning = async (words: string[]) => {
    console.log("from here",words);

    const meanings: string[] = [];

    for (let i = 0; i < words.length; i += 1) {
        const meaning = await datuk.findOne({entry: words[i]});

        if (meaning) {
            meaning.defs.forEach(mean => {
                meanings.push(mean.entry);
            });
        }
    }
    
    return meanings;
};
