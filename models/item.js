var mongoose = require("mongoose");

var itemSchema = new mongoose.Schema({
    title: String,
    desc: String,
    status: String,
    created: {type: Date, default: Date.now},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});

module.exports = mongoose.model("Item", itemSchema);