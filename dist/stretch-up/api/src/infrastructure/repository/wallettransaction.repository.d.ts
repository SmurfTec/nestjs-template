import { Repository } from 'typeorm';
import { WalletTransactionModel, FetchWalletTransactionModel, UpdateWalletTransactionModel } from '../../domain/models/wallettransaction';
import { IWalletTransaction } from '../../domain/repositories/wallettransaction.repository.interface';
import { WalletTransactions } from '../entities/wallettransaction.entity';
export declare class WalletTransactionRepository implements IWalletTransaction {
    private walletTransactionRepository;
    constructor(walletTransactionRepository: Repository<WalletTransactions>);
    createWalletTransaction(walletTransactionModel: WalletTransactionModel): Promise<FetchWalletTransactionModel>;
    getWalletTransaction(id: number): Promise<FetchWalletTransactionModel>;
    getWalletTransactions(): Promise<FetchWalletTransactionModel[]>;
    updateWalletTransaction(id: number, updateWalletTransactionModel: UpdateWalletTransactionModel): Promise<FetchWalletTransactionModel>;
    deleteWalletTransaction(id: number): Promise<void>;
}
