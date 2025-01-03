import { BadRequestException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier'; 

export class CloudinaryService {
  constructor() {
    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

//upload image
private async uploadFile(file: Express.Multer.File, options: object): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  private validateFile(
    file: Express.Multer.File,
    type: 'image',
    maxSizeMB: number = 100,
  ): void {
    if (!file.mimetype.startsWith(type + '/')) {
      throw new BadRequestException(`File is not a ${type}.`);
    }

    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxSizeMB) {
      throw new BadRequestException(`File size exceeds the ${maxSizeMB}MB limit.`);
    }
  }

  async uploadImageService(
    imageName: string,
    file: Express.Multer.File,
  ): Promise<{
    uploadResult: UploadApiResponse | UploadApiErrorResponse,
  }> {
    const timestamp = new Date();
    this.validateFile(file, 'image');

    const normalizedImageName = imageName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const newImageName = normalizedImageName.replace(/[^a-zA-Z0-9]/g, '').substring(0, 25);

    const publicId = `product/images/${newImageName}-${timestamp.getTime()}`;
    const uploadResult = await this.uploadFile(file, { public_id: publicId });

    return { uploadResult };
  }

  async deleteImage(url: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
    const publicId = url.split('/upload/')[1].split('.')[0];

    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  async deleteManyImagesService(urls: string[]): Promise<void> {
    await Promise.all(urls.map((url) => this.deleteImage(url)));
  }
}