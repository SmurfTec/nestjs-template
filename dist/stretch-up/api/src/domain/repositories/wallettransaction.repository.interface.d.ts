import { WalletTransactionModel, FetchWalletTransactionModel, UpdateWalletTransactionModel } from '../models/WalletTransaction';
export interface IWalletTransaction {
    createWalletTransaction(walletTransactionModel: WalletTransactionModel): Promise<FetchWalletTransactionModel>;
    getWalletTransaction(id: number): Promise<FetchWalletTransactionModel>;
    getWalletTransactions(): Promise<FetchWalletTransactionModel[]>;
    updateWalletTransaction(id: number, updateWalletTransactionModel: UpdateWalletTransactionModel): Promise<FetchWalletTransactionModel>;
    deleteWalletTransaction(id: number): Promise<void>;
}
