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
    delCart:baseUrl+'vendor/cart_details',
    getCart: baseUrl + 'vendor/cart_details',
    loginDetailsUrl: baseUrl + 'vendors/',
    getWholeSellersUrl: baseUrl + 'wholesalers',
    getBanners:baseUrl+'banners',
    ProductById:baseUrl+"products/product_id",
    wholesellerById:baseUrl+"wholesalers",
    addaddress:baseUrl+"delivery_address",
    getAddress:baseUrl+"delivery_address",
    delAddress:baseUrl+"delivery_address",
    setDelAdd:baseUrl+"delivery_address",
    paymentType:baseUrl+"payment_options",
    palceOrder:baseUrl+"place_order",
    getPlaceOrd:baseUrl+"place_order/vendor_orders/vendor_id",
    orderSummary:baseUrl+"place_order/order_summary",
    productByCatId:baseUrl+"products/category",
    productBySubCatId:baseUrl+"products/sub_category_id",
    businessDetails:baseUrl+"vendors/update_profile",
    taxDetails:baseUrl+"vendors/update_profile",
    bankDetails:baseUrl+"vendors/update_profile",
    getAccDetails:baseUrl+"vendors/account_details",
    updateAcc:baseUrl+"vendors/update_profile",
    searchProducts:baseUrl+'products/search',
    wholeProducts:baseUrl+"/products/wholesaler_products",
    ordById:baseUrl+"place_order/order_products",
    reqProducts:baseUrl+"place_order/request_products/vendor",
    updateProd:baseUrl+"place_order/pricing"
}