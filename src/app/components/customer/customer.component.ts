import { ShowDetailsComponent } from './../show-details/show-details.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Coupon } from 'app/models/Coupon';
import { CustomerService } from 'app/services/customer.service';
import { DataService } from 'app/services/data.service';
import { FiltersService } from 'app/services/filters.service';
import { Category } from 'app/models/Category';
import { Customer } from 'app/models/Customer';
import { AlertComponent } from '../alert/alert.component';
import { ActionAlertComponent } from '../action-alert/action-alert.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(public _modalService: NgbModal,private customerService: CustomerService,private dialog: MatDialog, private dataService: DataService, private filterService: FiltersService) { }

  coupons: Coupon[];
  customer: Customer
  ngOnInit(): void {
    this.customerService.getCouponShop().subscribe(
      (res)=>{ this.dataService.setCoupons(res); this.filterService.uploadData(res)},
      (err)=>{err.message})
      this.customerService.getCustomerDetails().subscribe(
        (res)=>{this.customer=res, this.coupons=res.coupons}, 
        (err)=>{err.message})
  }

 
  public getCoupons(): Coupon[]{
    return this.dataService.getAllCoupons();
  }
  
  public getByCategory(category: Category): void{
     this.filterService.filterByCategory(category);
  }
  public getByPrice(price: number): void{
    if (price==0) {
      this.filterService.resetCoupons();
    } else {
      this.filterService.filterByPrice(price);  
    }
    
    
  }
  public purchaseCoupon(coupon: Coupon): void{
    let message:string;
    const result =  this._modalService.open(ActionAlertComponent);
    result.componentInstance.titlee = "purchase " + coupon.title + "?";
    result.componentInstance.message = 'Are you sure you want to purchase '+ coupon.title+" coupon? price:"+coupon.price;
    result.result.then((result) => {
      this.customerService.purchaseCoupon(coupon).subscribe(
        (res)=>{this.coupons.push(coupon), message=coupon.title+" coupon has been purchased!"; this.dialog.open(AlertComponent,{data:{message}})},
        (err)=>{message=err.error; this.dialog.open(AlertComponent,{data:{message}})})
    })                    
  }
  public unpurchased(coupon: Coupon){
    let purchased = this.coupons.find((res)=>res.id===coupon.id);
    return !purchased;
  }
 
  public showDetails(customer: Customer){
    customer = this.customer;
    this.dialog.open(ShowDetailsComponent, {data:{customer}})
  }
}