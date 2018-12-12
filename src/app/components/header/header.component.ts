import { appService } from './../../services/mahaliServices/mahali.service';
import { UseraccountComponent } from './../useraccount/useraccount.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { LoginComponent } from '../../components/login/login.component';
import { Router } from '@angular/router';
import { RegistrationComponent } from '../../components/registration/registration.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var jQuery: any;
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
    subcat = [];

    constructor(public dialog: MatDialog, private router: Router, public appService: appService, private formBuilder: FormBuilder) { }
    item = {
        quantity: 1
    }
    userMobile;
    userName;
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
        this.registerForm = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            mobile_number: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]]
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
    }
    showSubCat(Id) {
        this.showSubCats = true;

        this.appService.getSubCat(Id).subscribe(resp => {
            this.subcat = resp.json().sub_category;
        }, error => {

        })
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
    showVegetables() {
        this.router.navigate(['/freshvegetables'], { queryParams: { order: 'popular' } });
    }
    signOut() {
        localStorage.removeItem('token');
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
                jQuery("#signupmodal").modal("hide");
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
                localStorage.setItem('token', (resp.json().token));
                jQuery("#loginmodal").modal("hide");
                this.showRegistration = false;
                this.showLoginScreen = false;
                this.myAccount = true;
                this.appService.loginDetailsbyEmail(this.loginForm.value.email).subscribe(response => {
                    localStorage.setItem('phone', JSON.stringify(response.json().data[0].mobile_number));
                    localStorage.setItem('email', (response.json().data[0].email));
                    localStorage.setItem('userId', (response.json().data[0].id));
                    localStorage.setItem('userName', (response.json().data[0].first_name) + " " + (response.json().data[0].last_name));
                    this.loginDetails = response.json().data[0];
                    this.phone = true;

                })
            }
            else if (resp.json().status === 404 || resp.json().status === 400) {
                swal(resp.json().message, "", "error");
            }
        })
    }
    getCategories() {
        this.appService.getCategories().subscribe(resp => {
            this.category = resp.json().categories;
        })
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
            } else {
                swal(resp.json().message, "", "error");
            }


        }, err => {
            swal(err.json().message, "", "error");
        })
    }

}
