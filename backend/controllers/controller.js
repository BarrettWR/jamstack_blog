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
    let posts = await Post.find();
    res.json(posts);
})

exports.api_singlePost_get = asyncHandler(async (req, res, next) => {


    let post = await Post.findOne({_id: req.params.id});
    res.json(post);
})

exports.api_comments_get = asyncHandler(async (req, res, next) => {
    let comments = await Comment.find();
    res.json(comments);
})

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
                    username: user.username,
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

exports.api_commentSubmit = asyncHandler(async (req, res, next) => {
    try {
        if (req.body.comment.length < 1) {
            // console.log("incorrect length")
            res.json({success: false, message: "Comment must be at least one character in length"})
        }
        else if (req.body.comment.length > 500) {
            // console.log("incorrect length")
            res.json({success: false, message: "Comment must be less than 500 characters in length"})
        }
        else {
            const split = req.body.jwt._value.split(" ");
            const jwt = split[1];
            const decoded = await jsonwebtoken.decode(jwt);
            
            const comment = new Comment({
                username: decoded.username,
                message: req.body.comment,
                time: new Date(),
                postID: req.body.postID
            })

            await comment.save()

            res.json({success: true, message:""})
        }
    }
    catch (err) {
        console.log(err)
        return next(err);
    }
})

exports.api_postsubmit_get = asyncHandler(async (req, res, next) => {
    try {
        const split = req.headers.authorization.split(" ");
        const jwt = split[1];
        const decoded = await jsonwebtoken.decode(jwt);

        const user = await User.findOne({_id: decoded.sub});
        

        if (!user.admin) {
            console.log("not admin");
            res.json({ success: false })
        }
        else {
            res.json({ success: true })
        }
    }
    catch (err) {
        console.log(err)
        return next(err);
    }
})

exports.api_postsubmit_post = asyncHandler(async (req, res, next) => {
    try {
        const split = req.headers.authorization.split(" ");
        const jwt = split[1];
        const decoded = await jsonwebtoken.decode(jwt);

        const user = await User.findOne({_id: decoded.sub});
        

        if (!user.admin) {
            console.log("not admin");
            res.json({ success: false })
        }
        else {
            const post = new Post({
                author: user.username,
                title: req.body.blogTitle,
                text: req.body.blogPost,
                time: new Date,
                published: true,
                comments: []
            })

            await post.save()
            
            res.json({ success: true })
        }
    }
    catch (err) {
        console.log(err)
        return next(err);
    }
})
