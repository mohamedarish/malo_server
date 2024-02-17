import {
    modifiers,
    chillaksharam,
    compounds,
    consonants,
    vowels,
} from "./data/index";
import split from "./splitter";

const en2ml = (word: string): string[] => {
    let res: string[] = [];

    const parts = split(word);

    // if (parts.length < 2) return; // this will be modified further but for now we assume no words with < 2 parts exist (I can't think of a valid case and hence it will be considered false to prevent searching for single letter meanings)

    for (let i = 0; i < parts.length; i += 1) {
        let oldRes: string[] = [];
        let flag = true;

        res.forEach((element) => {
            oldRes.push(element);
        });

        if (i == 0 && parts[i][0].match(/[aeiou]/gi)) {
            // this part is a vowel (cannot be a modifier as we've handled the modifier and it cannot occur as the word does not start with a vowel) also vowel can occur only at the first letter and vowels never occur in the middle.
            for (let j = 0; j < vowels.length; j += 1) {
                if (vowels[j].english == parts[i]) {
                    vowels[j].malayalam.forEach((aksharam) => {
                        res.push(aksharam);
                    });
                    flag = false;
                    break;
                }
            }

            if (flag) {
                // invalid vowel sequence
                res.push(parts[i]);
            }
        } else {
            // not a vowel, so consonant, chillaksharam or compound.
            // compound >> chillaksharam >> consonant and hence we check for this in this order.

            if (i < parts.length - 1 && !parts[i + 1][0].match(/[aeiou]/gi)) {
                // this means that it is either a compound or chillaksharam or it is a consonant that ends with .
                const joined = parts[i] + parts[i + 1]; // the oart i + 1 may or may not make it a fit to become a compound

                for (let j = 0; j < compounds.length; j += 1) {
                    if (compounds[j].english == joined) {
                        i += 1; // this is done as the next part has been used up to compound this letter
                        flag = false;
                        oldRes.forEach((element) => {
                            compounds[j].malayalam.forEach((aksharam) => {
                                res.push(element + aksharam);
                            });
                        });

                        if (oldRes.length < 1) {
                            // if oldres was empty
                            compounds[j].malayalam.forEach((aksharam) => {
                                res.push(aksharam);
                            });
                        }
                        break;
                    }
                }

                if (flag) {
                    // we found out that it is not a compound and now we know that part i + 1 isn't a vowel and hence this letter can either be a chillaksharam or a consonant that ends with .

                    // checking if it is a chilaksharam
                    for (let j = 0; j < chillaksharam.length; j += 1) {
                        if (chillaksharam[j].english == parts[i]) {
                            flag = false;
                            oldRes.forEach((element) => {
                                // no chillaksharam can occur at the start of the word and hence we assume that res.length >= 1
                                chillaksharam[j].malayalam.forEach(
                                    (aksharam) => {
                                        res.push(element + aksharam);
                                    },
                                );
                            });
                            break;
                        }
                    }

                    if (flag) {
                        // now it is not a chillaksharam either, which makes us conclude that it is a consonant that ends with .

                        for (let j = 0; j < consonants.length; j += 1) {
                            if (consonants[j].english == parts[i]) {
                                flag = false; // we still don't know if it is an invalid sequence and hence we maintain the flag
                                oldRes.forEach((element) => {
                                    consonants[j].malayalam.forEach(
                                        (aksharam) => {
                                            res.push(
                                                element +
                                                    aksharam +
                                                    modifiers[0].malayalam[0],
                                            ); // we know that it ends with .
                                        },
                                    );
                                });
                                if (oldRes.length < 1) {
                                    consonants[j].malayalam.forEach(
                                        (aksharam) => {
                                            res.push(
                                                aksharam +
                                                    modifiers[0].malayalam[0],
                                            ); // we know that it ends with .
                                        },
                                    );
                                }
                                break;
                            }
                        }

                        if (flag) {
                            // invalid character sequence detected and hence we keep it as is.
                            if (oldRes.length < 1) {
                                res.push(parts[i]);
                            } else {
                                oldRes.forEach((element) => {
                                    res.push(element + parts[i]);
                                });
                            }
                        }
                    }
                } else {
                    // now we know that the compound has been selected. now we need to know what modifier to apply to it
                    // i had been incremented to include the compound joiner, and now we can check for the modifier with i + 1

                    if (i == parts.length - 1) {
                        // we need to screen out the old elements before continuing to add the mdoifiers.
                        res = res.filter(
                            (element) => !oldRes.includes(element),
                        );
                        // oldres should be set to the now modified res
                        oldRes = [];
                        res.forEach((element) => {
                            oldRes.push(element);
                        });

                        // this means that the compound was the last letter and hence we are guaranteed that it ends with .
                        oldRes.forEach((element) => {
                            res.push(element + modifiers[0].malayalam[0]);
                        });
                    } else if (parts[i + 1][0].match(/[aeiou]/gi)) {
                        // we now know that it is not the end of the word and that the next part is a modifier
                        i += 1; // this was done as the next part is also taken into account

                        if (parts[i] == "a") {
                            // do nothing as this is already okay
                        } else {
                            // we need to screen out the old elements before continuing to add the mdoifiers.
                            res = res.filter(
                                (element) => !oldRes.includes(element),
                            );
                            // oldres should be set to the now modified res
                            oldRes = [];
                            res.forEach((element) => {
                                oldRes.push(element);
                            });

                            for (let j = 0; j < modifiers.length; j += 1) {
                                if (modifiers[j].english == parts[i]) {
                                    oldRes.forEach((element) => {
                                        modifiers[j].malayalam.forEach(
                                            (aksharam) => {
                                                res.push(element + aksharam);
                                            },
                                        );
                                    });
                                    flag = false;
                                    break;
                                }
                            }

                            if (flag) {
                                // invalid vowel sequence
                                oldRes.forEach((element) => {
                                    res.push(element + parts[i]);
                                });
                            }
                        }
                    } else {
                        // now we know that it ends with a .

                        oldRes.forEach((element) => {
                            res.push(element + modifiers[0].malayalam[0]);
                        });
                    }
                }
            } else if (i == parts.length - 1) {
                // not a vowel ending and it is not a compound as we have found out before, and now the word can either end with a chillaksharam or a consonatn ending with .

                // checking if it is a chillaksharam
                for (let j = 0; j < chillaksharam.length; j += 1) {
                    if (chillaksharam[j].english == parts[i]) {
                        flag = false;
                        oldRes.forEach((element) => {
                            // no chillaksharam can occur at the start of the word and hence we assume that res.length >= 1
                            chillaksharam[j].malayalam.forEach((aksharam) => {
                                res.push(element + aksharam);
                            });
                        });
                        break;
                    }
                }

                if (flag) {
                    // now it is not a chillaksharam either, which makes us conclude that it is a consonant that ends with .

                    for (let j = 0; j < consonants.length; j += 1) {
                        if (consonants[j].english == parts[i]) {
                            flag = false; // we still don't know if it is an invalid sequence and hence we maintain the flag
                            oldRes.forEach((element) => {
                                consonants[j].malayalam.forEach((aksharam) => {
                                    res.push(
                                        element +
                                            aksharam +
                                            modifiers[0].malayalam[0],
                                    ); // we know that it ends with .
                                });
                            });
                            if (oldRes.length < 1) {
                                consonants[j].malayalam.forEach((aksharam) => {
                                    res.push(
                                        aksharam + modifiers[0].malayalam[0],
                                    ); // we know that it ends with .
                                });
                            }
                            break;
                        }
                    }

                    if (flag) {
                        // invalid character sequence detected and hence we keep it as is.
                        if (oldRes.length < 1) {
                            res.push(parts[i]);
                        } else {
                            oldRes.forEach((element) => {
                                // oldres can be empty
                                res.push(element + parts[i]);
                            });

                            if (oldRes.length < 1) {
                                res.push(parts[i]);
                            }
                        }
                    }
                }
            } else {
                // now it can only be a consonant ending with a modifier in the next part (it cannot be .)

                // finding the consonant
                for (let j = 0; j < consonants.length; j += 1) {
                    if (consonants[j].english == parts[i]) {
                        flag = false;
                        oldRes.forEach((element) => {
                            // old res can be an empty array
                            consonants[j].malayalam.forEach((aksharam) => {
                                res.push(element + aksharam);
                            });
                        });

                        if (oldRes.length < 1) {
                            consonants[j].malayalam.forEach((aksharam) => {
                                res.push(aksharam);
                            });
                        }
                        break;
                    }
                }

                if (flag) {
                    // invalid character sequence detected
                    oldRes.forEach((element) => {
                        res.push(element + parts[i]);
                    });

                    if (oldRes.length < 1) {
                        // oldres can be empty
                        res.push(parts[i]);
                    }
                } else {
                    // now we know that it was a consonat at the previous part and the next part is a modifier

                    i += 1;

                    // finding the modifier
                    if (parts[i] == "a") {
                        // it is a and hence we need to do nothing.
                    } else {
                        // filer out the oldres elements
                        res = res.filter(
                            (element) => !oldRes.includes(element),
                        );

                        // we need to make sure oldres is reset
                        oldRes = [];
                        res.forEach((element) => {
                            oldRes.push(element);
                        });

                        for (let j = 0; j < modifiers.length; j += 1) {
                            if (modifiers[j].english == parts[i]) {
                                oldRes.forEach((element) => {
                                    modifiers[j].malayalam.forEach(
                                        (aksharam) => {
                                            res.push(element + aksharam);
                                        },
                                    );
                                });
                                flag = false;
                                break;
                            }
                        }

                        if (flag) {
                            // invalid sequence of vowels
                            oldRes.forEach((element) => {
                                res.push(element + parts[i]);
                            });
                        }
                    }
                }
            }
        }

        // filtering out elements which were present in last iteration also.
        res = res.filter((element) => !oldRes.includes(element));
    }

    return res;
};

export default en2ml;
