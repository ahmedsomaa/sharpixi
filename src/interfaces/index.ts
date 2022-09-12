// Custom type for valid image directories
// originl -> original photos
// thumbs -> edited photos
export type ImageDirectory = 'original' | 'thumbs';

// interface to image query string
export interface ImageQueryString {
  width: number;
  height: number;
  filename: string;
}
