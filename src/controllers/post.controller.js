const models = require("../models");
const config = require("../config");
const values = require("../values");
import { unlink } from 'fs/promises';
const path = require("path");

const upload = async (req, res) => {
  try {
    const { title, description, owner_id } = req.body;
    const owner = await models.user.findById(owner_id);
    console.log(owner);
    if (!owner) {
      return res.json("OWNER DOES NOT EXIST");
    }
    const file = req.file;
    const hostname = config.server.hostname;
    const filename = hostname + "/" + values.imageFolder + "/" + file.filename;
    const newPost = await models.post.create({
      image: filename,
      title,
      description,
      owner,
    });
    return res.json(newPost);
  } catch (err) {
    return res.json({ err: err.message });
  }
};

const like = async (req, res) => {
  try {
    const { post_id } = req.body;
    const post = await models.post.findById(post_id);
    if (!post) {
      return res.json("THIS POST DOES NOT EXIST");
    }
    const postUpdated = await models.post.findByIdAndUpdate(
      post_id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    return res.json(postUpdated);
  } catch (err) {
    return res.json({ err: err.message });
  }
};

const view = async (req, res) => {
  try {
    const { post_id } = req.body;
    const post = await models.post.findById(post_id);
    if (!post) {
      return res.json("THIS POST DOES NOT EXIST");
    }
    const postUpdated = await models.post.findByIdAndUpdate(
      post_id,
      { $inc: { views: 1 } },
      { new: true }
    );
    return res.json(postUpdated);
  } catch (err) {
    return res.json({ err: err.message });
  }
};
//falta definir
const recentUploads = (req, res) => {
  res.json("RECENT UPLOADS");
};
//falta definir
const stats = (req, res) => {
  res.json("GET STATS");
};
//falta definir
const mostPopular = (req, res) => {
  res.json("MOST POPULARS");
};
//falta definir
const details = (req, res) => {
  res.json("GET POST DETAILS");
};

const remove = async (req, res) => {
  try {
    const { post_id } = req.body;
    const post = await models.post.findById(post_id);
    if (!post) {
      return res.json({ error: "POST DOES NOT EXIST" });
    }
    const imageSplit = post.image.split("/");
    const fileName = imageSplit[imageSplit.length - 1];
    const imagePath = path.resolve(
      `./src/statics/${values.imageFolder}/` + fileName
    );
    console.log(imagePath)
    await unlink(imagePath);
    //to delete all the comments related to the post
    await models.comment.deleteMany({ post });
    //to delete the post
    await models.post.deleteOne({ _id: post_id });
    //or
    //await models.post.findByIdAndRemove(post_id)
    return res.status(200).json({ msg: "post deleted" });
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};
module.exports = {
  upload,
  recentUploads,
  stats,
  mostPopular,
  like,
  view,
  details,
  remove,
};
