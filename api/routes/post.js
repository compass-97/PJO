const express = require('express');
const Comment = require('../schemas/comment');
const Post = require('../schemas/post');

const router = express.Router();

router.post('/l', async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    if (data.tags.length > 0) {
      const postList = await Post.find({ tags: { $all: data.tags } });
      await res.status(200).send(postList);
    } else {
      const postList = await Post.find({});
      await res.status(200).send(postList);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/l/p', async (req, res) => {
  try {
    const { id } = req.body;
    const post = await Post.findOne({ _id: id });
    await res.status(200).send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/c', async (req, res) => {
  try {
    const data = req.body;
    await Post.create({
      title: data.title,
      content: data.content,
      tags: data.tags,
    });
    await res.status(201).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/c/c', async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    await Comment.create({
      post: data.id,
      text: data.comment,
    });
    await res.status(201).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/c/g', async (req, res) => {
  try {
    const data = req.body;
    const result = await Comment.find({ post: data.id });
    await res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
