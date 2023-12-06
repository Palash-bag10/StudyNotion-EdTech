const express = require("express");
const router = express.Router();

// IMPORT CONTROLLERS
const {
    capturePayment, 
    // verifySignature,
    verifyPayment,
    enrollStudents,
} = require("../controllers/Payment");

const {auth, isStudent, isInstructor, isAdmin} = require("../middlewares/auth");

// DEFINE API ROUTES
router.post("/capturepayment", auth, isStudent, capturePayment);
// router.post("/verifysignature", verifySignature);
router.post("/verifyPayment", auth, isStudent, verifyPayment);

module.exports = router;