import { WalletModel, FetchWalletModel, UpdateWalletModel } from '../models/Wallet';
export interface IWallet {
    createWallet(walletModel: WalletModel): Promise<FetchWalletModel>;
    getWallet(id: number): Promise<FetchWalletModel>;
    getWallets(): Promise<FetchWalletModel[]>;
    updateWallet(id: number, updateWalletModel: UpdateWalletModel): Promise<FetchWalletModel>;
    deleteWallet(id: number): Promise<void>;
}
