const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
   image:{
       type:String,
       unique:true,
       required:true
   },
   title:{
    type:String,
    required:true
   },
   description:{
    type:String,
    required:true
   },
   likes:{
    type:Number,
    default: 0
   },
   views:{
    type:Number,
    default: 0
   },
   owner:{
     type: Schema.Types.ObjectId,
     ref: 'User',
     required: true
   }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const PostModel = model("Post", PostSchema);
module.exports = PostModel;