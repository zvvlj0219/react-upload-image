const express = require('express')
const router = express.Router()
const multer = require('multer');
const path = require('path');
// const User = require('../model/userModel');

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    // output dir
    callback(null, './server/imageChunk');
  },
  filename: function(req, file, callback) { 
    callback(null, Date.now() + path.extname(file.originalname));
  }
});

// check req file is image
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage,
  fileFilter
})

// @route /users
// @get
router.get('/', (req, res) => {
  res.send('hello hello')
});

// @route /users/add
// @post photo
router.post('/upload', upload.array('upload', 4), async (req,res) => {
  // save data to mongodb
  res.status(200).json({
    success: 'Array success'
  })
})

module.exports = router;