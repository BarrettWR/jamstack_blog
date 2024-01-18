var express = require('express');
var router = express.Router();
const controller = require("../controllers/controller");
const passport = require('passport');

/* GET home page. */
router.get('/api/posts', controller.api_posts_get);

router.get('/api/post/:id', controller.api_singlePost_get);

router.get('/api/comments/', controller.api_comments_get);

router.post('api/login', controller.api_login);

// router.get('/api/comments/:id', controller.api_singleComment_get);




module.exports = router;
