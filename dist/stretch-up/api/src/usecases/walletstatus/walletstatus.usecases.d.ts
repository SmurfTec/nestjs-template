import { WalletStatusModel, UpdateWalletStatusModel } from '../../domain/models/walletstatus';
import { WalletStatusRepository } from '../../infrastructure/repository/walletstatus.repository';
export declare class WalletStatusUseCases {
    private readonly walletStatusRepository;
    constructor(walletStatusRepository: WalletStatusRepository);
    createWalletStatus(walletStatusModel: WalletStatusModel): Promise<import("../../domain/models/walletstatus").FetchWalletStatusModel>;
    getWalletStatus(id: number): Promise<{
        data: import("../../domain/models/walletstatus").FetchWalletStatusModel;
    }>;
    getWalletStatuses(): Promise<import("../../domain/models/walletstatus").FetchWalletStatusModel[]>;
    updateWalletStatus(id: number, walletStatusUpdateModel: UpdateWalletStatusModel): Promise<import("../../domain/models/walletstatus").FetchWalletStatusModel>;
    deleteWalletStatus(id: number): Promise<void>;
}
