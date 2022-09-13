// Custom type for valid image directories
// originl -> original photos
// thumbs -> edited photos
export type ImageDirectory = 'original' | 'thumbs';

// supported image formats for conversion
export type ImageFormat = 'png' | 'jpg' | 'avif' | 'jpeg' | 'webp';

// interface for query string for image resizing
export interface ResizeQuery {
  width: number;
  height: number;
  filename: string;
}

// interface for query string for image converison
export interface ConvertQuery {
  format: ImageFormat;
  filename: string;
}

export interface ImageFile {
  source: string;
  target: string;
}
export interface SharpResult {
  data: string;
  errors?: object;
  success: boolean;
}
