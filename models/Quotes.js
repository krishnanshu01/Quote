import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
    quote: {
        type: String,
        require: true
    },
    by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

mongoose.model("Quote", quoteSchema);