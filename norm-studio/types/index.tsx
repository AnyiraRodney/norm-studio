export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  stage: 'raw' | 'process' | 'partnership' | 'result';
}
