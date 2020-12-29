import { CompanyService } from 'app/services/company.service';
import { Coupon } from './../../models/Coupon';
import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DataService } from 'app/services/data.service';
import { AlertComponent } from 'app/components/alert/alert.component';

@Component({
  selector: 'app-coupon-dialog',
  templateUrl: './coupon-dialog.component.html',
  styleUrls: ['./coupon-dialog.component.css']
})
export class CouponDialogComponent implements OnInit {
focus;
focus1;

  constructor(@Inject(MAT_DIALOG_DATA)public data : any, private companyService:CompanyService,private dataService:DataService,private dialog:MatDialog) {
    this.coupon=data.coupon;
   }
   public coupon=new Coupon();
   public coup = new Coupon();
  ngOnInit(): void {
  }
  public updateCoupon(){
    let message:string;
this.companyService.updateCoupon(this.coupon).subscribe(
  (coupon)=>{this.dialog.closeAll(); message=this.coupon.title+" has been updated!"; this.dialog.open(AlertComponent,{data:{message}}) }, 
  (err)=>{message=err.error; this.dialog.open(AlertComponent,{data:{message}})})
  this.dialog.closeAll()
  }
  public addCoupon(){
    let message:string;
    this.companyService.addCoupon(this.coup).subscribe(
      (coupon)=>{this.dataService.addCoupons(coupon);this.dialog.closeAll();message=this.coup.title+" has been added!"; this.dialog.open(AlertComponent,{data:{message}})}, 
      (err)=>{message=err.error; this.dialog.open(AlertComponent,{data:{message}})})

  }
}
