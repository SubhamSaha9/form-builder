const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    form: {
        type: String,
        required: true,
    },
    theme: {
        type: String,
    },
    background: {
        type: String,
    },
    style: {
        type: String,
    }
},
    { timestamps: true }
)

const Form = mongoose.model("Form", formSchema);
module.exports = Form;