const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

// createRatingAndReview handler function
exports.createRating = async (req,res) => {
    try{

        // get UserId
        const userId = req.user.id;
        // fetch data
        const {rating, review, courseId} = req.body;
        // check user is enroll or not
        const courseDetails = await Course.findOne(
            {_id: courseId,
                studentEnrolled : {$elemMatch: {$eq: userId } },
            }
        );

        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in the course",
            });
        }
        // check id user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        });
        if(alreadyReviewed){
            return res.status(403).json({
                success: false,
                message:"Course already reviewed by the user",
            });
        }
        // create rating
        const ratingReview = await RatingAndReview.create({
            rating, review,
            user: userId,
            course: courseId
        });
        
        // update course
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id: courseId},
                {
                    $push: {
                        ratingAndReviews: ratingReview._id,
                    }
                },
                {new: true},
            );
            console.log(updatedCourseDetails);
        // return response
        return res.status(200).json({
            success: true,
            message: "Rating and Review created successfully",
            ratingReview,
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// getAvgRatingAndReview handler function
exports.getAverageRating = async (req, res) => {
    try{

        // get courseId
        const courseId = req.body.courseId;

        // calculate Avg Rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                },
            },
        ])

        // return rating
        if(result.length > 0){
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })
        }

        // if no rating/review exist
        return res.status(200).json({
            success: true,
            message: "Average rating is 0. No Rating given till now",
            averageRating: 0,
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// getAllRatingAndReview handler function
exports.getAllRating = async (req, res) => {
    try{

        const allReviews = await RatingAndReview.find({})
                                .sort({rating: "desc"})
                                .populate({
                                    path: "user",
                                    select: "firstName lastName email image",
                                })
                                .populate({
                                    path: "course",
                                    select: "courseName",
                                })
                                .exec();

        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message,
        }) 
    }
}