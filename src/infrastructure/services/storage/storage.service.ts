import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Minio from 'minio';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment-config.service';
const configSerivce = new EnvironmentConfigService(new ConfigService());

@Injectable()
export class StorageService {
  minioClient;
  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: configSerivce.getMinioEndPoint(),
      port: +configSerivce.getCacheManagerPort(),
      useSSL: true,
      accessKey: configSerivce.getMinioAccessKey(),
      secretKey: configSerivce.getMinioSecretKey(),
    });
  }

  async uploadFile(
    bucketName: string,
    fileName: string,
    filePath: string,
    metaData: Minio.ItemBucketMetadata,
  ) {
    return new Promise((resolve, reject) => {
      this.minioClient.fPutObject(
        bucketName,
        fileName,
        filePath,
        metaData,
        function (err, etag) {
          if (err) {
            reject(err.message);
          }
          resolve('file uploaded');
        },
      );
    });
  }

  async getFile(bucketName: string, fileName: string, path: string) {
    await this.minioClient.fGetObject(bucketName, fileName, path);
    return;
  }
}
