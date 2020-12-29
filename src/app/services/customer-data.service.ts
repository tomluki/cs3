import { AdminService } from './admin.service';
import { Injectable } from '@angular/core';
import { Customer } from 'app/models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {
  customers:Customer[];
  origin:Customer[];
  constructor(private adminService:AdminService) { }
  public getAllCustomers(): Customer[]{
    return this.customers;
  }
  public setCustomers(customers:Customer[]):void{
    this.origin=customers;
    this.customers=customers;
  }
  public addCustomer(customer:Customer):void{
    this.customers.push(customer);
  }
  public deleteCustomer(customer:Customer):void{
    this.customers=this.customers.filter(item=>item.id != customer.id)
  }
  public deleteAllCustomers():void{
    this.customers=null;
  }
  public updateData():Customer[]{
    this.adminService.getAllCustomers().subscribe(
      (custs)=>{this.customers = custs}, 
      (err)=>{err.error})
      return this.customers
  }
}
