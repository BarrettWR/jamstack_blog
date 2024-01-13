var express = require('express');
var router = express.Router();
const controller = require("../controllers/controller");

/* GET home page. */
router.get('/api/posts', controller.api_posts_get);

router.get('/api/post/:id', controller.api_singlePost_get);

// router.get('/api/post/:id/comments', controller.api_comments_get);




module.exports = router;
