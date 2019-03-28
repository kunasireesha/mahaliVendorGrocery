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
    catId;
    catName;
    subCatName;
    noData1;
    prodData1 = [];
    subCatName1;
    wholecatId;
    catName1;
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
            } else if (params.action === 'category') {
                this.catId = params.catId;
                this.catName = params.catName;
                this.wholeProd = true;
                this.serProd = false;
                this.getCatProducts('', '');
            } else if (params.action === 'subCategory') {
                this.subId = params.subId;
                this.catName1 = params.catName;
                this.subCatName = params.subCat || "";
                this.wholeProd = true;
                this.serProd = false;
                this.getSubProducts('', '');
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
    noData = false;
    getCatProducts(id, catName) {
        this.catId = (id === '') ? this.catId : id;
        this.catName1 = (catName === '') ? this.catName : catName;
        if (this.wholeId === undefined) {
            this.appService.productByCatId(this.catId).subscribe(res => {
                this.prodData = res.json().products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                            this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
                            this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                            this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                            this.skid = this.prodData[i].sku_row[0].skid;
                        }
                    }
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().status === 400) {
                    this.noData = true;
                }


            }, err => {

            })
        } else {
            this.appService.wholeCatProds(this.wholeId, this.catId).subscribe(res => {
                this.prodData = res.json().products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                            this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
                            this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                            this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                            this.skid = this.prodData[i].sku_row[0].skid;
                        }

                    }
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().status === 400) {
                    this.noData = true;
                }
            })
        }

        this.subCatName1 = '';
    }
    getCatsByWholeId() {
        this.appService.wholeCatProds(this.wholeId, this.wholecatId).subscribe(res => {

        })
    }
    Images = [];
    skuImages = [];
    image = [];
    getSubProducts(subid, subCatName) {
        this.subId = (subid === '') ? this.subId : subid;
        this.subCatName1 = (subCatName === '') ? this.subCatName : subCatName;
        if (this.wholeId === undefined) {
            this.appService.productBySubCatId(this.subId).subscribe(res => {
                this.prodData = res.json().products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                            this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
                            this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                            this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                            this.skid = this.prodData[i].sku_row[0].skid;
                        }

                    }
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().status === 400) {
                    this.noData = true;
                }
            }, err => {

            })
        } else {
            this.appService.wholeSubCatProds(this.wholeId, this.subId).subscribe(res => {
                this.prodData = res.json().products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                            this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
                            this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                            this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                            this.skid = this.prodData[i].sku_row[0].skid;
                        }

                    }
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().status === 400) {
                    this.noData = true;
                }
            })
        }
    }
    changeSize(Id) {
        this.skid = Id;
        for (var i = 0; i < this.prodData.length; i++) {
            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                if (parseInt(Id) === this.prodData[i].sku_row[j].skid) {
                    this.prodData[i].selling_price = this.prodData[i].sku_row[j].selling_price;
                    this.prodData[i].actual_price = this.prodData[i].sku_row[j].actual_price;
                    this.prodData[i].skid = this.prodData[i].sku_row[i].skid;
                    for (var k = 0; k < this.prodData[i].sku_row[j].sku_images.length; k++) {
                        this.prodData[i].image = this.prodData[i].sku_row[j].sku_images[0].sku_image;
                    }
                }

            }

        }
    }
    getWholeProds() {
        this.appService.wholeProducts(this.wholeId).subscribe(res => {
            this.prodData = res.json().products;
            for (var i = 0; i < this.prodData.length; i++) {
                for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                    this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                    this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
                    this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                    this.skid = this.prodData[i].sku_row[0].skid;
                    this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                }

            }
            if (res.json().status === "400") {
                this.noData = res.json().message;
            }

        }, err => {

        })
    }
    cartDetails = [];
    cartCount = [];
    addtoCart(Id, skid) {
        var inData = {
            "products": [{
                product_id: Id,
                sku_id: skid
            }],
            "vendor_id": JSON.parse(sessionStorage.getItem('userId')),
            "item_type": "grocery"
        }
        this.appService.addtoCart(inData).subscribe(res => {
            if (res.json().status === 400) {
                swal(res.json().message, "", "error");
            } else {
                this.cartDetails = res.json().selling_price_total;
                this.cartCount = res.json().count;
                swal(res.json().message, "", "success");
            }
        }, err => {

        })
    }
    search(product) {
        this.catName1 = this.subCatName1 = ''
        this.appService.searchProducts(product).subscribe(res => {
            this.prodData = res.json().data;
            if (this.prodData != undefined) {
                for (var i = 0; i < this.prodData.length; i++) {
                    for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                        this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                        this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
                        this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                        this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                        this.skid = this.prodData[i].sku_row[0].skid;
                    }

                }
                this.noData = false;
                this.noData1 = false;
            }
            if (res.json().status === 400) {
                this.noData1 = true;
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
    subCategory = [];
    showsubCat(index, id) {
        this.subCategory = [];
        this.selectedCat = index;
        this.showCategories = true;

        for (var i = 0; i < this.subCatData.length; i++) {
            if (id === this.subCatData[i].category_id) {
                this.subCategory.push(this.subCatData[i]);
            }
        }
    }
    closesubSubCat() {
        this.showCategories = false;
        // this.showSubCategories = false;
    }
    subCatData = [];
    subId;
    // showSubCat(Id) {
    // this.subId = Id;
    // this.subCatData=[];
    // this.showSubCats = true;
    // for(var i=0;i<this.category.length;i++){
    // for(var j=0;j<this.category[i].subcategory.length;j++){
    // if(Id===this.category[i].subcategory[j].category_id){
    // this.subCatData.push(this.category[i].subcategory[j]);
    // console.log(this.subCatData);

    // }
    // }
    // }
    // }
    selectedCat = false;
    openSub(index) {
        this.selectedCat !== this.selectedCat;
        this.current = index;
    }
    // toggle(current){
    // this.current = current;
    // alert(this.current);
    // this.current!== this.current;
    // }
}