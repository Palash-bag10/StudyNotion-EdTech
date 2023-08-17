const express = require("express");
const router = express.Router();

// IMPORT CONTROLLERS
const {updateProfile, deleteAccount, getAllUserDetails, updateDisplayPictue, getEnrolledCourse} = require("../controllers/Profile");
const {auth} = require("../middlewares/auth");

// DEFINE API ROUTES
router.put("/updateprofile", auth, updateProfile);
router.delete("/deleteaccount", auth, deleteAccount);
router.get("/getalluserdetails", auth, getAllUserDetails);
router.put("/updateDisplayPictue", auth, updateDisplayPictue);
router.get("/getEnrolledCourse", auth, getEnrolledCourse);

module.exports = router;