export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "out-for-delivery"
  | "delivered"
  | "cancelled";

export interface DeliveryZone {
  id: string;
  name: string;
  center: string;
  radiusKm: number;
  postcodeRanges: string[];
  deliveryDays: string[];
  cutoffTime: string;
}

export interface DeliveryAddress {
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  zoneId: string;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  deliveryAddress: DeliveryAddress;
  preferredWindow?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  name: string;
  type: "plan" | "builder-meal" | "add-on";
  quantity: number;
  unitPrice: number;
  total: number;
}
