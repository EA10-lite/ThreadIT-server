const {
    add_comment,
    create_feed,
    delete_feed,
    get_feed,
    get_feeds,
    like_feed,
    reply_comment,
    update_feed,
} = require("../controllers/feeds");

const { 
    comment_schema, 
    feeds_schema, 
    like_schema
} = require("../validators/feeds");

const auth = require("../middlewares/auth");
const validation = require("../middlewares/validate");
const express = require("express");
const router = express.Router();

router.get("/",get_feeds);
router.get("/:id", get_feed);
router.post("/", [auth, validation(feeds_schema)], create_feed);
router.put("/comment/add", [validation(comment_schema)], add_comment);
router.put("/comment/reply", [validation(comment_schema)], reply_comment);
router.put("/like/add", [validation(like_schema)], like_feed);
router.delete("/:id", auth, delete_feed);

module.exports = router;