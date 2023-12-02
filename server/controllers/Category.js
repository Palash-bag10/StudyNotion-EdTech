const Category = require("../models/Category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

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
        const {categoryId} = req.body
        console.log("PRINTING CATEGORY ID: ", categoryId)

        // get courses for spacified category
        const selectedCategory = await Category.findById(categoryId)
        .populate({
            path: "courses",
            match: {status: "Published"},
            populate: "ratingAndReviews",
        }).exec()   
        console.log("SELECTED CAT", selectedCategory)      

        // validation
        if(!selectedCategory) {
            console.log("Category Not Found")
            return res.status(404).json({
                success: false,
                message: "Category not found",
            })
        }

        // Handle the case when there are no courses
        if(selectedCategory.courses.length === 0) {
            console.log("No Courses Found for the Selected Category.")
            return res.status(404).json({
                success: false,
                message: "No Courses Found for the Selected Category.",
            })
        }

        // get courses for different category
       const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
       })

       let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
       ).populate({
        path: "courses",
        match: { status: "Published" },
       }).exec()

        // get top selling course
        const allCategories = await Category.find()
        .populate({
            path: "courses",
            match: {status: "Published"},
            populate: {
                path: "instructor",
            },
        }).exec()

        const allCourses = allCategories.flatMap((category) => category.courses)

        const mostSellingCourses = allCourses.sort((a, b) => b.sold - a.sold).slice(0, 10)
        
        // return response
        res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
        })
         
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        })
    }
}