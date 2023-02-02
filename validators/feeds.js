const Joi = require("joi");

const comment_schema = {
    comment: Joi.string().min(1).max(1024).required(),
    feed_id: Joi.objectId().required(),
}

const like_schema = {
    feed_id: Joi.objectId().required(),
}

const feeds_schema = {
    caption: Joi.string().min(1).max(1024),
    location: Joi.string().min(1).max(50),
    media: Joi.array().items(Joi.object().keys({
        url: Joi.string().uri().required(),
        type: Joi.string().required()
    })).min(1).max(10).required(),
}

module.exports = {
    comment_schema,
    feeds_schema,
    like_schema
}