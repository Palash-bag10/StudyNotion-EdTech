const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

// cerateCourse Handler function
exports.createCourse = async (req, res) => {
    try{

       // Fetch Data
       let {courseName, 
            courseDescription, 
            whatYouWillLearn, 
            price, 
            //tag, 
            category, 
            status, 
            instructions} = req.body;

       // Fetch thumbnail
       //const thumbnail = req.files.thumbnailImage;

       // Validation
       if(!courseName || 
        !courseDescription || 
        !whatYouWillLearn || 
        !price || 
        !category 
        // || !tag || 
        //!thumbnail
        ){
        return res.status(400).json({
            success: false,
            message: "All Fields Are required",
        })
       }

       if(!status || status === undefined) {
        status = "Draft";
       }

       // instructor validation
       const userId = req.user.id;

       const instructorDetails = await User.findById(userId, { accountType: "Instructor", });
       console.log("Instructor Details: ", instructorDetails);
       // TODO: Verify that userId and InstructorDetails._id are same or details

       if(!instructorDetails) {
        return res.status(404).json({
            success: false,
            message: "Instructor details not found",
        });
       }

       // category Validation
       // TODO: HOMEWORK (CHECK MY CODE)
       const categoryDetails = await Category.findById(category);
       if(!categoryDetails){
        return res.status(404).json({
            success: false,
            message: "category details not found",
        });
       }

       // Image upload to cloudinary
    //    const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
	// 	console.log(thumbnailImage);

       // create new course entry
       const newCourse = await Course.create({
        courseName,
        courseDescription,
        instructor: instructorDetails._id,
        whatYouWillLearn: whatYouWillLearn,
        category: categoryDetails._id,
        //tag: tag,
        price,
        //thumbnail: thumbnailImage.secure_url,
        status: status,
		instructions: instructions,
       });

       // Add the new course to the users schema of instructor
       await User.findByIdAndUpdate(
        {_id: instructorDetails._id},
        {
            $push: {
                courses: newCourse._id,
            }
        },
        {new:true},
       );

       // update category schema
       // TODO:: CHECK LATER
       await Category.findByIdAndUpdate(
        {_id: category},
        {
            $push: {
                course : newCourse._id,
            }
        },
        {new: true},
       );

       // Return Response
       return res.status(200).json({
            success: true,
            message: "Course Created successfully",
            data: newCourse,
        })

    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
            error:error.message,
        });
    }
}

// getAllCourse Handler Function 
exports.showAllCourses = async (req, res) => {
    try{

        const allCourses = await Course.find({}, {  courseName:true,
                                                    price: true,
                                                    thumbnail: true,
                                                    instructor: true,
                                                    ratingAndReviews: true,
                                                    studentEnrolled: true,})
                                                    .populate("instructor")
                                                    .exec();

        return res.status(200).json({
            success: true,
            message: "Data for all courses fetch successfull ",
            data:allCourses,
        });       

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot fetch course Data",
            error:error.message,
        });
    }
}

// getCourseDetails Handler function
exports.getCourseDetails = async (req, res) => {
    try{

        // get ID
        const {courseId} = req.body;

        // Find course details
        const courseDetails = await Course.find({_id: courseId})
                                                .populate(
                                                    {
                                                        path: "instructor",
                                                        populate: {
                                                            path: "additionalDetails",
                                                        },
                                                    }
                                                )
                                                .populate("category")
                                                //.populate("ratingandreviews")
                                                .populate({
                                                    path: "courseContent",
                                                    populate: {
                                                        path: "subSection",
                                                    },
                                                })
                                                .exec();
        
        // validation
        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message: `could not find the course with ${courseId}`
            })
        }

        // Return Response
        return res.status(200).json({
            success: true,
            message: "course details fetched successfully",
            data: courseDetails,
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    } 
}