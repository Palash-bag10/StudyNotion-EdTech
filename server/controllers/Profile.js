const User = require("../models/User");
const Profile = require("../models/Profile");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


exports.updateProfile = async (req, res) => {
    try{

        // get Data
        const {dateOfBirth = "", about = "", contactNumber} = req.body; 

        // Get userId
        const id = req.user.id;
        // console.log(id)

        // Validation
        // if(!contactNumber || !id){
        //     return res.status(400).json({
        //         success: false,
        //         message: "All Fields are required",
        //     })
        // }

        // find Profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        // Update Profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        // profileDetails.gender = gender;

        await profileDetails.save();

        // Return Response
        return res.json({
            success: true,
            message: "Profile Updated Successfully",
            profileDetails,
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to update profile, Please Try Again",
            error:error.message,
        });
    }
}

// DELETE ACCOUNT
exports.deleteAccount = async (req, res) => {
    try{

        // TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
		// console.log(job);

        // get id
        const id = req.user.id;

        // validation
        const userDetails = await User.findById({ _id: id });
        if(!userDetails){
            return res.status(400).json({
                success: false,
                message: "User Not Found",
            });
        }

        // delete Profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        // TODO: HW--> Unenroll user from all enrolled Course(PENDING)
        
        // delete User
        await User.findByIdAndDelete({_id:id});

        // Return Response
        return res.status(200).json({
            success: true,
            message: "Account deleted Successfully",
            
        })
        
    }catch(error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete account, Please Try Again",
            error:error.message,
        });
    }
}

// GET ALL USER DETAILS HANDLER FUNCTION
exports.getAllUserDetails = async (req, res) => {
    try{

        // get id
        const id = req.user.id;

        // validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        console.log(userDetails);

        // return response
        return res.status(200).json({
            success: true,
            message: "User Data Fetched Successfully",
            data: userDetails,
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// Update Display Picture
exports.updateDisplayPictue = async (req, res) => {
    try{

        // get userID
        const userId = req.user.id;

        // get displayPicture
        const displayPicture = req.files.displayPicture;

        // upload picture to cloudinary
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        );
        console.log(image)

        // update profile
        const updateProfile = await User.findByIdAndUpdate(
            {_id: userId},
            {image: image.secure_url},
            {new: true}
        )
        // return res
        return res.send({
            success: true,
            message: "Image Update Successfully",
            data: updateProfile,
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}

// GET ENROLLED COURSES [PENDING]
exports.getEnrolledCourse = async (req, res) => {
    try{

        // GET USER ID
        const userId = req.user.id;

        // GET ALL COURSE WITH THIS ID
        const userDetails = await User.findOne({
            _id: userId,
        }).populate("courses").exec()

        // VALIDATION
        if(!userDetails){
            return res.status(400).json({
                success: false,
                message: `Could Not find user with id ${userDetails}`,
            })
        }

        // RETURN RESPONSE
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
          })

    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}