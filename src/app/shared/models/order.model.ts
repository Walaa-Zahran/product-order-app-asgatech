export interface Order {
  OrderId: number;
  OrderDate: string;
  UserId: string;
  Products: Array<{ ProductId: number; Quantity: number }>;
  PaymentType: string;
}
