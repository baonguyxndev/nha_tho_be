import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

export const multerOptions = {
    storage: new CloudinaryStorage({
        cloudinary: cloudinary,
        params: async (req, file) => ({
            folder: 'news_images', // Thư mục lưu trữ trên Cloudinary
            resource_type: 'image', // Loại file
            public_id: file.originalname.split('.')[0], // Tên file không có đuôi
        }),
    }),
};
