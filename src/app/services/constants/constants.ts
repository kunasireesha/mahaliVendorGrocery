const baseUrl = 'http://192.169.243.70:3000/v1/'

export const AppSettings = {
    registrationUrl: baseUrl + 'vendors/registration',
    loginUrl: baseUrl + 'vendors/login',
    forgotPw: baseUrl + 'vendors/forgot_password',
    changePwdUrl: baseUrl + 'vendors/changepassword',
    updateProfile: baseUrl + 'vendors/update_profile',
    categoriesUrl: baseUrl + 'categories/',
    subCatUrl: baseUrl + 'sub_categories',
    productUrl: baseUrl + 'products',
    addToCart: baseUrl + "vendor/cart_details",
    getCart: baseUrl + 'vendor/cart_details',
    loginDetailsUrl: baseUrl + 'vendors/',
    getWholeSellersUrl: baseUrl + 'wholesalers'
}