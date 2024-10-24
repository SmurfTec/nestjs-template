import { WalletStatusUseCases } from '../../../usecases/walletstatus/walletstatus.usecases';
import { CreateWalletStatusDto, UpdateWalletStatusDto } from './walletstatus.dto';
export declare class WalletStatusController {
    private readonly walletStatusUseCases;
    constructor(walletStatusUseCases: WalletStatusUseCases);
    createWalletStatus(walletStatus: CreateWalletStatusDto): any;
    getWalletStatus(id: number): any;
    getWalletStatuses(): any;
    updateWalletStatus(id: number, walletStatus: UpdateWalletStatusDto): any;
    deleteWalletStatus(id: number): any;
}
