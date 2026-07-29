/**
 * Configuración centralizada de Cloudinary para imágenes y CSF.
 */
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Sube un archivo a Cloudinary. Aquí se deja preparado el helper para conectar el MVP.
 */
export async function uploadToCloudinary(filePath: string, folder: string) {
  return cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: 'auto'
  });
}
