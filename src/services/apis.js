// const BASE_URL = process.env.REACT_APP_BASE_URL
const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signUp",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSWORDTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories"
}

export const contactusEndpoints = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
}

export const settingsEndpoints = {
    UPDATE_PROFILE_PICTURE_API: BASE_URL + "/profile/updateDisplayPictue",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateprofile",
    DELETE_ACCOUNT_API: BASE_URL + "/profile/deleteaccount",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
}

// PROFILE ENDPOINTS

export const profileEndPoints = {
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourse"
}

// COURSE ENDPOINTS
export const courseEndPoints = {
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    CREATE_COURSE_API: BASE_URL + "/course/createcourse",
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourse",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
}