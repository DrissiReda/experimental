// @flow
let mongoose = require('mongoose')
let Schema = mongoose.Schema

let tweetSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    user: {
      type: Schema.ObjectId,
      ref: 'users',
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
)

let Tweet = module.exports = mongoose.model('Tweet', tweetSchema)

// send all tweets -> probably not useful
module.exports.getTweets = (callback, limit) => {
  Tweet.find({}, callback).limit(limit)
}

// send tweets by a given user
module.exports.getTweetsByUser = (userId, callback) => {
  Tweet.find({user: {'_id': userId}}, callback)
}

// new tweet
module.exports.tweet = (tweet, callback) => {
  Tweet.create(tweet, callback)
}
