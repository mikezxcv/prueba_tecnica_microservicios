export interface CreateOrderI {
  customerId: number;
  products: ProductsI[];
}

interface ProductsI {
  productId: number;
  quantity: number;
  price: number;
  name: string;
}
