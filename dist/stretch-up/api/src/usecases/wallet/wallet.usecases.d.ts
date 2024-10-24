import { WalletModel, UpdateWalletModel } from '../../domain/models/wallet';
import { WalletRepository } from '../../infrastructure/repository/wallet.repository';
export declare class WalletUseCases {
    private readonly walletRepository;
    constructor(walletRepository: WalletRepository);
    createWallet(walletModel: WalletModel): Promise<import("../../domain/models/wallet").FetchWalletModel>;
    getWallet(id: number): Promise<{
        data: import("../../domain/models/wallet").FetchWalletModel;
    }>;
    getWallets(): Promise<import("../../domain/models/wallet").FetchWalletModel[]>;
    updateWallet(id: number, walletUpdateModel: UpdateWalletModel): Promise<import("../../domain/models/wallet").FetchWalletModel>;
    deleteWallet(id: number): Promise<void>;
}
