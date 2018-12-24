import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsData } from '../../services/productsdata';
import { ProductService } from '../../services/productservice';
import { appService } from './../../services/mahaliServices/mahali.service';

@Component({
    selector: 'app-productdetails',
    templateUrl: './productdetails.component.html',

})

export class ProductdetailsComponent implements OnInit {
    product: ProductsData;
    constructor(private route: ActivatedRoute, public productService: ProductService, private appService: appService) {
        this.route.queryParams.subscribe(params => {
            this.prodId = params.prodId;
        });
    }
    item = {
        quantity: 1
    }
    sub;
    prodId;
    ngOnInit() {
        this.product = this.productService.product;
        this.sub = this.route
            .data
            .subscribe(v => console.log(v));
        this.getProductById();

    }
    itemIncrease() {
        let thisObj = this;

        thisObj.item.quantity = Math.floor(thisObj.item.quantity + 1);

    }
    itemDecrease() {
        let thisObj = this;
        if (thisObj.item.quantity === 0) {
            return;
        }
        thisObj.item.quantity = Math.floor(thisObj.item.quantity - 1);

    }

    starList: boolean[] = [true, true, true, true, true];       // create a list which contains status of 5 stars
    rating: number;
    //Create a function which receives the value counting of stars click, 
    //and according to that value we do change the value of that star in list.
    setStar(data: any) {
        this.rating = data + 1;
        for (var i = 0; i <= 4; i++) {
            if (i <= data) {
                this.starList[i] = false;
            }
            else {
                this.starList[i] = true;
            }
        }
    }
    prodData = [];
    prodsData = [];
    skid;
    prodName;
    description;
    getProductById() {
        this.appService.getProductById(this.prodId).subscribe(res => {
            this.prodsData = res.json().products;
            this.prodData = res.json().products.sku_details;
            this.offer_price = this.prodData[0].offer_price;
            this.actual_price = this.prodData[0].actual_price;
            this.product_image = this.prodData[0].image;
            this.skid = this.prodData[0].skid;
            this.prodName = res.json().products.product_name;
            this.description = this.prodData[0].description;
        }, err => {

        })
    }
    skuData = [];
    offer_price = [];
    actual_price;
    product_image;
    changeSize(skId) {
        for (var i = 0; i < this.prodData.length; i++) {
            if (parseInt(skId) === this.prodData[i].skid) {
                this.offer_price = this.prodData[i].offer_price;
                this.actual_price = this.prodData[i].actual_price;
                this.product_image = this.prodData[i].image;
                this.skid = this.prodData[i].skid;
                this.description = this.prodData[i].description;
            }
        }
    }
    cartDetails;
    cartCount;
    getCart() {
        var inData = localStorage.getItem('userId');
        this.appService.getCart(inData).subscribe(res => {
            this.cartDetails = res.json().cart_details;
            this.cartCount = res.json().count;
        }, err => {

        })
    }
    addtoCart(id) {
        var inData = {
            "products": [{
                product_id: id,
                sku_id: this.skid
            }],
            "vendor_id": JSON.parse(localStorage.getItem('userId'))
        }
        this.appService.addtoCart(inData).subscribe(res => {
            this.getCart();
            swal(res.json().message, "", "success");
        }, err => {

        })
    }
}
