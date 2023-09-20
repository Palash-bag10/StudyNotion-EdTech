const Category = require("../models/Category");

// Create Handler function for tag
exports.createCategory = async (req, res) => {
    try{

        // Fetch Data
        const {name, description} = req.body;

        // Validation
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        // Create Entry in DB
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(categoryDetails);

        // Return Response
        return res.status(200).json({
            success: true,
            message: "Categories Created Successfully",
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

// Create Handler function for getAllCategories
exports.showAllCategories = async (req, res) => {
    try{

        // find All Tags
        const allCategories = await Category.find();

        // Return Response
        return res.status(200).json({
            success: true,
            message: "All Categories return Successfully",
            data:allCategories,
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

// CATEGORY PAGE DETAIS HANDLER
// PENDING [DONE]
exports.categoryPageDetails = async (req,res) => {
    try{

        // get categoryId
        const {courseId} = req.body;

        // get courses for spacified category
        const selectedCategory = await Category.findById(courseId)
                                        .populate("course")
                                        .exec();

        // validation
        if(!selectedCategory){
            return res.status(404).json({
                success: false,
                message: "Data not found",
            })
        }

        // get courses for different category
        const differentCategories = await Category.find({
                                    _id: {$ne: courseId},
                                })
                                .populate("course")
                                .exec();

        // get top selling course
        // HW [DONE]
        const getAllCategory = await Category.find().populate("course").exec();
        const getAllCourse = getAllCategory.flatMap((category) => category.course);
        const topSellingCourses = getAllCourse.sort((a, b) => b.sold - a.sold).slice(0, 10);

        // return response
        return res.status(200).json({
            success: true,
            // message: "All Tag return Successfully",
            data: {
                selectedCategory,
                differentCategories,
                topSellingCourses,
            },
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}