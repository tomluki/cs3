import { Coupon } from './Coupon';
export class Company{
    public constructor(public id?:number,public email?:string,public name?:string,public password?:string, public coupons?:Coupon[]){
        
    }
}