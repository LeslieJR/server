const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    avatar: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);
module.exports = UserModel;
