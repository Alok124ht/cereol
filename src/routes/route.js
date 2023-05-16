const express = require('express')
const router = express.Router();
const userController = require("../controller/userController")
const addressController = require('../controller/addressController');
const middleware = require("../middleware/auth.js")
const multer = require('multer');

//----------------------------------------------SETUP the MULTER --------------------------------------//
// Set up multer storage configuration 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads'); // Set the destination folder where uploaded files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '_' + file.originalname); // Set the filename to be unique
    }
  });
  
  // Set up multer upload configuration
  const upload = multer({ storage: storage });

//----------------------------------------------USER---------------------------------------------//

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// Get user profile

router.get("/userProfile", middleware.tokenChecker,userController.getUserProfile)
router.put("/updateuser"), middleware.tokenChecker,userController.updateUser
// GET ADDRESS BOOK 
router.post('/createAddress', addressController.createAddress);
router.get('/getAllAddress', addressController.getAllAddress);
router.get('/:id', addressController.getAddressById);


module.exports = router;