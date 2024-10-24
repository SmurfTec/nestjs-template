import { WalletTransactionModel, UpdateWalletTransactionModel } from '../../domain/models/wallettransaction';
import { WalletTransactionRepository } from '../../infrastructure/repository/wallettransaction.repository';
export declare class WalletTransactionUseCases {
    private readonly walletTransactionRepository;
    constructor(walletTransactionRepository: WalletTransactionRepository);
    createWalletTransaction(walletTransactionModel: WalletTransactionModel): Promise<import("../../domain/models/wallettransaction").FetchWalletTransactionModel>;
    getWalletTransaction(id: number): Promise<{
        data: import("../../domain/models/wallettransaction").FetchWalletTransactionModel;
    }>;
    getWalletTransactions(): Promise<import("../../domain/models/wallettransaction").FetchWalletTransactionModel[]>;
    updateWalletTransaction(id: number, walletTransactionUpdateModel: UpdateWalletTransactionModel): Promise<import("../../domain/models/wallettransaction").FetchWalletTransactionModel>;
    deleteWalletTransaction(id: number): Promise<void>;
}
