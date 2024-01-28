var express = require('express');
var router = express.Router();
const controller = require("../controllers/controller");
const passport = require('passport');

/* GET home page. */
router.get('/api/posts', controller.api_posts_get);

router.get('/api/post/:id', controller.api_singlePost_get);

router.get('/api/comments/', controller.api_comments_get);

router.post('/api/login', controller.api_login);

router.post('/api/signup', controller.api_signup);

router.get('/api/protec', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.json({protec: "yes"})
} )

router.post('/api/commentsubmit', passport.authenticate('jwt', { session: false }), controller.api_commentSubmit);

router.get('/api/postsubmit', passport.authenticate('jwt', { session: false }), controller.api_postsubmit_get)

router.post('/api/postsubmit', passport.authenticate('jwt', { session: false }), controller.api_postsubmit_post)



module.exports = router;
