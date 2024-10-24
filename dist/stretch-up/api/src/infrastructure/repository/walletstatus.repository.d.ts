import { Repository } from 'typeorm';
import { WalletStatusModel, FetchWalletStatusModel, UpdateWalletStatusModel } from '../../domain/models/walletstatus';
import { IWalletStatus } from '../../domain/repositories/walletstatus.repository.interface';
import { WalletStatuses } from '../entities/walletstatus.entity';
export declare class WalletStatusRepository implements IWalletStatus {
    private walletStatusRepository;
    constructor(walletStatusRepository: Repository<WalletStatuses>);
    createWalletStatus(walletStatusModel: WalletStatusModel): Promise<FetchWalletStatusModel>;
    getWalletStatus(id: number): Promise<FetchWalletStatusModel>;
    getWalletStatuses(): Promise<FetchWalletStatusModel[]>;
    updateWalletStatus(id: number, updateWalletStatusModel: UpdateWalletStatusModel): Promise<FetchWalletStatusModel>;
    deleteWalletStatus(id: number): Promise<void>;
}
