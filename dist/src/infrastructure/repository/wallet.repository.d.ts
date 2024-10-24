import { Repository } from 'typeorm';
import { WalletModel, FetchWalletModel, UpdateWalletModel } from '../../domain/models/wallet';
import { IWallet } from '../../domain/repositories/wallet.repository.interface';
import { Wallets } from '../entities/wallet.entity';
export declare class WalletRepository implements IWallet {
    private walletRepository;
    constructor(walletRepository: Repository<Wallets>);
    createWallet(walletModel: WalletModel): Promise<FetchWalletModel>;
    getWallet(id: number): Promise<FetchWalletModel>;
    getWallets(): Promise<FetchWalletModel[]>;
    updateWallet(id: number, updateWalletModel: UpdateWalletModel): Promise<FetchWalletModel>;
    deleteWallet(id: number): Promise<void>;
}
