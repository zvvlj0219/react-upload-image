const express = require('express')
const router = express.Router()
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    // output dir
    callback(null, './client/src/assets');
  },
  filename: function(req, file, callback) {
    const filename = Date.now() + path.extname(file.originalname)
    callback(null, filename);

    // const data = {
    //   created_at: String(Date.now()),
    //   filename: String(filename)
    // }

    // const jsonObject = JSON.parse(fs.readFileSync('server/db.json', 'utf8'))

    // jsonObject.data.push(data)

    // fs.writeFile(
    //   'server/db.json',
    //   JSON.stringify(jsonObject, null, '\t'),
    //   err => {
    //   if (err) throw err
    //   console.log('added data')
    // })

  }
});

// check req file is image
const fileFilter = (req, file, callback) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(null, false);
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
router.post('/upload', upload.array('upload-img-pass', 4), async (req,res) => {
  // save data to mongodb
  res.status(200).json({
    success: 'Array success'
  })
  // res.status(200)
})

module.exports = router;