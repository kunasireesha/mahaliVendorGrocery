import { appService } from './../../services/mahaliServices/mahali.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-useraccount',
    templateUrl: './useraccount.component.html',
    styleUrls: ['./useraccount.component.less']
})
export class UseraccountComponent implements OnInit {
    resetForm: FormGroup;
    submitted = false;
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
        this.ordDetails(ordId);
    }
    ordId;
    ordData = [];
    orderDet = [];
    count;
    ordDetails(ordId){
        this.ordId = ordId;
        this.appService.orderById(ordId).subscribe(resp => {
           this.ordData = resp.json().Order.products;
           for(var i=0;i<this.ordData.length;i++){
           this.ordData[i].size = this.ordData[i].sku_details[0].size;
           this.ordData[i].selling_price = this.ordData[i].sku_details[0].selling_price;
           }
           this.orderDet =  resp.json().Order.details[0];
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
        this.getProducts(Id);
    }
    prodId;
    reqProds = [];
    getProducts(Id){
   this.prodId = Id;
   this.appService.reqOrder(Id).subscribe(resp => {
   this.reqProds = resp.json().Order;

})
    }
    price;
    qunt;
    dis;
    status;
    save(proId){
        var inData ={
                "vendor_id":localStorage.userId,
                "product_id":proId,
                "deal_price":this.price,
                "quantity":this.qunt,
                "status":this.status,
                "discount":this.dis
        }
        this.appService.update(inData).subscribe(resp => {
            swal("Your order under process for Approvel", "", "success");

        })  
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
        }
        this.appService.changePwd(this.resetForm.value).subscribe(resp => {
            swal(resp.json().message, "", "success");
            this.router.navigate(['/'])

        })


    }
    email;
    profileData = {
        first_name: '',
        email: '',
        mobile_number: ''

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
            mobile_number: this.profileData.mobile_number

        }
        this.appService.updateProfile(inDate).subscribe(response => {
            console.log(response.json());
            swal(response.json().message, "", "success");
            this.ngOnInit();
            this.getProfile();
        })
    }
    cancel() {
        this.showProfile = true;
        this.editUserProfile = false;
    }
    getAddData = [];
    States = ["Andhrapradhesh","Gujarath","Telangana"];
    Cities = ["Hyderabad","Kadapa","Vijayawada"];
    getAdd(){
        this.appService.getAddress().subscribe(res=> {
          this.getAddData = res.json().delivery_address;
          
              })
      }
      seleOpt;
      addId;
      seleAddOptn(index,addId){
      this.seleOpt = index;
      this.editDel = true;
      this.addId = addId;
      }
      addData = {
        full_name: "",
        mobile_number:"",
        house_no: "",
          city: "",
          state: "",
          landmark: "",
          pin_code: "",
            address_type: "",
           vendor_id: 44
           
        
      }
      type;
      Type(type){
        this.type = type;
      }
      saveAddress() {
        var inData  = {
          "full_name": this.addData.full_name,
          "mobile_number":this.addData.mobile_number ,
          "house_no": this.addData.house_no,
          "city": this.addData.city,
          "state": this.addData.state,
          "landmark": this.addData.landmark,
          "pin_code": this.addData.pin_code,
          "address_type": this.type,
          
        }
        this.appService.addaddress(inData).subscribe(res=> {
            swal(res.json().message,"","success");
    this.getAdd();
    // this.showAddresses = true;
    //     this.addresses = false;
    
        })
        
      }
      cancelAdd(){
        this.showDeliveryAddress = true;   
        this.editAccount = false;
        this.showAddAddress = false;
      }
      delAdd(delId){
        this.appService.delAddress(delId).subscribe(res=> {
           swal(res.json().message,"","success");
            this.getAdd();
                })
      }
      selectAdd(){
        this.appService.setDelAdd(this.addId).subscribe(res=> {
            swal(res.json().message,"","success");
            console.log(res.json());
                 })
       
      }
      accDet :any;
      getAccDet(){
        this.appService.getAccDetails().subscribe(res=> {
            this.accDet = res.json().data[0];
                 },err=> {

                 })
      }
      saveDetails(){
          var inData =  {
            account_holder_name: this.accDet.account_holder_name,
            account_number: this.accDet.account_number,
            bank_area: this.accDet.bank_area,
            bank_branch: this.accDet.bank_branch,
            bank_city: this.accDet.bank_city,
            bank_name:this.accDet.bank_name,
            ifsc_code: this.accDet.ifsc_code
          }
        this.appService.updateAcc(inData).subscribe(res=> {
            swal(res.json().message,"","success");
            this.getAccDet();
                 },err=> {

                 })
      }
      cancelDetails(){
        this.showAccountDetails = true;
        this.editAccount = false;  
      }
      orders = [];
      getOrders(){
        this.appService.getPlaceOrder().subscribe(res=> {
            this.orders = res.json().Orders;
                 },err=> {

                 }) 
      }
      category=[]
      getCategories() {
        this.appService.getCategories().subscribe(resp => {
            this.category = resp.json().categories;
        })
    }

}

