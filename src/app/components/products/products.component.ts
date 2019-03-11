import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/productservice';
import { appService } from './../../services/mahaliServices/mahali.service';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {
    current;
    wholeId;
    product;
    serProd = false;
    wholeProd = false;
    showSubCats = false;
    noData;
    constructor(private router: Router, public productService: ProductService, private appService: appService, private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            if (params.action === "whole") {
                this.wholeId = params.wholeId;
                this.getWholeProds();
                this.wholeProd = true;
                this.serProd = false;
            } else if (params.action === "search") {
                this.product = params.product;
                this.search(this.product);
                this.wholeProd = false;
                this.serProd = true;
            }


        });
    }

    ngOnInit() {
        this.getCategories();
    }
    showCategories = false;

    collapse(catId) {
        this.showCategories = !this.showCategories;
    }
    showProduxtDetails(prodId) {
        this.router.navigate(['/productdetails'], { queryParams: { prodId: prodId } });
    }
    products = [];
    skuid;
    prodData = [];
    skid;
    getWholeProds() {
        this.skuData = [];
        this.appService.wholeProducts(this.wholeId).subscribe(res => {
            this.prodData = res.json().products;
            for (var i = 0; i < this.prodData.length; i++) {
                for (var j = 0; j < this.prodData[i].sku.length; j++) {
                    this.prodData[i].selling_price = this.prodData[i].sku[0].selling_price;
                    this.prodData[i].actual_price = this.prodData[i].sku[0].actual_price;
                    this.prodData[i].image = this.prodData[i].sku[0].sku_images[0].sku_image;
                    this.prodData[i].skid = this.prodData[i].sku[0].skid;
                    this.skid = this.prodData[i].sku[0].skid;
                }

            }
            if (res.json().status === "400") {
                this.noData = res.json().message;
            }

        }, err => {

        })
    }
    changeSize(Id) {
        this.skid = Id;
        for (var i = 0; i < this.prodData.length; i++) {
            for (var j = 0; j < this.prodData[i].sku.length; j++) {
                if (parseInt(Id) === this.prodData[i].sku[j].skid) {
                    this.prodData[i].selling_price = this.prodData[i].sku[j].selling_price;
                    this.prodData[i].actual_price = this.prodData[i].sku[j].actual_price;
                    this.prodData[i].skid = this.prodData[i].sku[i].skid;
                    for (var k = 0; k < this.prodData[i].sku[j].sku_images.length; k++) {
                        this.prodData[i].image = this.prodData[i].sku[j].sku_images[0].sku_image;
                    }
                }

            }

        }
    }

    cartDetails = [];
    cartCount = [];
    addtoCart(Id) {
        var inData = {
            "products": [{
                product_id: Id,
                sku_id: this.skid
            }],
            "vendor_id": JSON.parse(localStorage.getItem('userId')),
            "item_type": "grocery"
        }
        this.appService.addtoCart(inData).subscribe(res => {
            this.cartDetails = res.json().selling_price_total;
            this.cartCount = res.json().count;
            // this.getCart();
            swal(res.json().message, "", "success");
        }, err => {

        })
    }
    serProducts = [];
    skuData = [];
    search(product) {
        this.skuData = [];
        this.appService.searchProducts(product).subscribe(res => {
            this.serProducts = res.json().data;
            // if (this.serProducts == "No products found with your search") {
            //   this.noData = true;
            // } else {
            for (var i = 0; i < this.serProducts.length; i++) {
                for (var j = 0; j < this.serProducts[i].sku_details.length; j++) {
                    this.serProducts[i].sku_details[j].product_name = this.serProducts[i].product_name;
                    this.skuData.push(this.serProducts[i].sku_details[j]);
                }
                // }
                // this.noData = false;
            }

        }, err => {

        })
    }
    category = [];
    getCategories() {
        this.appService.getCategories().subscribe(resp => {
            this.category = resp.json().categories;
            // this.showSubCat(this.subId);
            for (var i = 0; i < this.category.length; i++) {
                for (var j = 0; j < this.category[i].subcategory.length; j++) {
                    this.subCatData.push(this.category[i].subcategory[j]);
                    console.log(this.subCatData);
                }
            }
        })
    }
    subCatData = [];
    subId;
    // showSubCat(Id) {
    //   this.subId = Id;
    //   this.subCatData=[];
    //   this.showSubCats = true;
    //   for(var i=0;i<this.category.length;i++){
    //   for(var j=0;j<this.category[i].subcategory.length;j++){
    //       if(Id===this.category[i].subcategory[j].category_id){
    //         this.subCatData.push(this.category[i].subcategory[j]);
    //         console.log(this.subCatData);

    //       }
    //   }
    // }
    // }
    selectedCat = false;
    openSub(index) {
        this.selectedCat !== this.selectedCat;
        this.current = index;
    }
    //   toggle(current){
    //     this.current = current;
    //     alert(this.current);
    // this.current!== this.current;
    //   }
}
