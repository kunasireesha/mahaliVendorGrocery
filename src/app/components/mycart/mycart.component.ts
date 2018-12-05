import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ItemsComponent } from '../../components/items/items.component';
import { PromocodesComponent } from '../../components/promocodes/promocodes.component';
@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.less']
})
export class MycartComponent implements OnInit {
  showCartItems = true;
  showDeliveryAddress = false;
  showAddresses = true;
  showPaymentMethode = false;
  showDeliveryType = false;
  addresses = false;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }

  showCart() {
    this.showCartItems = !this.showCartItems;
    this.showDeliveryAddress = false;
    this.showPaymentMethode = false;
  }

  //show addrss
  showAddress() {
    this.showCartItems = false;
    this.showDeliveryAddress = !this.showDeliveryAddress;
    this.showPaymentMethode = false;
    this.addresses = false;
    this.showAddresses = true;
    this.showDeliveryType = false;
    window.scrollTo(0, 0);
  }

  //add address
  addAddress() {
    this.addresses = true;
    this.showAddresses = false;
  }

  //save address
  saveAddress() {
    this.showAddresses = true;
    this.addresses = false;

  }

  //showPayment
  showPayment() {
    this.showPaymentMethode = !this.showPaymentMethode;
    this.showCartItems = false;
    this.showAddresses = false;
    this.showDeliveryAddress = false;
    window.scrollTo(0, 0);
  }
  // show shipment type
  shipmentType() {
    this.addresses = false;
    this.showAddresses = false;
    this.showDeliveryType = true;
  }

  //items popup
  showItems() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(ItemsComponent, dialogConfig);

  }
  showPromos() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(PromocodesComponent, dialogConfig);

  }
}
