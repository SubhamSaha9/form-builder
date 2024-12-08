const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
    jsonResponse: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    formRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Form"
    },
},
    { timestamps: true }
);

const Response = mongoose.model("Response", responseSchema);
module.exports = Response;