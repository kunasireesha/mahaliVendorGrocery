import { AppSettings } from './../constants/constants';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class appService {
    product: any;
    constructor(private http: Http) { }
    registration(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.registrationUrl, params, { headers: headers });
    }
    login(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.loginUrl, params, { headers: headers });
    }
    changePwd(params) {
        const headers = new Headers({
            'Content-Type': "application/JSON",
            'x-access-token': localStorage.token,
        });
        return this.http.post(AppSettings.changePwdUrl, params, { headers: headers });
    }
    forgotPassword(params) {
        const headers = new Headers({
            'Content-Type': "application/JSON",
            'x-access-token': (localStorage.token),
        });
        return this.http.post(AppSettings.forgotPw, params, { headers: headers });
    }
    getCategories() {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.categoriesUrl, { headers: headers });
    }
    getSubCat(catId) {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.subCatUrl + '/' + catId, { headers: headers });
    }
    getProduct() {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.productUrl, { headers: headers })
    }
    loginDetailsbyEmail(formValaues) {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.loginDetailsUrl + formValaues, { headers: headers })
    }
    getWholeSellers() {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.getWholeSellersUrl, { headers: headers })
    }
    addtoCart(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.addToCart, params, { headers: headers });
    }
    getCart(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getCart + "/" + params, { headers: headers });
    }
    updateProfile(params) {
        const headers = new Headers({
            'Content-Type': "application/JSON",
            'x-access-token': (localStorage.token),
        });
        return this.http.put(AppSettings.updateProfile, params, { headers: headers })
    }
    getBanners(){
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getBanners , { headers: headers });       
    }
    getProductById(params){
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.ProductById + "/" + params, { headers: headers });   
    }
    getWholesellerById(params){
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.wholesellerById + "/" + params, { headers: headers });   
    }
    vendor_id
    delCart(params){
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = localStorage.getItem('userId');
        return this.http.delete(AppSettings.delCart + "/" + this.vendor_id + "/" + params, { headers: headers });     
    }
    addaddress(params){
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = localStorage.getItem('userId');
        return this.http.post(AppSettings.addaddress + "/" + this.vendor_id,params, { headers: headers });
    }
    getAddress(){
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = localStorage.getItem('userId');
        return this.http.get(AppSettings.getAddress + "/" + this.vendor_id, { headers: headers });
    }
    delAddress(params){
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.delete(AppSettings.delAddress + "/" +params , { headers: headers });
    }
    setDelAdd(params){
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = localStorage.getItem('userId');
        return this.http.put(AppSettings.setDelAdd + "/" +this.vendor_id+"/"+params , { headers: headers });
    }
    paymentType(){
        const headers = new Headers({ 'Content-Type': "application/JSON" }); 
        return this.http.get(AppSettings.paymentType , { headers: headers });
    }
    palceOrder(params){
        const headers = new Headers({ 'Content-Type': "application/JSON" }); 
        return this.http.post(AppSettings.palceOrder ,params, { headers: headers });    
    }
    getPlaceOrder(){
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = localStorage.getItem('userId'); 
        return this.http.get(AppSettings.getPlaceOrd+"/"+this.vendor_id , { headers: headers });    
    }
    orderSummary(ordId){
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.orderSummary+"/"+ordId, { headers: headers });     
    }
    productByCatId(params){
        const headers = new Headers({ 'Content-Type': "application/JSON" }); 
        return this.http.get(AppSettings.productByCatId+"/"+ params, { headers: headers });   
    }
    productBySubCatId(params){
        const headers = new Headers({ 'Content-Type': "application/JSON" }); 
        return this.http.get(AppSettings.productBySubCatId+"/"+ params, { headers: headers });   
    }
    businessDetails(params){
        this.vendor_id = localStorage.userId;
        const headers = new Headers({ 'Content-Type': "application/JSON" }); 
        return this.http.put(AppSettings.businessDetails+"/"+this.vendor_id,params, { headers: headers });
    }
    taxDetails(params){
        this.vendor_id = localStorage.userId;
        const headers = new Headers({ 'Content-Type': "application/JSON" }); 
        return this.http.put(AppSettings.taxDetails+"/"+this.vendor_id,params, { headers: headers });
    }
    bankDetails(parmas){
        this.vendor_id = localStorage.userId;
        const headers = new Headers({ 'Content-Type': "application/JSON" }); 
        return this.http.put(AppSettings.bankDetails+"/"+this.vendor_id,parmas, { headers: headers });
    }
    getAccDetails(){
        this.vendor_id = localStorage.userId;
        const headers = new Headers({ 'Content-Type': "application/JSON" }); 
        return this.http.get(AppSettings.getAccDetails+"/"+this.vendor_id, { headers: headers });
    }
    updateAcc(params){
        this.vendor_id = localStorage.userId;
        const headers = new Headers({ 'Content-Type': "application/JSON" }); 
        return this.http.put(AppSettings.updateAcc+"/"+this.vendor_id,params, { headers: headers });
    }
    searchProducts(params){
        const headers = new Headers({ 'Content-Type': "application/JSON" }); 
        return this.http.get(AppSettings.searchProducts+"/"+params, { headers: headers });
    }
    wholeProducts(params){
        const headers = new Headers({ 'Content-Type': "application/JSON" }); 
        return this.http.get(AppSettings.wholeProducts+"/"+params, { headers: headers });
    }
    orderById(params){
        const headers = new Headers({ 'Content-Type': "application/JSON" }); 
        return this.http.get(AppSettings.ordById+"/"+params, { headers: headers });
    }
    reqOrder(params){
        const headers = new Headers({ 'Content-Type': "application/JSON" }); 
        this.vendor_id = localStorage.userId;
        return this.http.get(AppSettings.reqProducts+"/"+this.vendor_id+"/"+params, { headers: headers });
    }
    update(params){
        const headers = new Headers({ 'Content-Type': "application/JSON" }); 
        this.vendor_id = localStorage.userId;
        return this.http.put(AppSettings.updateProd,params, { headers: headers });
    }
}

