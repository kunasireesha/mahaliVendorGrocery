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
    //     this.subCatData = [];
    //     for(var i=0;i<this.category.length;i++){
    // for(var j=0;j<this.category[i].subcategory.length;j++){
    //   if(catId ===this.category[i].subcategory[j].category_id ){
    //     this.subCatData.push(this.category[i].subcategory[j]);
    //           console.log(this.subCatData);
    //     this.showCategories = !this.showCategories;
    //     this.showSubCat(this.subId);
    //   }
    // }
    //     }



  }
  showProduxtDetails(prodId) {
    this.router.navigate(['/productdetails'], { queryParams: { prodId: prodId } });
  }
  products = [];
  skuid;
  getWholeProds() {
    this.skuData = [];
    this.appService.wholeProducts(this.wholeId).subscribe(res => {
      this.products = res.json().products;
      for (var i = 0; i < this.products.length; i++) {
        for (var j = 0; j < this.products[i].sku_details.length; j++) {
          this.products[i].sku_details[j].product_name = this.products[i].product_name;
          this.skuData.push(this.products[i].sku_details[j]);
        }
      }
      // for (var i = 0; i < this.products.length; i++) {
      //   for (var k = 0; k < this.products[i].sku_details.length; k++) {
      //     // if(parseInt(skId) ===this.products[i].sku_details[k].skid){
      //     this.products[i].actual_price = this.products[i].sku_details[0].actual_price;
      //     this.products[i].selling_price = this.products[i].sku_details[0].selling_price;
      //     this.products[i].product_image = this.products[i].sku_details[0].product_image;
      //     this.skuid = this.products[i].sku_details[0].skid;



      //     // this.skuArr.push(this.skuData);

      //     // }
      //   }
      // }


      // for (var i = 0; i < this.products.length; i++) {
      //   for (var j = 0; j < this.skusData.length; j++) {
      //     this.skusData[j].actual_price = this.products[i].actual_price;
      //     this.skusData[j].selling_price = this.products[i].selling_price;
      //   }
      // }

    }, err => {

    })
  }
  changeSize(skId) {
    for (var i = 0; i < this.products.length; i++) {
      // for(var j = 0;j<this.cartData[i].products;j++){
      for (var k = 0; k < this.products[i].sku_details.length; k++) {
        if (parseInt(skId) == this.products[i].sku_details[k].skid) {
          this.products[i].actual_price = this.products[i].sku_details[k].actual_price;
          this.products[i].selling_price = this.products[i].sku_details[k].selling_price;
          this.products[i].product_image = this.products[i].sku_details[k].product_image;
          this.skuid = this.products[i].sku_details[k].skid;
          // this.skuArr.push(this.skuData);
        }
      }
    }
  }
  cartDetails = [];
  cartCount = [];
  addtoCart(Id, skId) {
    var inData = {
      "products": [{
        product_id: Id,
        sku_id: skId
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
      for (var i = 0; i < this.serProducts.length; i++) {
        for (var j = 0; j < this.serProducts[i].sku_details.length; j++) {
          this.serProducts[i].sku_details[j].product_name = this.serProducts[i].product_name;
          this.skuData.push(this.serProducts[i].sku_details[j]);
        }
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
