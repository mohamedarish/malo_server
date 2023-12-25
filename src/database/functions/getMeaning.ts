import { db } from "..";

export const getMeaning = async (words: string[]) => {
    const result: {id: number; word: never; meaning: string; }[][] = [];
    words.forEach(async word => {
        const meanings = await db.query.datuk.findMany({
            with: {
                word
            }
        });

        result.push(meanings);
    });

    return result;   
};