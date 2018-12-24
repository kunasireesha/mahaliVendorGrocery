import { Component, OnInit } from '@angular/core';
import { appService } from './../../services/mahaliServices/mahali.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
    bussinessForm: FormGroup;
    StationaryForm: FormGroup;
    bankForm: FormGroup;
    submitted = false;
    constructor(public appService: appService, private router: Router, private formBuilder: FormBuilder) { }
    //     "first_name":"JyothiN",
    //     "last_name":"sri ",
    // "account_holder_name": "",
    //     "account_number": "0123456789456",
    //     "mobile_number": 8500539819,
    //     "password": "sadssad",
    //     "email": "srijth863.ip@gmail.com",
    //     "bank_name": "versatile",
    //     "ifsc_code": "IFSCCODE000",
    //     "bank_area": "MAdhapur",
    //     "bank_city": "Hyderabad",
    //     "bank_branch": "NRi branch",
    //     "role": "Grocery",
    //     “business_mobile_number”:””
    //     "bussiness_name": "",
    //      "business_address": "",
    //       "business_country": "",
    //       "business_area": "",
    //       "business_city": "",
    //             "business_latitude": "",
    //             "business_longitude": "",
    //   "vat_number": "",
    //             "cr_number": "",
    //     "status": "open"

    ngOnInit() {
        this.bussinessForm = this.formBuilder.group({
            bussiness_first_name: ['', Validators.required],
            bussiness_last_name: ['', Validators.required],
            mobile_number: ['', Validators.required],
            bussiness_email: ['', [Validators.required, Validators.email]],
            bussiness_name: ['', Validators.required],
            business_address: ['', Validators.required],
            business_country: ['', Validators.required],
            business_area: ['', Validators.required],
            business_city: ['', Validators.required]
        });
        this.StationaryForm = this.formBuilder.group({
            vat_number: ['', Validators.required],
            cr_number: ['', Validators.required]
        });
        this.bankForm = this.formBuilder.group({
            account_holder_name: ['', Validators.required],
            account_number: ['', Validators.required],
            // re_account_number: ['', Validators.required],
            bank_name: ['', Validators.required],
            ifsc_code: ['', Validators.required],
            bank_area: ['', Validators.required],
            bank_city: ['', Validators.required],
            bank_branch: ['', Validators.required],
        });

    }

    // business form
    get f() { return this.bussinessForm.controls; }

    businessDetails() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.bussinessForm.invalid) {
            return;
        }
        this.appService.businessDetails(this.bussinessForm.value).subscribe(res => {
            swal(res.json().message, "", "success");
            this.showStationary();
        }, err => {

        })

    }

    // stationary form
    get f1() { return this.StationaryForm.controls; }

    tax() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.StationaryForm.invalid) {
            return;
        }
        this.appService.taxDetails(this.StationaryForm.value).subscribe(res => {
            swal(res.json().message, "", "success");
            this.showBank();
        }, err => {

        })
    }

    // bank Details form

    get f2() { return this.bankForm.controls; }

    bankDeatails() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.bankForm.invalid) {
            return;
        }
        // if (this.bankData.account_number == this.bankData.retype_acc) {
            this.appService.bankDetails(this.bankForm.value).subscribe(res => {
                swal(res.json().message, "", "success");
                this.router.navigate(['/']);
            }, err => {

            })
        // }
        //  else {
        //     swal("Account number missmatch", "", "error");
        // }

    }



    showBusinessDetails :boolean =  true;
    showStationaryData :boolean= false;
    showBankDetails:boolean =  false;
    showAdd:boolean= false;

    showBusiness() {
        this.showBusinessDetails = true;
        this.showStationaryData = false;
        this.showBankDetails = false;
        this.showAdd = false;
    }

    showStationary() {
        this.showBusinessDetails = false;
        this.showStationaryData = true;
        this.showBankDetails = false;
        this.showAdd = false;

    }

    showBank() {
        this.showBusinessDetails = false;
        this.showStationaryData = false;
        this.showBankDetails = true;
        this.showAdd = false;
    }

    addProd() {
        this.showBusinessDetails = false;
        this.showStationaryData = false;
        this.showBankDetails = false;
        this.showAdd = true;
    }
    businessData = {
        first_name: '',
        last_name: '',
        mobile_number: '',
        email: '',
        bussiness_name: '',
        business_address: '',
        business_country: '',
        business_area: '',
        business_city: ''
    }
    taxData = {
        vat_number: '',
        cr_number: ''

    }
    bankData = {
        account_holder_name: "",
        account_number: "",
        retype_acc: "",
        bank_name: "",
        ifsc_code: "",
        bank_area: "",
        bank_city: "",
        bank_branch: "",
    }

}
