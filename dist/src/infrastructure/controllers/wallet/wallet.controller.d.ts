import { WalletUseCases } from '../../../usecases/wallet/wallet.usecases';
import { CreateWalletDto, UpdateWalletDto } from './wallet.dto';
export declare class WalletController {
    private readonly walletUseCases;
    constructor(walletUseCases: WalletUseCases);
    createWallet(wallet: CreateWalletDto): Promise<import("../../../domain/models/wallet").FetchWalletModel>;
    getWallet(id: number): Promise<{
        data: import("../../../domain/models/wallet").FetchWalletModel;
    }>;
    getWallets(): Promise<import("../../../domain/models/wallet").FetchWalletModel[]>;
    updateWallet(id: number, wallet: UpdateWalletDto): Promise<import("../../../domain/models/wallet").FetchWalletModel>;
    deleteWallet(id: number): Promise<void>;
}
