import { Component, OnInit } from '@angular/core';
import { appService } from './../../services/mahaliServices/mahali.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

    constructor(public appService: appService, private router: Router) { }
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
    }

    showBusinessDetails = true;
    showStationaryData = false;
    showBankDetails = false;
    showAdd = false;

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
        first_name:'' ,
        last_name:'',
        mobile_number:'',
        email:'',
        bussiness_name:'',
        business_address:'',
        business_country:'',
        business_area:'',
        business_city:''
    }
    taxData = {
        vat_number:'',
        cr_number:''

    }
    bankData = {
         account_holder_name: "",
         account_number: "", 
         retype_acc:"",
         bank_name: "",
         ifsc_code:"",
         bank_area: "",
         bank_city: "",
         bank_branch: "",
    }
    businessDetails(){
        var inData = {
            "bussiness_first_name":this.businessData.first_name,
            "bussiness_last_name":this.businessData.last_name,
            "mobile_number":this.businessData.mobile_number,
            "bussiness_email":this.businessData.email,
            "bussiness_name":this.businessData.bussiness_name,
            "business_address": this.businessData.business_address,
            "business_country": this.businessData.business_country,
            "business_area": this.businessData.business_area,
            "business_city": this.businessData.business_city
        }
        this.appService.businessDetails(inData).subscribe(res=> {
        swal(res.json().message,"","success");
        this.showStationary();
        },err=> {

        })
    }
    tax(){
        var inData = {
        "vat_number": this.taxData.vat_number,
        "cr_number": this.taxData.cr_number
        }
        this.appService.taxDetails(inData).subscribe(res=> {
        swal(res.json().message,"","success");
        this.showBank();
        },err=> {

        })
    }
    bankDeatails(){
        var inData = {
            account_holder_name: this.bankData.account_holder_name,
            account_number: this.bankData.account_number, 
            bank_name: this.bankData.bank_name,
            ifsc_code:this.bankData.ifsc_code,
            bank_area: this.bankData.bank_area,
            bank_city: this.bankData.bank_city,
            bank_branch: this.bankData.bank_branch,  
            }
            if(this.bankData.account_number == this.bankData.retype_acc) {
                this.appService.bankDetails(inData).subscribe(res=> {
                    swal(res.json().message,"","success");
                    this.router.navigate(['/']);
                            },err=> {
                    
                            })
            }else{
                swal("Account number missmatch","","error");
            }
            
    }

}
