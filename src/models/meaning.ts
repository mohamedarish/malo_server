import { Schema, model } from "mongoose";

const meaningSchema = new Schema({
    head: {
        type: String,
        required: true
    },
    entry: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    defs: {
        type: [
            {
                "entry": String,
                "type": String
            }
        ],
        required: true
    }
});

export const datuk = model("datuk", meaningSchema);