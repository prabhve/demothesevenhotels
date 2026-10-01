/**
 * Mock FileUpload Service for Hotel Management CMS
 * Mimics a real-world cloud media storage service (e.g. S3, Cloud Storage, or Cloudinary)
 * with simulated asynchronous latency, upload progress tracking, file validation, and local persistence.
 */

export interface UploadedMediaItem {
  id: string;
  url: string;
  filename: string;
  sizeBytes: number;
  formattedSize: string;
  mimeType: string;
  uploadedAt: string;
  width?: number;
  height?: number;
}

export interface UploadProgressCallback {
  (progressPercent: number): void;
}

class MockFileUploadService {
  private mediaStorageKey = 'sevens_hotel_uploaded_media_registry';

  // Format bytes helper
  private formatBytes(bytes: number, decimals = 1): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  /**
   * Upload an image or video file with simulated progress and local Base64 URL resolution
   */
  public async uploadMedia(
    file: File,
    onProgress?: UploadProgressCallback
  ): Promise<UploadedMediaItem> {
    // Validate file type
    const isValidType = file.type.startsWith('image/') || file.type.startsWith('video/');
    if (!isValidType) {
      throw new Error('Invalid file format. Please upload an image (JPG, PNG, WebP) or video (MP4, WebM).');
    }

    // Validate size (max 25MB)
    const maxSizeBytes = 25 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      throw new Error('File size exceeds the 25MB limit. Please compress or choose a smaller file.');
    }

    // Simulate upload progress steps
    if (onProgress) {
      onProgress(15);
      await new Promise((r) => setTimeout(r, 100));
      onProgress(45);
      await new Promise((r) => setTimeout(r, 150));
      onProgress(80);
      await new Promise((r) => setTimeout(r, 120));
      onProgress(100);
    }

    // Convert file to Data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const mediaItem: UploadedMediaItem = {
            id: `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            url: event.target.result as string,
            filename: file.name,
            sizeBytes: file.size,
            formattedSize: this.formatBytes(file.size),
            mimeType: file.type,
            uploadedAt: new Date().toISOString(),
          };

          // Save to local registry
          this.saveToRegistry(mediaItem);
          resolve(mediaItem);
        } else {
          reject(new Error('Failed to read file contents.'));
        }
      };
      reader.onerror = () => reject(new Error('Error reading uploaded file.'));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Save media metadata item to local storage registry
   */
  private saveToRegistry(item: UploadedMediaItem): void {
    try {
      const existing = this.getAllMedia();
      const updated = [item, ...existing.filter((m) => m.id !== item.id)].slice(0, 50);
      localStorage.setItem(this.mediaStorageKey, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not persist uploaded media item to registry (likely quota):', e);
    }
  }

  /**
   * Get all uploaded media items
   */
  public getAllMedia(): UploadedMediaItem[] {
    try {
      const raw = localStorage.getItem(this.mediaStorageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  /**
   * Delete uploaded media item
   */
  public async deleteMedia(id: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 150));
    try {
      const existing = this.getAllMedia();
      const updated = existing.filter((m) => m.id !== id);
      localStorage.setItem(this.mediaStorageKey, JSON.stringify(updated));
      return true;
    } catch {
      return false;
    }
  }
}

export const fileUploadService = new MockFileUploadService();
