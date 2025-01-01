import { Body, Controller, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Cloudinary')
@Controller('imgs')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

}
