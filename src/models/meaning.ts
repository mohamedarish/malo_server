import { Schema, model } from "mongoose";

const defSchema = new Schema({
    entry: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});

const meaningSchema = new Schema({
    head: {
        type: String,
        required: true,
    },
    entry: {
        type: String,
        required: true,
    },
    origin: {
        type: String,
        required: true,
    },
    info: {
        type: String,
        required: true,
    },
    defs: {
        type: [defSchema],
        required: true,
    },
});

export const datuk = model("datuk", meaningSchema, "datuk");
