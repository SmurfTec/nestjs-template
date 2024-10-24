import { WalletStatusUseCases } from '../../../usecases/walletstatus/walletstatus.usecases';
import { CreateWalletStatusDto, UpdateWalletStatusDto } from './walletstatus.dto';
export declare class WalletStatusController {
    private readonly walletStatusUseCases;
    constructor(walletStatusUseCases: WalletStatusUseCases);
    createWalletStatus(walletStatus: CreateWalletStatusDto): Promise<import("../../../domain/models/walletstatus").FetchWalletStatusModel>;
    getWalletStatus(id: number): Promise<{
        data: import("../../../domain/models/walletstatus").FetchWalletStatusModel;
    }>;
    getWalletStatuses(): Promise<import("../../../domain/models/walletstatus").FetchWalletStatusModel[]>;
    updateWalletStatus(id: number, walletStatus: UpdateWalletStatusDto): Promise<import("../../../domain/models/walletstatus").FetchWalletStatusModel>;
    deleteWalletStatus(id: number): Promise<void>;
}
