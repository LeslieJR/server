const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
  {
   user_id:{
     type: Schema.Types.ObjectId,
     ref:'User',
     required: true
   },
   post_id:{
    type: Schema.Types.ObjectId,
    ref:'User',
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