// --- TYPE CONSTANTS ---

type SHOPPING_CART_CREATED = 'event-type.shopping-cart-created';

// --- TYPE ALIASES ---

type CartId = string;
type UserId = string;

// --- EVENTS ---

type BaseEvent<
  EventType extends string = string,
  EventData extends Record<string, unknown> = Record<string, unknown>
> = Readonly<{
  type: Readonly<EventType>;
  data: Readonly<EventData>;
}>;

type ShoppingCartCreatedEvent = BaseEvent<
  SHOPPING_CART_CREATED,
  {
    userId: UserId,
    shoppingCartId: CartId
  }
>;

type ProductAddedToCart = {};
type ProductRemovedFromCart = {};
type ShoppingCartConfirmed = {};
type ShoppingCartCanceled = {};
