const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const {nanoid} = require("nanoid");
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Имя пользователя обязательно'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Пароль пользователя обязателен']
    },
    token: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["user", "admin"]
    }
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.set("toJSON", {
   transform: (doc, ret) => {
       delete ret.password;
       return ret;
   }
});

UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
    this.token = nanoid();
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
