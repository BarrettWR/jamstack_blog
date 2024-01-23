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
    try {
        const user = await User.findOne({username: req.body.username});
        
        if (!user) {
            res.json({success: false, user: null, error: "Username not found"})
        }

        if (user) {
            const match = await bcrypt.compare(req.body.password, user.password);

            if (!match) {
                res.json({success: false, user: null, error: "Incorrect Passsword"})  
            }
            else {
                const payload = {
                    sub: user._id,
                    iat: Date.now()
                };
                
                const signedToken = jsonwebtoken.sign(payload, process.env.SECRET, { expiresIn: "1d" });
                res.json({success: true, user: user, message: "Log in successful. Welcome ", token: "Bearer " + signedToken, expiresIn: "1d"})
            }
        }
    }
    catch (err) {
        if (err) {
            console.log(err)
            return next(err)
        }
    }
})



// exports.api_logout = asyncHandler(async (req, res, next) => {
//     try {
//         res.clearCookie('token');
//         res.json({success: true})
//     }
//     catch (err) {
//         if (err) {
//             console.log(err)
//             return next(err)
//         }
//     }
// })


exports.api_signup = function(req, res) {
    try {
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if (err) { 
                res.json({success: false, user: null, error: "Error creating user. Please try again"})
            }
            else if (req.body.username.length > 40 || req.body.password.length > 40) {
                res.json({success: false, user: null, error: "Username must be under 40 characters"})

            }
            else {
                const user = new User({
                    username: req.body.username,
                    password: hashedPassword,
                    admin: false
                })
    
                await user.save()
    
                res.json({message: "User successfully created. Try logging in!"})
            }

        })
      }
      catch (err) {
        return next(err);
      }
}