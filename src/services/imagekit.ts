// Image upload service using data URLs for immediate functionality
type UploadResult = { url: string; thumbnailUrl?: string };

export async function uploadToImageKit(file: File, _folder: string = '/products'): Promise<UploadResult> {
  try {
    // Use data URLs for immediate functionality (no CORS issues)
    console.log('Creating data URL for image:', file.name);
    
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          url: reader.result as string,
          thumbnailUrl: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error('Image upload failed:', error);
    throw new Error('Failed to process image');
  }
}
