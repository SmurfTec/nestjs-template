import { WalletTransactionUseCases } from '../../../usecases/wallettransaction/wallettransaction.usecases';
import { CreateWalletTransactionDto, UpdateWalletTransactionDto } from './wallettransaction.dto';
export declare class WalletTransactionController {
    private readonly walletTransactionUseCases;
    constructor(walletTransactionUseCases: WalletTransactionUseCases);
    createWalletTransaction(walletTransaction: CreateWalletTransactionDto): Promise<import("../../../domain/models/wallettransaction").FetchWalletTransactionModel>;
    getWalletTransaction(id: number): Promise<{
        data: import("../../../domain/models/wallettransaction").FetchWalletTransactionModel;
    }>;
    getWalletTransactions(): Promise<import("../../../domain/models/wallettransaction").FetchWalletTransactionModel[]>;
    updateWalletTransaction(id: number, walletTransaction: UpdateWalletTransactionDto): Promise<import("../../../domain/models/wallettransaction").FetchWalletTransactionModel>;
    deleteWalletTransaction(id: number): Promise<void>;
}
