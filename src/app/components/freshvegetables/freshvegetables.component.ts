import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-freshvegetables',
  templateUrl: './freshvegetables.component.html',
  styleUrls: ['./freshvegetables.component.css']
})
export class FreshvegetablesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  showCategories = false;
  collapse() {
    this.showCategories = !this.showCategories;

  }
}
