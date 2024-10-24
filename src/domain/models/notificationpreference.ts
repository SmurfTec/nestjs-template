export class NotificationPreferenceModel{
category:string;
allow_email:boolean;
allow_push:boolean;
user: number;
}



export class FetchNotificationPreferenceModel{
id:number;
category:string;
allow_email:boolean;
allow_push:boolean;
user: number;
}



export class UpdateNotificationPreferenceModel{
category?:string;
allow_email?:boolean;
allow_push?:boolean;
user?: number;
}
