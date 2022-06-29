// --- TYPE CONSTANTS ---

export const PRODUCT_ADDED_TO_CART = 'event-type.product-added-to-cart' as const;
export const PRODUCT_REMOVED_FROM_CART = 'event-type.product-removed-from-cart' as const;
export const SHOPPING_CART_CANCELED = 'event-type.shopping-cart-canceled' as const;
export const SHOPPING_CART_CONFIRMED = 'event-type.shopping-cart-confirmed' as const;
export const SHOPPING_CART_CREATED = 'event-type.shopping-cart-created' as const;
export const SHOPPING_CART_FULFILLMENT_STARTED = 'event-type.shopping-cart-fulfillment-stated';
export const SHOPPING_CART_STATUS = {
  CLOSED: 'shopping-cart-status.closed',
  OPEN: 'shopping-cart-status.open',
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
    productId: ProductId,
    quantity: number,
    shoppingCartId: CartId,
    unitPrice: number,
  }
>;

export type ProductRemovedFromCart = BaseEvent<
  typeof PRODUCT_REMOVED_FROM_CART,
  {
    productId: ProductId,
    quantity: number,
    shoppingCartId: CartId,
    unitPrice: number,
  }
>;

export type ShoppingCartCanceled = BaseEvent<
  typeof SHOPPING_CART_CANCELED,
  {
    shoppingCartId: CartId,
    status: typeof SHOPPING_CART_STATUS.CLOSED,
    userId: UserId,
  }
>;

export type ShoppingCartConfirmed = BaseEvent<
  typeof SHOPPING_CART_CONFIRMED,
  {
    shoppingCartId: CartId,
    status: typeof SHOPPING_CART_STATUS.CLOSED,
    userId: UserId,
  }
>;

export type ShoppingCartCreatedEvent = BaseEvent<
  typeof SHOPPING_CART_CREATED,
  {
    shoppingCartId: CartId,
    status: typeof SHOPPING_CART_STATUS.OPEN,
    userId: UserId,
  }
>;

// --- PROJECTIONS ---

export type ShoppingCart = {};
