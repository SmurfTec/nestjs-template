import { WalletStatusModel,FetchWalletStatusModel,UpdateWalletStatusModel } from '../models/WalletStatus';
export interface IWalletStatus {
createWalletStatus(walletStatusModel:WalletStatusModel): Promise<FetchWalletStatusModel>;
getWalletStatus(id:number) : Promise<FetchWalletStatusModel>;
getWalletStatuses() : Promise<FetchWalletStatusModel[]>;
updateWalletStatus(id: number, updateWalletStatusModel:UpdateWalletStatusModel): Promise<FetchWalletStatusModel>;
deleteWalletStatus(id:number) : Promise<void>;
}
