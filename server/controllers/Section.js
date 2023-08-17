const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
    try{

        // Data fetch
        const {sectionName, courseId} = req.body;

        // Data Validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: "Missing Property",
            })
        }

        // Create Section
        const newSection = await Section.create({sectionName})

        // Update Course with Section objectID
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                }
            },
            {new:true},
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            },
        }).exec();
        // HW(DONE): use POPULATE to replace section/sub-sections both in the updatedCourseDetails

        // Return Response
        return res.status(200).json({
            success: true,
            message: "Section Created Successfully",
            updatedCourseDetails,
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to create section, Please Try Again",
            error:error.message,
        });
    }
}

// UPDATE SECTION HANDLER FUNCTION
exports.updateSection = async(req, res) => {
    try{

        // Fetch Data
        const {sectionName, sectionId} = req.body;

        // Data Validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success: false,
                message: "Missing Property",
            })
        }

        // Update data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});

        // Return response
        return res.status(200).json({
            success: true,
            message: "Section Updated Successfully",
            section,
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to update section, Please Try Again",
            error:error.message,
        });
    }
}

// DELETE SECTION HANDLER FUNCTION
exports.deleteSection = async (req, res) => {
    try{

        // Get Id- assuming that we are sending id in Params
        const {sectionId} = req.params;

        // use FindByIdAndDelete
        await Section.findByIdAndDelete(sectionId);
        //TODO[Testing]: do we need to delete the entry from course schema??

        // return response
        return res.status(200).json({
            success: true,
            message: "Section Deleted Successfully",
            updatedCourseDetails,
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to delete section, Please Try Again",
            error:error.message,
        });
    }
}