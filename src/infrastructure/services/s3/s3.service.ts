import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

export interface S3UploadResult {
  url: string;
  key: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.bucketName = this.configService.get<string>('AWS_BUCKET_NAME');

    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION'), 
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    folder: string = 'uploads',
  ): Promise<S3UploadResult> {
    const fileExtension = this.getFileExtension(file.originalname);
    const fileName = `${uuidv4()}.${fileExtension}`;
    const key = `${folder}/${fileName}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      // ACL removed - bucket doesn't allow ACLs
    });

    try {
      await this.s3Client.send(command);

      const url = `https://${this.bucketName}.s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com/${key}`;

      return {
        url,
        key,
        fileName: file.originalname,
        fileType: file.mimetype,
        fileSize: file.size,
      };
    } catch (error) {
      throw new BadRequestException(`Failed to upload file to S3: ${error.message}`);
    }
  }

  async uploadFiles(
    files: Express.Multer.File[],
    folder: string = 'uploads',
  ): Promise<S3UploadResult[]> {
    const uploadPromises = files.map((file) => this.uploadFile(file, folder));
    return Promise.all(uploadPromises);
  }

  async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    try {
      await this.s3Client.send(command);
    } catch (error) {
      throw new BadRequestException(`Failed to delete file from S3: ${error.message}`);
    }
  }

  private getFileExtension(filename: string): string {
    return filename.split('.').pop() || 'bin';
  }

  getBucketName(): string {
    return this.bucketName;
  }
}
