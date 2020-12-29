import { Customer } from './../models/Customer';
import { Injectable } from '@angular/core';
import { Category } from 'app/models/Category';
import { Company } from 'app/models/Company';
import { Coupon } from 'app/models/Coupon';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  coupons: Coupon[];
  origin: Coupon[];
  companies:Company[];
  companyOrigin:Company[];
  customers:Customer[];
  customerOrigin:Customer[];
  constructor() { }

  public uploadData(coupons: Coupon[]): void{
    this.coupons = coupons;
    this.origin = coupons;
  }
  public filterByCategory(category: Category): void{
    this.resetCoupons();
    this.coupons=this.coupons.filter(item=>item.category==category);
  }

  public filterByPrice(price: number): void{
    this.resetCoupons();
    this.coupons=this.coupons.filter(item=>item.price<=price);
  }
  public filterCouponsById(id: number): void{
    this.resetCoupons();
    this.coupons=this.coupons.filter(item=>item.id==id);
  }
  public setCoupons(coupons: Coupon[]): void{
    this.coupons = coupons;
  }
  
  public resetCoupons(): void{
    this.coupons = this.origin;
  }
  public companyUploadData(companies: Company[]): void{
    this.companies = companies;
    this.companyOrigin = companies;
  }
  public setCompanies(companies: Company[]): void{
    this.companies = companies;
  }
  public getCompanies(): Company[]{
    return this.companies
  }
  public resetCompanies(): void{
    this.companies = this.companyOrigin;
  }
  public customerUploadData(customers: Customer[]): void{
    this.customers = customers;
    this.customerOrigin = customers;
  }
  public setCustomers(customers: Customer[]): void{
    this.customers = customers;
  }
  public getCustomers(): Customer[]{
    return this.customers
  }
  public resetCustomers(): void{
    this.customers = this.customerOrigin;
  }
  public deleteCoupons(){
    this.coupons=null;
  }
  
}