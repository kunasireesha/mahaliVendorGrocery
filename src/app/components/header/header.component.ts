import { appService } from './../../services/mahaliServices/mahali.service';
import { UseraccountComponent } from './../useraccount/useraccount.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { LoginComponent } from '../../components/login/login.component';
import { Router } from '@angular/router';
import { RegistrationComponent } from '../../components/registration/registration.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 var $: any;
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
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
    phone: boolean = false;
    showdetails = false;
    showSubCats = false;
    showCartDetail = false;
    showLoginScreen = true;
    showRegistration = true;
    showOpacity = false;
    showLogin=false;
    IsmodelShow=false;
    subcat = [];

    constructor(public dialog: MatDialog, private router: Router, public appService: appService, private formBuilder: FormBuilder) { 
        if (localStorage.token === undefined) {
            this.showRegistration = true;
            this.showLoginScreen = true;
            this.myAccount = false;
        } else {
            this.showRegistration = false;
            this.showLoginScreen = false;
            this.myAccount = true;
            this.phone = true;
            this.userMobile = JSON.parse(localStorage.getItem('phone'));
            this.userName = (localStorage.getItem('userName'));
        }
    }
    item = {
        quantity: 1
    }
    userMobile;
    userName;
    location;
    ngOnInit() {
        if (localStorage.token === undefined) {
            this.showRegistration = true;
            this.showLoginScreen = true;
            this.myAccount = false;
        } else {
            this.showRegistration = false;
            this.showLoginScreen = false;
            this.myAccount = true;
            this.phone = true;
            this.userMobile = JSON.parse(localStorage.getItem('phone'));
            this.userName = (localStorage.getItem('userName'));
        }
        // if ((localStorage.token)! === undefined) {
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
        //      console.log(rsltAdrComponent[resultLength-5].short_name)
        //      } else {
        //      window.alert('Geocoder failed due to: ' + status);
        //      }
        //      }
        //      });
        //      });     
        //    };

        console.log(this.location);
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
              this.location = position.coords;
            });
         }
        this.registerForm = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            mobile_number: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            business_latitude:16.398956,
            business_longitude:78.637009
        });
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
        this.forgotForm = this.formBuilder.group({
            mob_number: ['', [Validators.required]],
        });
        this.getCategories();
        this.getProduct();
        this.login();
        // this.getLocation();
        this.getCart();
    }
    
    hideSubCats() {
        this.showSubCats = false;
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
    showLoginPop(){
        this.showLogin=true;
    }
    showCartItems() {
        this.showCartDetail = !this.showCartDetail;
    }
    itemIncrease() {
        let thisObj = this;

        thisObj.item.quantity = Math.floor(thisObj.item.quantity + 1);

    }
    itemDecrease() {
        let thisObj = this;
        if (thisObj.item.quantity === 1) {
            return;
        }
        thisObj.item.quantity = Math.floor(thisObj.item.quantity - 1);

    }
    showProduxtDetails() {
        this.router.navigate(['/productdetails'], { queryParams: { order: 'popular' } });
    }
    showAddress() {
        this.router.navigate(['/address'], { queryParams: { order: 'popular' } });
    }
    showProbyCat(catId,action) {
        this.showSubCats = false;
        this.router.navigate(['/freshvegetables'], { queryParams: { catId: catId,action:action } });
    }
    showProbySubCat(SubCatId,action){
        this.showSubCats = false;
        this.router.navigate(['/freshvegetables'], { queryParams: { subId: SubCatId,action:action } });    
    }
    signOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('phone');
        this.showRegistration = true;
        this.showLoginScreen = true;
        this.myAccount = false;
        this.phone = false;
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
                // $("#signupmodal").modal("hide");
                // this.showRegistration = false;

                // this.myAccount = true
                // this.showOpacity = false;
                // this.onCloseCancel();
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
                // $("#loginmodal").modal("hide");
                this.IsmodelShow=true;
               
                localStorage.setItem('token', (resp.json().token));
                this.showRegistration = false;
                this.showLoginScreen = false;
                this.showLogin=false;
                this.myAccount = true;
                this.appService.loginDetailsbyEmail(this.loginForm.value.email).subscribe(response => {
                    localStorage.setItem('phone', JSON.stringify(response.json().data[0].mobile_number));
                    localStorage.setItem('email', (response.json().data[0].email));
                    localStorage.setItem('userId', (response.json().data[0].id));
                    localStorage.setItem('userName', (response.json().data[0].first_name) + " " + (response.json().data[0].last_name));
                    this.loginDetails = response.json().data[0];
                    this.phone = true;
                    this.ngOnInit();
                    window.location.reload();
                })
            }
            else if (resp.json().status === 404 || resp.json().status === 400 || resp.json().status === 401) {
                swal(resp.json().message, "", "error");
                this.router.navigate(['/address']);
                localStorage.setItem('userId', (resp.json().id));
            }
        })
    }
    getCategories() {
        this.appService.getCategories().subscribe(resp => {
            this.category = resp.json().categories;
        })
    }
    subCatData =[]
    showSubCat(Id) {
        console.log(this.category);
        this.getCategories();
        debugger;
        this.showSubCats = true;
        for(var i=0;i<this.category.lenght;i++){
        for(var j=0;j<this.category[i].subcategory.lenght;j++){
            if(Id===this.category[i].subcategory[j].category_id){
              this.subCatData =  this.category[i].subcategory[j];
              console.log(this.subCatData);
              debugger;
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
                $("#myModal").modal("hide");
                swal(resp.json().message, "", "success");
            } else {
                swal(resp.json().message, "", "error");
            }


        }, err => {
            swal(err.json().message, "", "error");
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
    //          console.log(rsltAdrComponent[resultLength-5].short_name)
    //          } else {
    //          window.alert('Geocoder failed due to: ' + status);
    //          }
    //          }
    //          });
    //          });     
    //        };
    // }
    cartCount = [];
    cartDetails = [];
    cartData = [];
    billing;
    getCart() {
        var inData = localStorage.getItem('userId');
        this.appService.getCart(inData).subscribe(res => {
            this.cartData = res.json().cart_details;
            for(var i=0;i<this.cartData.length;i++){
                this.cartData[i].products.skuValue=this.cartData[i].products.sku_details[0].size;
                this.cartData[i].products.skid=this.cartData[i].products.sku_details[0].skid;
                this.cartData[i].products.selling_price=this.cartData[i].products.sku_details[0].selling_price;
                this.cartData[i].prodName=this.cartData[i].products.product_name;
                this.cartData[i].products.img = this.cartData[i].products.sku_details[0].image;
               }
               this.cartCount = res.json().count;
               this.billing = res.json().selling_Price_bill;
        }, err => {
    
        })
      }
      delCart(cartId){
        var inData = cartId;
      this.appService.delCart(inData).subscribe(res=> {
      console.log(res.json());
      swal(res.json().message,"","success");
      this.getCart();
      },err=> {
      
      })
      }
      search(product,action){
        // this.appService.searchProducts(product).subscribe(res=> {
        //     console.log(res.json());
            this.router.navigate(['/products'], { queryParams: { product: product,action:action } });
            // },err=> {
            
            // })    
      }
}
