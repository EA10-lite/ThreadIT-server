const { Feeds } = require("../models/feeds");
const { User } = require("../models/users");

const add_comment = async (req, res) => {
    const user = await User.findById(req.user._id);
    if(!user) return res.status(400).send({ error: "cannot add comment!"});

    const feed = await Feeds.findByIdAndUpdate(req.body.feed_id, {
        $push:{
            comments: {
                comment: req.body.comment,
                comment_by: req.user._id,
                replies: [],
            }
        }
    }, { new: true });

    if(!feed) return res.status(404).send({ error: "thread not found!" });

    res.status(204).send();
};

const create_feed = async (req, res) => { 
    const user = await User.findById(req.user._id);
    if(!user) return res.status(400).send({ error: "cannot created thread!"});

    const feed = new Feeds({
        ...req.body,
        created_by: user._id
    });
    await feed.save();

    res.status(201).send({
        data: feed,
        error: null,
        message: "new thread created!"
    });
};

const delete_feed = async (req, res) => {
    const feed = await Feeds.findOneAndRemove({id: req.params.id, created_by: req.user._id});
    if(!feed) return res.status(404).send({ error: "thread not found!" });

    res.status(204).send({ message: "thread deleted!"});
};

const get_feeds = async (req, res) => {
    const feeds = await Feeds
        .find()
        .sort('created_at')
        .populate('created_by', 'username')
        .populate('comments.comment_by', 'username')

    res.status(200).send({
        data: feeds,
        error: null,
    });
};

const get_feed = async (req, res) => {
    const feed = await Feeds
        .findById(req.params.id)
        .populate('created_by', 'username')
        .populate('comments.comment_by', 'username');
        
    if(!feed) return res.status(404).send({ error: "Thread not found." });

    res.status(200).send({
        data: feed,
        error: null,
    });
};

const like_feed = async () => {
    const user = await User.findById(req.user._id);
    if(!user) return res.status(400).send({ error: "cannot like thread!"});

    const feed = await Feeds.findByIdAndUpdate(req.body.feed_id, {
        $addToSet:{likes: { liked_by: req.user._id }}
    }, { new: true });

    if(!feed) return res.status(404).send({ error: "thread not found!" });

    res.status(204).send();
};

const reply_comment = async () => {};

const update_feed = async () => {};

module.exports = {
    add_comment,
    create_feed,
    delete_feed,
    get_feed,
    get_feeds,
    like_feed,
    reply_comment,
    update_feed,
}