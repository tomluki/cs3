import { Coupon } from "./Coupon";

export class Customer{

    public constructor(public id?: number, public firstName?: string, public lastName?: string, public email?: string, public password?: string, public coupons?: Coupon[]){}
}