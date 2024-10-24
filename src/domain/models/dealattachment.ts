export class DealAttachmentModel{
attachment:string;
resource_id:string;
deal: number;
}



export class FetchDealAttachmentModel{
id:number;
attachment:string;
resource_id:string;
deal: number;
}



export class UpdateDealAttachmentModel{
attachment?:string;
resource_id?:string;
deal?: number;
}
