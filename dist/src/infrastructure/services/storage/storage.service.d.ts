import Minio from 'minio';
export declare class StorageService {
    minioClient: any;
    constructor();
    uploadFile(bucketName: string, fileName: string, filePath: string, metaData: Minio.ItemBucketMetadata): Promise<unknown>;
    getFile(bucketName: string, fileName: string, path: string): Promise<void>;
}
