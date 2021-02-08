var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: Number,
    username: String,
    created: {
        type: Date,
        default: Date.now
    },
    notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "History"
    }],
    unreadNotifications: {
        type: Number,
        default: 0
    },
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    picName: {
        type: String,
        default: "default.png"
    },
    active: {
        type: Boolean,
        default: false
    },
    firstTimeActivation: {
        type: Boolean,
        default: false
    },
    showIntro: {
        type: Boolean,
        default: true
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);