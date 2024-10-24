import { WalletUseCases } from '../../../usecases/wallet/wallet.usecases';
import { CreateWalletDto, UpdateWalletDto } from './wallet.dto';
export declare class WalletController {
    private readonly walletUseCases;
    constructor(walletUseCases: WalletUseCases);
    createWallet(wallet: CreateWalletDto): any;
    getWallet(id: number): any;
    getWallets(): any;
    updateWallet(id: number, wallet: UpdateWalletDto): any;
    deleteWallet(id: number): any;
}
