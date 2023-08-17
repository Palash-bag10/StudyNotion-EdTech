const express = require("express");
const router = express.Router();

// IMPORT CONTROLLERS
const {capturePayment, verifySignature} = require("../controllers/Payment");
const {auth, isStudent, isInstructor, isAdmin} = require("../middlewares/auth");

// DEFINE API ROUTES
router.post("/capturepayment", auth, isStudent, capturePayment);
router.post("/verifysignature", verifySignature);

module.exports = router;