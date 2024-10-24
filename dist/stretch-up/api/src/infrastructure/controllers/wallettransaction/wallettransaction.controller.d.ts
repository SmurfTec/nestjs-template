import { WalletTransactionUseCases } from '../../../usecases/wallettransaction/wallettransaction.usecases';
import { CreateWalletTransactionDto, UpdateWalletTransactionDto } from './wallettransaction.dto';
export declare class WalletTransactionController {
    private readonly walletTransactionUseCases;
    constructor(walletTransactionUseCases: WalletTransactionUseCases);
    createWalletTransaction(walletTransaction: CreateWalletTransactionDto): any;
    getWalletTransaction(id: number): any;
    getWalletTransactions(): any;
    updateWalletTransaction(id: number, walletTransaction: UpdateWalletTransactionDto): any;
    deleteWalletTransaction(id: number): any;
}
