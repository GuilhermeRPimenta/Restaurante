type OrderStatus = "PENDENTE" | "EM_PREPARO" | "ENTREGUE" | "CANCELADO";

interface Order {
  id: number;
  totalPrice: string;
  status: OrderStatus;
  createdAt: Date;
  products: {
    name: string;
    quantity: number;
    price: string;
  }[];
}

export { type Order };
