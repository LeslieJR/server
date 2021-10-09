const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
  {
   user:{
     type: Schema.Types.ObjectId,
     ref:'User',
     required: true
   },
   post:{
    type: Schema.Types.ObjectId,
    ref:'Post',
    required: true
   },
   title:{
     type:String,
     required: true
   },
   comment:{
    type:String,
    required: true
   }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CommentModel = model("Comment", CommentSchema);
module.exports = CommentModel;