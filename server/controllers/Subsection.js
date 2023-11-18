const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createSubSection = async(req,res) => {
    try{

        // Fetch data
        const {sectionId, title, description} = req.body;

        // extract file/video
        const video = req.files.video;

        // validation
        if(!sectionId || !title || !description || !video){
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            })
        }
        console.log(video)

        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // Create a sub-section
        const SubSectionDetails = await SubSection.create({
            title: title,
            timeDuration: `${uploadDetails.duration}`,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });

        // update Section with this subsection object id
        const updateSection = await Section.findByIdAndUpdate(
            {_id: sectionId},
            {
                $push: {
                    subSection: SubSectionDetails._id,
                }
            },
            {new: true}
        ).populate("subSection");
        // HW(DONE):: log update section here, after adding populate queary

        //return response
        return res.status(200).json({
            success: true,
            message: "Sub-Section Created Successfully",
            data: updateSection,
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to create sub-section, Please Try Again",
            error:error.message,
        });
    }
}

///// HOME WORK [CHECK LATER] /////
// UPDATE SUB_SECTION HANDLER
exports.updateSubsection = async(req,res) => {
    try{

        // Fetch Data
        const {sectionId, title, description} = req.body;

        //data Validation
        if(!sectionId || !title || !description){
            return res.status(400).json({
                success: false,
                message: "Missing Property"
            })
        }

        // update Data
        const subSection = await SubSection.findByIdAndUpdate(sectionId, title, description, {new: true})

        // return response
        return res.status(200).json({
            success: true,
            message: "Sub-Section Updated Successfully",
            subSection,
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to update sub-section, Please Try Again",
            error:error.message,
        });
    }
}

///// HOME WORK [CHECK LATER] /////
// DELETE SUB_SECTION HANDLER FUNCTION
exports.deleteSubsection = async(req, res) => {
    try{

        //get Id
        const {sectionId} = req.params;

        //use FindByIdAndDelete
        await SubSection.findByIdAndDelete(sectionId);

        //retun response
        return res.status(200).json({
            success: true,
            message: "Sub-Section Deleted Successfully",
            // subSectionDetails,
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to delete sub-section, Please Try Again",
            error:error.message,
        });
    }
}