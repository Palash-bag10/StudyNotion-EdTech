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