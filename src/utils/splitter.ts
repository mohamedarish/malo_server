const split = (word: string): string[] => {
    const parts: string[] = [];

    for (let i = 0; i < word.length; i += 1) {
        let current = "";
        if (word[i].match(/[aeiou]/gi)) {
            current = word[i].toLowerCase();
            while (i < word.length - 1 && word[i + 1].match(/[aeiou]/gi)) {
                i += 1;
                current += word[i].toLowerCase();
            }
        } else {
            current = word[i].toLowerCase();
            while (
                i < word.length - 1 &&
                word[i + 1] == "h" &&
                current.length < 3
            ) {
                i += 1;
                current += word[i];
            }
        }
        parts.push(current);
    }

    return parts;
};

export default split;
