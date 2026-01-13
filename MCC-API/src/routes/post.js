const {
    createPost,
    deletePost,
    getPost,
    getPosts,
    updatePost,
} = require("../controllers/post");
const express = require("express");
const { authentication } = require("../middleware");
const router = express.Router();

router.use(authentication);
router.delete("/:postId", deletePost);
router.get("/:postId", getPost);
router.get("/", getPosts)
router.post("/", createPost);
router.put("/:postId", updatePost);
module.exports = router;