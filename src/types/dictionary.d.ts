interface defs {
    entry: string;
    type: string;
}

interface dictionary {
    id: number;
    head: string;
    entry: string;
    origin: string;
    info: string;
    defs: defs[];
}

export default dictionary;
