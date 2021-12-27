// WE SOPT SERVER Seminar 3 - Posting Server
// by HYOSITIVE
// 2021.10.27

const express = require('express');
const { post } = require('.');
const router = express.Router();
const posts = require('../../dbMockup/post');
const util = require("../../lib/util.js");
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const { response } = require('express');

// 모든 게시글 조회
router.get("/", (req, res) => {
    return res
        .status(statusCode.OK)
        .send(
            util.success(statusCode.OK, responseMessage.GET_POST_SUCCESS, posts)
        );
})

// 고유 id 값을 가진 게시글 조회
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const post = posts.filter(post => post.id === Number(id))[0];

    return res
        .status(statusCode.OK)
        .send(
            util.success(statusCode.OK, responseMessage.GET_POST_SUCCESS, post)
        );
})

// 게시글 생성
router.post("/", (req, res) => {
    const {title, description} = req.body;
    const newPost = {
        id: posts.length + 1,
        title: title,
        description: description
    };
    res.status(statusCode.OK).send(
        util.success(
            statusCode.OK,
            responseMessage.CREATE_POST_SUCCESS,
            newPost
        )
    );
})

// 고유 id값을 가진 게시글 수정
router.put("/:id", async(req, res) => {
    const {id} = req.params;
    const newTitle = req.body.title;
    const newDescription = req.body.description;

    const existingPost = posts.filter(post => post.id === Number(id))[0];
    const updatePost = {...existingPost, title: newTitle, description: newDescription};

    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.EDIT_POST_SUCCESS, updatePost));

})

// 고유 id값을 가진 게시글 삭제
router.delete("/:id", async(req, res) => {
    const {id} = req.params;

    const existingPost = posts.filter(post => post.id === Number(id))[0];
    res.status(statusCode.OK).send(
        util.success(
            statusCode.OK,
            responseMessage.DELETE_POST_SUCCES,
            existingPost
        )
    );
})

module.exports = router;