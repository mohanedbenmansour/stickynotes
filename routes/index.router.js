const express = require('express');
const user = require('../models/user.model');
const jwtConfig = require('../config/jwt.config');
const router = express.Router();
const userController = require('../controller/user.controller');
const postController = require('../controller/post.controller');
//routes for user
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/getuser', jwtConfig.verifyJwtToken, userController.getUser);
//routes for posts
router.post('/addpost', postController.addPost);
router.get('/getposts', postController.getPosts);
router.delete('/deletepost/:id', postController.deletePost);
module.exports = router;
