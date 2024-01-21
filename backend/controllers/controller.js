var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require('express-validator');
const passport = require("passport");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const jsonwebtoken = require("jsonwebtoken");

exports.api_posts_get = asyncHandler(async (req, res, next) => {
    // let post = new Post({
    //     author: "jimbob",
    //     title: "Hello World",
    //     text: "lorem ipsum dolor sit amet",
    //     time: new Date(),
    //     published: true,
    //     comments: [
    //         "65977dfb3043fbf98b0ef712",
    //         "659779fd85e0eb6e0b951b7f"
    //     ]
    // })

    // post.save();

    let posts = await Post.find();
    res.json(posts);
})

exports.api_singlePost_get = asyncHandler(async (req, res, next) => {
    let post = await Post.findOne({_id: req.params.id});
    res.json(post);
})

exports.api_comments_get = asyncHandler(async (req, res, next) => {
    //     let comment= new Comment({
    //         username: "Greg",
    //         message: "lorem ipsum dolor sit amet",
    //         time: new Date(),
    //         postID: '659779fd85e0eb6e0b951b7f'
    //     })

    // comment.save();


    let comments = await Comment.find();
    res.json(comments);
})


// exports.api_singleComment_get = asyncHandler(async (req, res, next) => {
//     let comment = await Comment.findOne({_id: req.params.id});
//     res.json(comment);
// })


exports.api_login = asyncHandler(async (req, res, next) => {
    //Do login authentication
    const user = await User.findOne({username: req.body.username});
        
    // async function (err, user) {
    //     if (err) {
    //         console.log(err)
    //         return done(err, false);
    //     }
  
    //     const match = await bcrypt.compare(password, user.password);
    //     if (!match) {
    //       return done(null, false, { message: "Incorrect password!"})
    //     }
        
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //     }
    // });

    console.log(user)

    if (user) {
        const payload = {
            sub: user._id,
            iat: Date.now()
        };
        
        const signedToken = jsonwebtoken.sign(payload, process.env.SECRET, { expiresIn: "1d" });

        res.json({success: true, user: user, token: "Bearer " + signedToken, expiresIn: "1d"})
    }
    
})

exports.api_signup = function(req, res) {
    try {
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if (err) { 
            console.log(err)
            throw new Error
            };

            const user = new User({
            username: req.body.username,
            password: hashedPassword,
            admin: true
            })

            await user.save()
                .then((user) => {
                    const payload = {
                        sub: user._id,
                        iat: Date.now()
                    };

                    const signedToken = jsonwebtoken.sign(payload, process.env.SECRET, { expiresIn: "1d" });

                    res.json({success: true, user: user, token: "Bearer " + signedToken, expiresIn: "1d"})
                    
                })
                .catch(err => next(err))
        })
      }
      catch (err) {
        return next(err);
      }
}