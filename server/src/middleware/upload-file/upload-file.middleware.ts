import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as multer from 'multer';
import * as cloudinary from 'cloudinary';
import { ConfigService } from '@nestjs/config';

// const configService = new ConfigService();

// cloudinary.v2.config({
//   cloud_name: "dp9fub7fg",
//   api_key: "682642634388924",
//   api_secret: "TdSPms24D6drds5W_6VC5EDwIsk",
// });

@Injectable()
export class CloudinaryUploadMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {
    cloudinary.v2.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_CLOUD_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_CLOUD_SECRET'),
    });
  }

  use(fieldName: string) {
    const upload = multer({ storage: multer.memoryStorage() });

    return (req: Request, res: Response, next: NextFunction) => {
      upload.single(fieldName)(req, res, (err: any) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'file upload failed' });
        }

        if (!req.file) {
          return next();
        }

        // Mengubah nama file
        const uniqueSuffix = Date.now();
        const fileName = `${fieldName}-${uniqueSuffix}`;

        cloudinary.v2.uploader
          .upload_stream(
            { folder: 'journey', public_id: fileName },
            (error, result) => {
              if (error) {
                console.error(error);
                return res
                  .status(500)
                  .json({ message: 'upload to cloudinary failed' });
              }

              req['uploadedFileUrl'] = result.secure_url;
              next();
            },
          )
          .end(req.file.buffer);
      });
    };
  }
}
