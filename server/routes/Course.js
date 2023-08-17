const express = require("express");
const router = express.Router();

// IMPORT CONTROLLERS
const {createCourse, showAllCourses, getCourseDetails} = require("../controllers/Course");
const {createCategory, showAllCategories, categoryPageDetails} = require("../controllers/Category");
const {createSection, updateSection, deleteSection} = require("../controllers/Section");
const {createSubSection, updateSubsection, deleteSubsection} = require("../controllers/Subsection");
const {createRating, getAverageRating, getAllRating} = require("../controllers/RatingAndReview");

const {auth, isStudent, isInstructor, isAdmin} = require("../middlewares/auth");

// DEFINE API ROUTE

// COURSE
router.post("/createcourse",auth, isInstructor, createCourse);
router.get("/showAllCourses", showAllCourses);
router.post("/getCourseDetails", getCourseDetails);

// SECTION
router.post("/createSection",auth, isInstructor, createSection);
router.put("/updateSection",auth, isInstructor, updateSection);
router.delete("/deleteSection",auth, isInstructor, deleteSection);

// SUB-SECTION
router.post("/createSubSection", auth, isInstructor, createSubSection);
router.put("/updateSubsection", auth, isInstructor, updateSubsection);
router.delete("/deleteSubsection", auth, isInstructor, deleteSubsection);

// CATEGORY
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/categoryPageDetails", categoryPageDetails);

// RATING-REVIEW
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getAllRating", getAllRating);

module.exports = router;