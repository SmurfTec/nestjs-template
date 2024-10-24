export class DealModel{
property_name:string;
property_apartment:string;
property_area:string;
property_unit_sale_date:Date;
developer_name:string;
developer_commission:number;
expected_commission_paydate:Date;
deal: number;
}



export class FetchDealModel{
id:number;
property_name:string;
property_apartment:string;
property_area:string;
property_unit_sale_date:Date;
developer_name:string;
developer_commission:number;
expected_commission_paydate:Date;
deal: number;
}



export class UpdateDealModel{
property_name?:string;
property_apartment?:string;
property_area?:string;
property_unit_sale_date?:Date;
developer_name?:string;
developer_commission?:number;
expected_commission_paydate?:Date;
deal?: number;
}