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
  wholeId;
  product;
  serProd = false;
  wholeProd = false;
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
  }
  showCategories = false;

  collapse() {
    this.showCategories = !this.showCategories;

  }
  showProduxtDetails() {
    this.router.navigate(['/productdetails'], { queryParams: { order: 'popular' } });
  }
  products = [];
  skuid;
  getWholeProds() {
    this.appService.wholeProducts(this.wholeId).subscribe(res => {
      this.products = res.json().products;
      for (var i = 0; i < this.products.length; i++) {
        for (var k = 0; k < this.products[i].sku_details.length; k++) {
          // if(parseInt(skId) ===this.products[i].sku_details[k].skid){
          this.products[i].actual_price = this.products[i].sku_details[0].actual_price;
          this.products[i].selling_price = this.products[i].sku_details[0].selling_price;
          this.products[i].product_image = this.products[i].sku_details[0].product_image;
          this.skuid = this.products[i].sku_details[0].skid;


          // this.skuArr.push(this.skuData);

          // }
        }
      }


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
  addtoCart(Id) {
    var inData = {
      "products": [{
        product_id: Id,
        sku_id: this.skuid
      }],
      "vendor_id": JSON.parse(localStorage.getItem('userId'))
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
  search(product) {
    this.appService.searchProducts(product).subscribe(res => {
      this.serProducts = res.json().data;
    }, err => {

    })
  }
}
