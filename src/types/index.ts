export interface Price {
  main: number;
  fractional: number;
}

export interface Product {
  id: number;
  name: string;
  price: Price;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}