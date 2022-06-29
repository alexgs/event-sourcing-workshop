// --- TYPE CONSTANTS ---

export const PRODUCT_ADDED_TO_CART = 'event-type.product-added-to-cart' as const;
export const PRODUCT_REMOVED_FROM_CART = 'event-type.product-removed-from-cart' as const;
export const SHOPPING_CART_CANCELED = 'event-type.shopping-cart-canceled' as const;
export const SHOPPING_CART_CONFIRMED = 'event-type.shopping-cart-confirmed' as const;
export const SHOPPING_CART_CREATED = 'event-type.shopping-cart-created' as const;
export const SHOPPING_CART_FULFILLMENT_STARTED = 'event-type.shopping-cart-fulfillment-stated';
export const SHOPPING_CART_STATUS = {
  PENDING: 'shopping-cart-status.pending',
  CONFIRMED: 'shopping-cart-status.confirmed',
  CANCELED: 'shopping-cart-status.canceled',
} as const;

// --- TYPE ALIASES ---

type CartId = string;
type InvoiceId = string;
type ProductId = string;
type UserId = string;

// --- EVENTS ---

export type BaseEvent<
  EventType extends string = string,
  EventData extends Record<string, unknown> = Record<string, unknown>
> = Readonly<{
  type: Readonly<EventType>;
  data: Readonly<EventData>;
}>;

export type CartFulfillmentStarted = BaseEvent<
  typeof SHOPPING_CART_FULFILLMENT_STARTED,
  {
    invoiceId: InvoiceId,
    shoppingCartId: CartId,
  }
>;

export type ProductAddedToCart = BaseEvent<
  typeof PRODUCT_ADDED_TO_CART,
  {
    product: PricedProduct,
    shoppingCartId: CartId,
  }
>;

export type ProductRemovedFromCart = BaseEvent<
  typeof PRODUCT_REMOVED_FROM_CART,
  {
    product: PricedProduct,
    shoppingCartId: CartId,
  }
>;

export type ShoppingCartCanceled = BaseEvent<
  typeof SHOPPING_CART_CANCELED,
  {
    shoppingCartId: CartId,
    status: typeof SHOPPING_CART_STATUS.CANCELED,
    userId: UserId,
  }
>;

export type ShoppingCartConfirmed = BaseEvent<
  typeof SHOPPING_CART_CONFIRMED,
  {
    shoppingCartId: CartId,
    status: typeof SHOPPING_CART_STATUS.CONFIRMED,
    userId: UserId,
  }
>;

export type ShoppingCartCreatedEvent = BaseEvent<
  typeof SHOPPING_CART_CREATED,
  {
    shoppingCartId: CartId,
    status: typeof SHOPPING_CART_STATUS.PENDING,
    userId: UserId,
  }
>;

// --- PROJECTIONS ---

export interface ShoppingCart {
  id: CartId;
  items: PricedProduct[];
  status: typeof SHOPPING_CART_STATUS;
  userId: UserId;
  canceledAt: Date | null;
  confirmedAt: Date | null;
  createdAt: Date | null;
}

// --- VALUE OBJECTS ---

export interface PricedProduct {
  id: ProductId;
  quantity: number;
  unitPrice: number;
}
