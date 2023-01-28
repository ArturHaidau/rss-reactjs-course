export interface BookPreviewsDto {
  docs: {
    _id: string;
    name: string;
  }[];
  page: number;
  pages: number;
}
