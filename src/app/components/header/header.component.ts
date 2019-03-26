import { appService } from './../../services/mahaliServices/mahali.service';
import { UseraccountComponent } from './../useraccount/useraccount.component';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { LoginComponent } from '../../components/login/login.component';
import { Router } from '@angular/router';
import { RegistrationComponent } from '../../components/registration/registration.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var jQuery: any;
declare var $: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
    @Input() cartCount: number;
    @Input() billing: number;
    registerForm: FormGroup;
    loginForm: FormGroup;
    forgotForm: FormGroup;
    submitted = false;
    loginSubmitted = false;
    forgotSubmitted = false;
    category: any;
    product: any;
    loginDetails: any;
    myAccount: boolean = false;
    changePassForm: FormGroup;
    phone: boolean = false;
    showdetails = false;
    selectedCat;
    cartDetails = [];
    cartData: any = []
    showSubCats = false;
    showCartDetail = false;
    showLoginScreen = true;
    showRegistration = true;
    showOpacity = false;
    showLogin = false;
    IsmodelShow = false;
    showCategories = false;
    changePwSubmitted = false;
    subcat = [];
    subCatData = [];
    subId;

    constructor(public dialog: MatDialog, private router: Router, public appService: appService, private formBuilder: FormBuilder) {
        if (sessionStorage.userId === undefined) {
            this.showRegistration = true;
            this.showLoginScreen = true;
            this.myAccount = false;
        } else {
            this.showRegistration = false;
            this.showLoginScreen = false;
            this.myAccount = true;
            this.phone = true;
            this.userMobile = JSON.parse(sessionStorage.getItem('phone'));
            this.userName = (sessionStorage.getItem('userName'));
        }
        // if (sessionStorage.userId === "undefined") {
        //     // this.getCartWithoutLogin();
        // } else {
        this.getCart();
        this.updateGetCart();
        // }
        // if (sessionStorage.type! = 'vendorGrocery') {
        //     sessionStorage.clear();
        // }
    }
    item = {
        quantity: 1
    }
    userMobile;
    userName;
    location;
    ngOnInit() {
        if (sessionStorage.token === undefined) {
            this.showRegistration = true;
            this.showLoginScreen = true;
            this.myAccount = false;
        } else {
            this.showRegistration = false;
            this.showLoginScreen = false;
            this.myAccount = true;
            this.phone = true;
            this.userMobile = JSON.parse(sessionStorage.getItem('phone'));
            this.userName = (sessionStorage.getItem('userName'));
        }
        // if ((sessionStorage.token)! === undefined) {
        //     this.showRegistration = false;
        //     this.showLoginScreen = false;
        //     this.myAccount = true;
        // }
        // if(navigator.geolocation){
        //     navigator.geolocation.getCurrentPosition(position => {
        //         this.lat=position.coords.latitude;
        //         this.long=position.coords.longitude;

        //         var latlng = { lat: this.lat, lng:this.long };

        //        let geocoder = new google.maps.Geocoder();
        //      geocoder.geocode(  {'location':latlng}, (results, status) => {
        //      if (status == google.maps.GeocoderStatus.OK) {
        //      let result = results[0];
        //      let rsltAdrComponent = result.address_components;
        //      let resultLength = rsltAdrComponent.length;
        //      if (result != null) {
        //      } else {
        //      window.alert('Geocoder failed due to: ' + status);
        //      }
        //      }
        //      });
        //      });     
        //    };


        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.location = position.coords;
            });
        }
        this.registerForm = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', Validators.required],
            mobile_number: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            bussiness_latitude: 16.398956,
            bussiness_longitude: 78.637009
        });
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
        this.forgotForm = this.formBuilder.group({
            mob_number: ['', [Validators.required]],
        });
        this.changePassForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
        this.getCategories();
        this.getProduct();
        if (sessionStorage.userId != undefined) {
            this.updateGetCart();
        }
        this.getCart();
    }

    // showLogin() {
    //     const dialogConfig = new MatDialogConfig();
    //     dialogConfig.disableClose = true;
    //     dialogConfig.autoFocus = true;
    //     this.dialog.open(LoginComponent, dialogConfig);
    // }


    // showRegistration() {
    //     const dialogConfig = new MatDialogConfig();
    //     dialogConfig.disableClose = true;
    //     dialogConfig.autoFocus = true;
    //     this.dialog.open(RegistrationComponent, dialogConfig);

    // }
    showLoginPop() {
        this.showLogin = true;
    }
    showCartItems() {
        this.showCartDetail = !this.showCartDetail;
    }
    showProduxtDetails() {
        this.router.navigate(['/productdetails'], { queryParams: { order: 'popular' } });
    }
    showAddress() {
        this.router.navigate(['/address'], { queryParams: { order: 'popular' } });
    }
    showProbyCat(catId, action, catName) {
        this.showSubCats = false;
        this.showCategories = false;
        this.showOpacity = false;
        // this.selectedCat = index;
        this.router.navigate(['/products'], { queryParams: { catId: catId, action: action, catName: catName } });
        $("#itemdesc").modal("hide");
    }
    showProbySubCat(SubCatId, action, catName, subCat) {
        this.showSubCats = false;
        this.showCategories = false;
        this.showOpacity = false;
        this.router.navigate(['/products'], { queryParams: { subId: SubCatId, action: action, catName: catName, subCat: subCat } });
        $("#itemdesc").modal("hide");
    }
    signOut() {
        // sessionStorage.removeItem('token');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('phone');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('session');
        this.showRegistration = true;
        this.showLoginScreen = true;
        this.myAccount = false;
        this.phone = false;
        sessionStorage.clear();
        this.router.navigate(["/"]);
        this.getCart();
        this.ngOnInit();
        location.reload();
    }
    get f() { return this.registerForm.controls; }
    registration(form: FormGroup) {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        this.appService.registration(this.registerForm.value).subscribe(resp => {
            // this.users = resp.json();
            if (resp.json().status === 200) {
                swal(resp.json().message, "", "success");
                jQuery("#signupmodal").modal("hide");
                // this.showRegistration = false;
                sessionStorage.setItem('userId', (resp.json().id));
                // this.myAccount = true
                // this.showOpacity = false;
                // this.onCloseCancel();
                this.router.navigate(['/address']);
            }
            else if (resp.json().status === 400) {
                swal(resp.json().message, "", "error");
                // jQuery("#signupmodal").modal("hide");
            }
        })

    }
    get f1() { return this.loginForm.controls; }
    login() {
        this.loginSubmitted = true;

        if (this.loginForm.invalid) {
            return;
        }
        this.appService.login(this.loginForm.value).subscribe(resp => {
            if (resp.json().status === 200) {
                swal(resp.json().message, "", "success");
                jQuery("#loginmodal").modal("hide");
                this.IsmodelShow = true;

                // sessionStorage.setItem('token', (resp.json().token));
                this.showRegistration = false;
                this.showLoginScreen = false;
                this.showLogin = false;
                this.myAccount = true;
                this.appService.loginDetailsbyEmail(this.loginForm.value.email).subscribe(response => {
                    sessionStorage.setItem('phone', JSON.stringify(response.json().data[0].mobile_number));
                    sessionStorage.setItem('email', (response.json().data[0].email));
                    sessionStorage.setItem('userId', (response.json().data[0].id));
                    sessionStorage.setItem('userName', (response.json().data[0].first_name) + " " + (response.json().data[0].last_name));
                    sessionStorage.setItem('token', response.json().data[0].token);

                    this.loginDetails = response.json().data[0];
                    this.router.navigate(['/']);
                    this.phone = true;
                    this.ngOnInit();
                    // window.location.reload();
                })
            }
            else if (resp.json().status === 404 || resp.json().status === 400 || resp.json().status === 401) {
                swal(resp.json().message, "", "error");
                this.router.navigate(['/address']);
                jQuery("#loginmodal").modal("hide");
                jQuery("#signupmodal").modal("hide");
                sessionStorage.setItem('userId', (resp.json().id));
            }
        })
    }
    getCategories() {
        this.appService.getCategories().subscribe(resp => {
            this.category = resp.json().categories;
            // this.showSubCat(this.subId);
        })
    }

    showSubCat(Id) {
        this.subId = Id;
        this.subCatData = [];
        this.showSubCats = true;
        for (var i = 0; i < this.category.length; i++) {
            for (var j = 0; j < this.category[i].subcategory.length; j++) {
                if (Id === this.category[i].subcategory[j].category_id) {
                    this.category[i].subcategory[j].cat_name = this.category[i].category_name;
                    this.subCatData.push(this.category[i].subcategory[j]);
                }
            }
        }
    }
    getProduct() {
        this.appService.getProduct().subscribe(resp => {
            this.product = resp.json().products;
        });
    }

    get f2() { return this.forgotForm.controls; }
    forgot() {
        this.forgotSubmitted = true;
        if (this.forgotForm.invalid) {
            return;
        }
        var inData = {
            mobile_number: this.forgotForm.value.mob_number
        }
        this.appService.forgotPassword(inData).subscribe(resp => {
            if (resp.json().status === 200) {
                jQuery("#forgotpass").modal("hide");
                swal(resp.json().message, "", "success");
                jQuery("#otpScreen").modal("show");
                sessionStorage.setItem('mobile_number', (this.forgotForm.value.mob_number));
            } else {
                swal(resp.json().message, "", "error");
            }


        }, err => {
            swal(err.json().message, "", "error");
        })
    }
    otpNumber;
    otpScreen() {
        var data = {
            'otp': this.otpNumber,
            'mobile_number': sessionStorage.mobile_number
        }
        this.appService.otpVerify(data).subscribe(resp => {
            if (resp.json().status === 200) {
                swal(resp.json().message, "", "success");
                jQuery("#otpScreen").modal("hide");
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                jQuery("#changepwd").modal("show");

            } else {
                swal(resp.json().message, "", "error");
            }
        })
        // jQuery("#otpScreen").modal("hide");
        // $('body').removeClass('modal-open');
        // $('.modal-backdrop').remove();
        // jQuery("#changepwd").modal("show");

    }
    get f4() { return this.changePassForm.controls; }
    ChangePw() {
        this.changePwSubmitted = true;

        if (this.changePassForm.invalid) {
            return;
        }
        this.changePassForm.value.mobile_number = sessionStorage.mobile_number;
        this.appService.changePwForgot(this.changePassForm.value).subscribe(resp => {
            if (resp.json().status === 200) {
                swal(resp.json().message, "", "success");
                jQuery("#changepwd").modal("hide");
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            } else {
                swal(resp.json().message, "", "error");
            }
        }, err => {

        })
    }
    lat;
    long;
    // getLocation(){
    //     if(navigator.geolocation){
    //         navigator.geolocation.getCurrentPosition(position => {
    //             this.lat=position.coords.latitude;
    //             this.long=position.coords.longitude;
    //             var latlng = { lat: this.lat, lng:this.long };

    //            let geocoder = new google.maps.Geocoder();
    //          geocoder.geocode(  {'location':latlng}, (results, status) => {
    //          if (status == google.maps.GeocoderStatus.OK) {
    //          let result = results[0];
    //          let rsltAdrComponent = result.address_components;
    //          let resultLength = rsltAdrComponent.length;
    //          if (result != null) {
    //          } else {
    //          window.alert('Geocoder failed due to: ' + status);
    //          }
    //          }
    //          });
    //          });     
    //        };
    // }
    updateGetCart() {
        var inData = {
            vender_id: sessionStorage.userId
        }
        this.appService.updateGetCart(inData).subscribe(res => {
            console.log(res.json().message);
            this.getCart();
        })
    }



    getCart() {
        var inData = sessionStorage.getItem('userId');
        this.appService.getCart(inData).subscribe(res => {
            // if (res.json().count === 0) {
            //     this.cartCount = res.json().count;
            //     this.billing = 0;
            //     return;
            // } else {
            // if (sessionStorage.userId != undefined) {
            this.cartData = res.json().cart_details;
            if (this.cartData.length != "undefined") {
                for (var i = 0; i < this.cartData.length; i++) {
                    this.cartData[i].products.skuValue = this.cartData[i].products.sku_details[0].size;
                    this.cartData[i].products.skid = this.cartData[i].products.sku_details[0].skid;
                    this.cartData[i].products.selling_price = this.cartData[i].products.sku_details[0].selling_price;
                    this.cartData[i].products.offer_price = this.cartData[i].products.sku_details[0].offer_price;
                    this.cartData[i].prodName = this.cartData[i].products.product_name;
                    this.cartData[i].products.img = this.cartData[i].products.sku_details[0].sku_images[0].sku_image;
                }
                this.cartCount = res.json().count;
                this.billing = res.json().selling_Price_bill;
            }
            // }

            // }


        }, err => {

        })
    }
    // getCartWithoutLogin() {
    //     this.appService.getCartWithoutLogin().subscribe(res => {
    //         this.cartData = res.json().cart_details;
    //         if (this.cartData.length != "undefined") {
    //             for (var i = 0; i < this.cartData.length; i++) {
    //                 this.cartData[i].products.skuValue = this.cartData[i].products.sku_details[0].size;
    //                 this.cartData[i].products.skid = this.cartData[i].products.sku_details[0].skid;
    //                 this.cartData[i].products.selling_price = this.cartData[i].products.sku_details[0].selling_price;
    //                 this.cartData[i].prodName = this.cartData[i].products.product_name;
    //                 this.cartData[i].products.img = this.cartData[i].products.sku_details[0].sku_images[0].sku_image;
    //             }
    //             this.cartCount = res.json().count;
    //             this.billing = res.json().selling_Price_bill;
    //         }
    //     })
    // }
    delCart(cartId) {
        var inData = cartId;
        this.appService.delCart(inData).subscribe(res => {
            swal(res.json().message, "", "success");
            this.getCart();
        }, err => {

        })
    }
    search(product, action) {
        // this.appService.searchProducts(product).subscribe(res=> {
        this.router.navigate(['/products'], { queryParams: { product: product, action: action } });
        // },err=> {

        // })    
    }

    hidesub() {
        this.showCategories = !this.showCategories;
        this.showOpacity = true;
        this.showSubCats = false;
    }
    //modify cart
    itemIncrease(cartId) {
        for (var i = 0; i < this.cartData.length; i++) {
            if (this.cartData[i].cart_id === cartId) {
                this.cartData[i].quantity = this.cartData[i].quantity + 1;
                this.modifyCart(this.cartData[i].quantity, cartId);
                // this.getCart();
                return;
            }
        }
    }

    itemDecrease(cartId) {
        for (var i = 0; i < this.cartData.length; i++) {
            if (this.cartData[i].cart_id === cartId) {
                if (this.cartData[i].quantity === 1) {
                    this.delCart(cartId);
                    return;
                } else {
                    this.cartData[i].quantity = this.cartData[i].quantity - 1;
                    this.modifyCart(this.cartData[i].quantity, cartId);
                }
                // this.getCart();
                return;
            }
        }

    }

    modifyCart(quantity, cartId) {
        var params = {
            "quantity": quantity
        }

        this.appService.modifyCart(params, cartId).subscribe(resp => {
            if (resp.json().status === 200) {
                // swal(resp.json().message, "", "success");
                jQuery("#signupmodal").modal("hide");
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                this.getCart();
                // this.showRegistration = false;
                // localStorage.setItem('userId', (resp.json().reg_id));
                // this.myAccount = true
                // this.showOpacity = false;
                // this.onCloseCancel();
                // this.router.navigate(['/address']);
            }
        }, err => {

        })
    }
}
