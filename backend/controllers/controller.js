var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require('express-validator');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

exports.api_posts_get = asyncHandler(async (req, res, next) => {
    // let post = new Post({
    //     author: "jimbob",
    //     title: "Hello World",
    //     text: "lorem ipsum dolor sit amet",
    //     time: new Date(),
    //     published: true
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

exports.api_singleComment_get = asyncHandler(async (req, res, next) => {
    let comment = await Comment.findOne({_id: req.params.id});
    res.json(comment);
})

