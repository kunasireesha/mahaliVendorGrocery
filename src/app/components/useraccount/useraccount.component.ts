import { appService } from './../../services/mahaliServices/mahali.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
    selector: 'app-useraccount',
    templateUrl: './useraccount.component.html',
    styleUrls: ['./useraccount.component.less']
})
export class UseraccountComponent implements OnInit {
    resetForm: FormGroup;
    addressForm: FormGroup;
    productForm: FormGroup
    submitted = false;
    model: any = {}
    full_name_errors = false;
    mobile_number_errors = false;
    house_no_errors = false;
    city_error = false;
    state_errors = false;
    landmark_errors = false;
    pincode_errors = false;
    deal_price_errors = false;
    quantity_errors = false;
    discount_error = false;
    status_errors = false;
    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private appService: appService,
        private router: Router) {
        this.page = this.route.snapshot.data[0]['page'];
        if (this.page === 'profile') {
            this.showProfile = true;
        } else if (this.page === 'wishlist') {
            this.showWishlist = true;
        } else if (this.page === 'orders') {
            this.showMyOrders = true;
            this.getOrders();
            this.ordDetails(this.ordId);
            this.ngOnInit();
        } else if (this.page === 'notifications') {
            this.showNotifications = true;
        } else if (this.page === 'offerzone') {
            this.showOfferZone = true;
        } else if (this.page === 'profiles') {
            this.showAddProducts = true;
        } else if (this.page === 'myproduct') {
            this.showMyProducts = true;
        } else if (this.page === 'accountData') {
            this.showAccountDetails = true;
            this.accountDetails();
        }

    }
    item = {
        quantity: 1
    }
    ngOnInit() {
        this.getProfile();
        this.getAdd();
        this.getAccDet();
        this.getOrders();
        this.getCategories();
        this.ordDetails(this.ordId);
        this.resetForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            new_password: ['', [Validators.required, Validators.minLength(6)]],
        });
        this.addressForm = this.formBuilder.group({
            full_name: [''],
            mobile_number: [''],
            house_no: [''],
            city: [''],
            state: [''],
            landmark: [''],
            pin_code: [''],
        });
        this.productForm = this.formBuilder.group({
            deal_price: [''],
            quantity: [''],
            discount: [''],
            status: [''],
            vendor_id: localStorage.userId,
            product_id: this.productId
        });

    }
    get f1() { return this.addressForm.controls; }

    saveAddress() {
        if (this.addressForm.value.full_name === '') {
            this.full_name_errors = true;
            return;
        }
        else if (this.addressForm.value.mobile_number === '') {
            this.mobile_number_errors = true;
            this.full_name_errors = false;
            return;
        }
        else if (this.addressForm.value.house_no === '') {
            this.house_no_errors = true;
            this.mobile_number_errors = false;
            this.full_name_errors = false;
            return;
        }
        else if (this.addressForm.value.landmark === '') {
            this.landmark_errors = true;
            this.house_no_errors = false;
            this.mobile_number_errors = false;
            this.full_name_errors = false;
            return;
        }
        else if (this.addressForm.value.city === '') {
            this.city_error = true;
            this.landmark_errors = false;
            this.house_no_errors = false;
            this.mobile_number_errors = false;
            this.full_name_errors = false;
            return;
        }
        else if (this.addressForm.value.state === '') {
            this.state_errors = true;
            this.city_error = false;
            this.landmark_errors = false;
            this.house_no_errors = false;
            this.mobile_number_errors = false;
            this.full_name_errors = false;
            return;
        }

        else if (this.addressForm.value.pin_code === '') {
            this.pincode_errors = true;
            this.state_errors = false;
            this.city_error = false;
            this.landmark_errors = false;
            this.house_no_errors = false;
            this.mobile_number_errors = false;
            this.full_name_errors = false;
            return;
        }
        this.appService.addaddress(this.addressForm.value).subscribe(res => {
            this.addressForm.reset();
            swal(res.json().message, "", "success");
            this.pincode_errors = false;
            this.getAdd();

        })
    }

    get f2() { return this.productForm.controls; }
    productId;
    save(prodId) {
        if (this.productForm.value.deal_price === '') {
            this.deal_price_errors = true;
            return;
        } else if (this.productForm.value.quantity === '') {
            this.quantity_errors = true;
            this.deal_price_errors = false;
            return;
        } else if (this.productForm.value.discount === '') {
            this.discount_error = true;
            this.quantity_errors = false;
            this.deal_price_errors = false;
            return;
        } else if (this.productForm.value.status === '') {
            this.status_errors = true;
            this.discount_error = false;
            this.quantity_errors = false;
            this.deal_price_errors = false;
            return;
        }
        this.productId = prodId;
        this.appService.update(this.productForm.value).subscribe(resp => {
            this.status_errors = false;
            swal("Your order under process for Approvel", "", "success");
            this.productForm.reset();
        })

    }

    page;
    showNotifications = false;
    showOrderDetails = false;
    showMyOrders = false;
    showMyProducts = false;
    showWishlist = false;
    showAddAddress = false;
    showDeliveryAddress = false;
    editUserProfile = false;
    showProfile = false;
    showOfferZone = false;
    showAddProducts = false;
    showAddProducts5 = false;
    showManageUserOrders = false;
    showAccountDetails = false;
    editAccount = false;
    editDel = false;
    showRequestAdmin = false;
    showEditAddress=false;

    profile() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = true;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress =false;
    }

    editProfile() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = true;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress =false;
    }
    accountDetails() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showManageUserOrders = false;
        this.showAccountDetails = true;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress =false;
        this.getAccDet();
    }
    editAccountDetails() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = true;
        this.showRequestAdmin = false;
        this.showEditAddress =false;
    }
    deliveryAddress() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = true;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress =false;
    }
    addAddress() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = true;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress =false;
    }
    showEditAdd(addId) {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress = true;
        this.editAdd(addId);
    }

    wishList() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = true;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress =false;
    }

    myProducts() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = true;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress =false;
    }

    myOrder() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = true;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress =false;
    }

    notifications() {
        this.showNotifications = true;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress =false;
    }

    showBukedOrderDetails(ordId) {
        this.showNotifications = false;
        this.showOrderDetails = true;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress =false;
        this.ordDetails(ordId);
    }
    ordId;
    ordData = [];
    orderDet = [];
    count;
    ordDetails(ordId) {
        this.ordId = ordId;
        this.appService.orderById(ordId).subscribe(resp => {
            this.ordData = resp.json().Order.products;
            for (var i = 0; i < this.ordData.length; i++) {
                this.ordData[i].size = this.ordData[i].sku_details[0].size;
                this.ordData[i].selling_price = this.ordData[i].sku_details[0].selling_price;
            }
            this.orderDet = resp.json().Order.details[0];
            this.count = resp.json().Order.total_selling_price;

        })
    }
    showVendorOrderDetails() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showManageUserOrders = true;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress =false;
    }
    offerZone() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = true;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress =false;
    }

    addProducts() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = true;
        this.showAddProducts5 = false;
        this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress =false;
    }

    showAddProducts2(Id) {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = true;
        this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress =false;
        this.getProducts(Id);
    }
    requestAdmin() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = true;
        this.showEditAddress =false;
    }


    prodId;
    reqProds = [];
    getProducts(Id) {
        this.prodId = Id;
        this.appService.reqOrder(Id).subscribe(resp => {
            this.reqProds = resp.json().Order;

        })
    }
    price;
    qunt;
    dis;
    status;
    // save(proId) {
    //     var inData = {
    //         "vendor_id": localStorage.userId,
    //         "product_id": proId,
    //         "deal_price": this.price,
    //         "quantity": this.qunt,
    //         "status": this.status,
    //         "discount": this.dis
    //     }
    //     this.appService.update(inData).subscribe(resp => {
    //         swal("Your order under process for Approvel", "", "success");

    //     })
    // }

    onSubmit1() {

        alert(JSON.stringify(this.model))
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
    get f() { return this.resetForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.resetForm.invalid) {
            return;
        } else if (this.resetForm.value.password != this.resetForm.value.new_password) {
            swal("Passwords doesn't matched", "", "warning");
            return;
        }
        this.appService.changePwd(this.resetForm.value).subscribe(resp => {
            if (resp.json().status === 200) {
                swal(resp.json().message, "", "success");
                this.router.navigate(['/'])
            } else {
                swal(resp.json().message, "", "error");
            }


        }, err => {
            swal(err.json().message, "", "error");
        })


    }
    email;
    profileData = {
        first_name: '',
        email: '',
        mobile_number: '',
        bussiness_area: '',
        bussiness_city: '',
        bussiness_name:''
    }
    getProfile() {
        this.email = (localStorage.email);
        this.appService.loginDetailsbyEmail(this.email).subscribe(response => {
            this.profileData = response.json().data[0];
            localStorage.removeItem('userName');
            localStorage.setItem('userName', (response.json().data[0].first_name) + " " + (response.json().data[0].last_name));
        })
    }
    updateProfile() {
        var inDate = {
            first_name: this.profileData.first_name,
            email: this.profileData.email,
            mobile_number: this.profileData.mobile_number,
            bussiness_area: this.profileData.bussiness_area,
            bussiness_city: this.profileData.bussiness_city,
            bussiness_name:this.profileData.bussiness_name

        }
        this.appService.updateProfile(inDate).subscribe(response => {
            swal(response.json().message, "", "success");
            this.ngOnInit();
            this.getProfile();
            this.cancel();
        })
    }
    cancel() {
        this.showProfile = true;
        this.editUserProfile = false;
        this.getProfile();
    }
    getAddData = [];
    States = ["Andhrapradhesh", "Gujarath", "Telangana"];
    Cities = ["Hyderabad", "Kadapa", "Vijayawada"];
    getAdd() {
        this.appService.getAddress().subscribe(res => {
            this.getAddData = res.json().delivery_address;

        })
    }
    seleOpt;
    addId;
    seleAddOptn(index, addId) {
        this.seleOpt = index;
        this.editDel = true;
        this.addId = addId;
    }
    addData = {
        full_name: "",
        mobile_number: "",
        house_no: "",
        city: "",
        state: "",
        landmark: "",
        pin_code: "",
        address_type: "",
        vendor_id: 44


    }
    type;
    Type(type) {
        this.type = type;
    }
    //   saveAddress() {


    //   }
    cancelAdd() {
        this.showDeliveryAddress = true;
        this.editAccount = false;
        this.showAddAddress = false;
        this.showEditAddress=false;
    }
    delAdd(delId) {
        this.appService.delAddress(delId).subscribe(res => {
            swal(res.json().message, "", "success");
            this.getAdd();
        })
    }
    selectAdd() {
        this.appService.setDelAdd(this.addId).subscribe(res => {
            swal(res.json().message, "", "success");
        })

    }
    accDet: any;
    getAccDet() {
        this.appService.getAccDetails().subscribe(res => {
            this.accDet = res.json().data[0];
        }, err => {

        })
    }
    saveDetails() {
        var inData = {
            account_holder_name: this.accDet.account_holder_name,
            account_number: this.accDet.account_number,
            bank_area: this.accDet.bank_area,
            bank_branch: this.accDet.bank_branch,
            bank_city: this.accDet.bank_city,
            bank_name: this.accDet.bank_name,
            ifsc_code: this.accDet.ifsc_code
        }
        this.appService.updateAcc(inData).subscribe(res => {
            swal(res.json().message, "", "success");
            this.getAccDet();
            this.cancelDetails();
        }, err => {

        })
    }
    cancelDetails() {
        this.showAccountDetails = true;
        this.editAccount = false;
        this.getAccDet();
    }
    orders = [];
    getOrders() {
        this.appService.getPlaceOrder().subscribe(res => {
            this.orders = res.json().Orders;
        }, err => {

        })
    }
    category = []
    getCategories() {
        this.appService.getCategories().subscribe(resp => {
            this.category = resp.json().categories;
        })
    }
    editAddData = {
        full_name:'',
        mobile_number:'',
        house_no:'',
        landmark:'',
        city:'',
        state:'',
        pin_code:'',

    };
    editAdd(addId) {
        this.appService.getAdd(addId).subscribe(resp => {
            this.editAddData = resp.json().delivery_address[0];
        }, err => {

        })
    }
    UpdateAdd(addId) {
        var indata ={
            "full_name": this.editAddData.full_name,
            "mobile_number": this.editAddData.mobile_number,
            "house_no": this.editAddData.house_no,
            "city": this.editAddData.city,
            "state": this.editAddData.state,
            "landmark": this.editAddData.landmark,
            "pin_code": this.editAddData.pin_code,
            "address_type": this.type
        }
        this.appService.updateAddData(indata,addId).subscribe(resp => {
            swal(resp.json().message,"","success");
            this.getAdd();
            this.cancelAdd();
        }, err => {

        })
    }

}

