export default interface CartItem {
  id: any | null;
  product: {
    id: any | null;
    name: string;
    imageUrl: string;
    price: number;
    stock: number;
    size: string;
    color: string;
  };
  quantity: number;
}
