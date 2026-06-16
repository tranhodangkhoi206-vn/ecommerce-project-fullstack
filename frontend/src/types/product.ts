export interface Product {
  _id: string;
  sellerId: string;
  name: string;
  price: number;
  isSale: boolean;
  description: string;
  averageRating: number;
  reviewCount: number;
  stockQuantity: number;
  quantitySold: number;
  imgUrl: Array<string>;
  reviews: Array<object>;
  category: string;
}
