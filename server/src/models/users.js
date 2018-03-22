// @flow
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema

const options = '_id username email avatar_url'

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    avatar_url: {
      type: String,
      default: 'https://www.shareicon.net/data/128x128/2016/09/02/824411_man_512x512.png'
    },
    key: {
      type : String,
      default : null
    },
    local : {
      password: {
        type: String
        }
    },
    facebook: {
      id           : String,
      token        : String,
      name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        name         : String
    }
  }
)
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
let User = module.exports = mongoose.model('User', userSchema)

// get all users -> probably not useful
module.exports.getUsers = (callback, limit) => {
  User.find({}, callback).limit(limit)
}

// get user by id
// send the id username and email
module.exports.getUserById = (id, callback) => {
  User.findById(id, options, callback)
}

// get user by name
// send the id username and email
module.exports.getUserByName = (username, callback) => {
  User.findOne({username: username}, options, callback) // return null if none!
}

// add new user to the DB
module.exports.addUser = (user, callback) => {
  User.create(user, callback)
}

// update infos
module.exports.updateInfos = (callback) => {
  User.update({}, {multi: true}, callback)
}
