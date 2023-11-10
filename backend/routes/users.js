var express = require('express');
const expressAsyncHandler = require('express-async-handler')
var User = require("../model/userModal.js")
var bcrypt = require("bcryptjs");
var utils = require("../utils.js")
var data = require("../data.js")
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('hi');
});

router.get('/seed', expressAsyncHandler(async (req, res) => {
  const createdUsers = await User.insertMany(data.users)
  res.send(createdUsers)
}))

router.post('/signin', expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        token: utils.generateToken(user),
        userDetails: {
          _id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      })
    } else {
      res.status(401).send({ message: 'incorrect password' })
    }

  } else {
    res.status(401).send({ message: 'No user found' })
  }
}))

module.exports = router;
