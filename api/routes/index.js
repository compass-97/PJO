const express = require('express');

const router = express.Router();
const post = require('./post');

router.use('/p', post);

module.exports = router;
