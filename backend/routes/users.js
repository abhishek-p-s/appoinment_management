var express = require('express');
const expressAsyncHandler = require('express-async-handler')
var User = require("../model/userModal.js")
var bcrypt = require("bcryptjs");
var utils = require("../utils.js")
var data = require("../data.js");
const Role = require('../model/roleModal.js');
const multer = require('multer')
var router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('hi');
});

router.get('/seed', expressAsyncHandler(async (req, res) => {
  const createdUsers = await User.insertMany(data.users);
  const createdRoles = await Role.insertMany(data.roles);
  res.send({ createdUsers, createdRoles });
}))

router.post('/signin', expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).populate('role')
  console.log(user, 'user')
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        token: utils.generateToken(user),
        userDetails: {
          _id: user.id,
          name: user.name,
          email: user.email,
          role: user.role?.id ? user.role?.id : user.role,
        }
      })
    } else {
      res.status(401).send({ message: 'incorrect password' })
    }
  } else {
    res.status(401).send({ message: 'No user found' })
  }
}))

router.post('/add-user', utils.isAuth, upload.array('image', 6), expressAsyncHandler(async (req, res) => {
  try {
    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + "/images/" + req.files[i].filename);
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      specialization: req.body.specialization,
      password: bcrypt.hashSync('p@ssw0rd', 8),//will create a default password later user can change that
      role: req.body.role,
      image: reqFiles,
    })
    const createdUser = await newUser.save();
    res.status(200).send({ message: 'New user created' })
  } catch (error) {
    res.status(400).send({ message: 'Some error occured' })
  }
}))

router.get('/users', utils.isAuth, expressAsyncHandler(async (req, res) => {
  const user = await User.find({}).populate('role')
  if (user) {
    res.send(user)
  } else {
    res.status(404).send({ message: "User Not Exist" })
  }
}))

router.get('/roles', utils.isAuth, expressAsyncHandler(async (req, res) => {
  const role = await Role.find({})
  if (role) {
    res.send(role)
  } else {
    res.status(404).send({ message: "User Not Exist" })
  }
}))

router.get('/user/:id', utils.isAuth, expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    res.send(user)
  } else {
    res.status(404).send({ message: "User Not Found" })
  }
}))

router.get('/doctor', utils.isAuth, expressAsyncHandler(async (req, res) => {
  try {
    const doctorRole = await Role.findOne({ name: 'Doctor' });
    // If the role is found, fetch users with that role ID
    if (doctorRole) {
      const users = await User.find({ role: doctorRole._id });
      res.json(users);
    } else {
      res.status(404).json({ message: 'Doctor Role Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

router.get('/patients', utils.isAuth, expressAsyncHandler(async (req, res) => {
  try {
    const patientsRole = await Role.findOne({ name: 'Patient' });
    // If the role is found, fetch users with that role ID
    if (patientsRole) {
      const users = await User.find({ role: patientsRole._id });
      res.json(users);
    } else {
      res.status(404).json({ message: 'Patients Role Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}))


module.exports = router;
