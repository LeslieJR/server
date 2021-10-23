const models = require("../models");
const config = require("../config");
const values = require("../values");
const { unlink } = require("fs/promises");
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

const recentUploads = async (req, res) => {
  try {
    const uploads = await models.post.find().sort({
      createdAt: "desc",
    });
    return res.json(uploads);
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

const stats = async (req, res) => {
  try {
    const count_img = await models.post.countDocuments();
    const count_comments = (await models.comment.find()).length;
    const count_posts = await models.post.countDocuments();
    let views = 0;
    let likes = 0;
    if (count_posts > 0) {
      const result_views = await models.post.aggregate([
        {
          $group: {
            _id: "1",
            views_total: { $sum: "$views" },
          },
        },
      ]);
      views = result_views[0].views_total;
      const result_likes = await models.post.aggregate([
        {
          $group: {
            _id: "1",
            likes_total: { $sum: "$likes" },
          },
        },
      ]);

      likes = result_likes[0].likes_total
    }    
    return res.json({
      count_img,
      count_comments,
      views,
      likes
    });
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

const mostPopular = async (req, res) => {
  try {
    const populars = await models.post.find().limit(6).sort({
      views: "desc",
    });
    return res.json(populars);
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

const details = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await models.post.findById(id);
    const comments = await models.comment.find({ post });
    return res.json({ post, comments });
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
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
      `./src/static/${values.imageFolder}/` + fileName
    );
    console.log(imagePath);
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
