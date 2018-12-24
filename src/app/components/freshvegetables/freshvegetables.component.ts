import { Component, OnInit } from '@angular/core';
import { appService } from './../../services/mahaliServices/mahali.service';
import { ActivatedRoute, NavigationExtras, Router, Params } from '@angular/router';
@Component({
  selector: 'app-freshvegetables',
  templateUrl: './freshvegetables.component.html',
  styleUrls: ['./freshvegetables.component.css']
})
export class FreshvegetablesComponent implements OnInit {

  constructor(private route: ActivatedRoute, public router: Router, public appService: appService) {
    this.route.queryParams.subscribe(params => {
      if (params.action === 'category') {
        this.catId = params.catId;
        this.getCatProducts();
      } else if (params.action === 'subCategory') {
        this.subId = params.subId;
        this.getSubProducts();
      }
    })
  }

  catId;
  subId;
  selectedCat;
  showsub: boolean;
  //  showSubCategories:boolean;
  subcatData = [];
  ngOnInit() {
    this.getCategories();
  }


  prodData = [];
  noData = false;
  getCatProducts() {
    this.appService.productByCatId(this.catId).subscribe(res => {
      this.prodData = res.json().products;
      for (var i = 0; i < this.prodData.length; i++) {
        for (var j = 0; j < this.prodData[i].sku_details.length; j++) {
          this.skuData.push(this.prodData[i].sku_details[j]);
        }
      }
      if (res.json().message === "No records Found") {
        this.noData = true;
      }


    }, err => {

    })
  }

  showSubCat(Id) {
    this.appService.getSubCat(Id).subscribe(resp => {
      this.subcatData = resp.json().sub_category;
      this.showsub = true;

    }, error => {

    })
  }
  getSubProducts() {
    this.appService.productBySubCatId(this.subId).subscribe(res => {
      this.prodData = res.json().products;
      this.skuData = [];
      for (var i = 0; i < this.prodData.length; i++) {
        for (var j = 0; j < this.prodData[i].sku_details.length; j++) {
          this.skuData.push(this.prodData[i].sku_details[j]);

        }
      }
      if (res.json().message === "No records Found") {
        this.noData = true;
      }
    }, err => {

    })
  }
  category = [];
  skuData = [];
  getCategories() {
    this.appService.getCategories().subscribe(resp => {
      this.category = resp.json().categories;
    })
  }
  cartDetails;
  cartCount;
  showProduxtDetails(prodId) {
    this.router.navigate(['/productdetails'], { queryParams: { prodId: prodId } });
  }

  addtoCart(Id, skId) {
    var inData = {
      "products": [{
        product_id: Id,
        sku_id: skId
      }],
      "vendor_id": JSON.parse(localStorage.getItem('userId'))
    }
    this.appService.addtoCart(inData).subscribe(res => {
      this.cartDetails = res.json().selling_price_total;
      this.cartCount = res.json().count;
      this.getCart();
      swal(res.json().message, "", "success");
    }, err => {

    })
  }
  getCart() {
    var inData = localStorage.getItem('userId');
    this.appService.getCart(inData).subscribe(res => {
      this.cartDetails = res.json().cart_details;
      this.cartCount = res.json().count;
    }, err => {

    })
  }
  changeSize(Id) {
    for (var i = 0; i < this.skuData.length; i++) {
      if (Id === this.skuData[i].skid) {
        this.skuData[i].img = this.skuData[i].product_image;
        this.skuData[i].selling_price = this.skuData[i].selling_price;
        this.skuData[i].actual_price = this.skuData[i].actual_price;
      }
    }
  }
}
