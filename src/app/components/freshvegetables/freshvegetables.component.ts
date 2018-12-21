import { Component, OnInit } from '@angular/core';
import { appService } from './../../services/mahaliServices/mahali.service';
import { ActivatedRoute, NavigationExtras, Router, Params } from '@angular/router';
@Component({
  selector: 'app-freshvegetables',
  templateUrl: './freshvegetables.component.html',
  styleUrls: ['./freshvegetables.component.css']
})
export class FreshvegetablesComponent implements OnInit {
 
  constructor(private route: ActivatedRoute, public router: Router,public appService: appService) {
    this.route.queryParams.subscribe(params=> {
      if( params.action === 'category'){
        this.catId = params.catId;
        this.getCatProducts();
      }else if(params.action === 'subCategory'){
        this.subId = params.subId;
        this.getSubProducts();
      }
    })
   }

   catId;
   subId;
   selectedCat;
   showsub:boolean;
  //  showSubCategories:boolean;
   subcatData = [];
  ngOnInit() {
    this.getCategories();
  }

  
  prodData = [];
  noData = false;
  getCatProducts(){
    this.appService.productByCatId(this.catId).subscribe(res=> {
      this.prodData = res.json().products;
      // alert(this.prodData);
      if(res.json().message==="No records Found"){
      this.noData = true;
      }


    },err=> {

    })
  }
 
  showSubCat(Id) {
    this.appService.getSubCat(Id).subscribe(resp => {
        this.subcatData=resp.json().sub_category;
        this.showsub = true;
        console.log(this.subcatData);
    }, error => {

    })
}
  getSubProducts(){
    this.appService.productBySubCatId(this.subId).subscribe(res=> {
      this.prodData = res.json().products;
      if(res.json().message==="No records Found"){
        this.noData = true;
              }
    },err=> {

    })
  }
  category = [];
  skuData = [];
  getCategories() {
    this.appService.getCategories().subscribe(resp => {
        this.category = resp.json().categories;
        for(var i=0;i<this.category.length;i++){
          this.skuData =this.category[i].sku_details;
          // this.category[i].skuValue=this.category[i].sku_details.size;
          // this.category[i].skid=this.category[i].sku_details[0].skid;
          // this.category[i].selling_price=this.category[i].sku_details[0].selling_price;
          // this.category[i].prodName = this.category[i].product_name;
          this.category[i].img=this.category[i].sku_details[0].image;
         }
    })
}
}
