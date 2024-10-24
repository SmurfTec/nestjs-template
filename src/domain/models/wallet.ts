export class WalletModel{
amount:number;
bank_name:string;
full_legal_name:string;
account_number:string;
}



export class FetchWalletModel{
id:number;
amount:number;
bank_name:string;
full_legal_name:string;
account_number:string;
}



export class UpdateWalletModel{
amount?:number;
bank_name?:string;
full_legal_name?:string;
account_number?:string;
}
