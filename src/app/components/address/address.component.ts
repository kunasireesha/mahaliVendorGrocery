import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    showBusinessDetails = true;
    showStationaryData = false;
    showBankDetails = false;
    showAdd = false;

    showBusiness() {
        this.showBusinessDetails = true;
        this.showStationaryData = false;
        this.showBankDetails = false;
        this.showAdd = false;
    }

    showStationary() {
        this.showBusinessDetails = false;
        this.showStationaryData = true;
        this.showBankDetails = false;
        this.showAdd = false;

    }

    showBank() {
        this.showBusinessDetails = false;
        this.showStationaryData = false;
        this.showBankDetails = true;
        this.showAdd = false;
    }

    addProd() {
        this.showBusinessDetails = false;
        this.showStationaryData = false;
        this.showBankDetails = false;
        this.showAdd = true;
    }

}
