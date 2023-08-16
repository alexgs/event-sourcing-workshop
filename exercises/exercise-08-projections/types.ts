type ShoppingCartStatus = 'new' | 'open' | 'confirmed' | 'canceled';

export interface ProductItem {
  productId: string;
  quantity: number;
}

export interface PricedProductItem extends ProductItem {
  unitPrice: number;
}

export interface ShoppingCart {
  id: string;
  canceledAt?: Date;
  clientId: string;
  confirmedAt?: Date;
  expectedRevision: number;
  openedAt: Date;
  products: PricedProductItem[];
  status: ShoppingCartStatus;
}

// --- EVENTS ---

interface GenericEvent {
  id: string;
  type: string;
  data: unknown;
}

export interface ShoppingCartOpened extends GenericEvent {
  type: 'shopping-cart-opened';
  data: {
    clientId: string;
    openedAt: Date;
    shoppingCartId: string;
  };
}

export interface ProductAddedToCart extends GenericEvent {
  type: 'product-added-to-shopping-cart';
  data: {
    productItem: PricedProductItem;
    shoppingCartId: string;
  };
}

export interface ProductRemovedFromCart extends GenericEvent {
  type: 'product-removed-from-shopping-cart';
  data: {
    productItem: PricedProductItem;
    shoppingCartId: string;
  };
}

export interface ShoppingCartConfirmed extends GenericEvent {
  type: 'shopping-cart-confirmed';
  data: {
    confirmedAt: Date;
    shoppingCartId: string;
  };
}

export interface ShoppingCartCanceled extends GenericEvent {
  type: 'shopping-cart-canceled';
  data: {
    canceledAt: Date;
    shoppingCartId: string;
  };
}

export type ShoppingCartEvent =
  | ShoppingCartOpened
  | ProductAddedToCart
  | ProductRemovedFromCart
  | ShoppingCartCanceled
  | ShoppingCartConfirmed;

// --- COMMANDS ---

export interface AddProductToCart {
  type: 'command.add-product-to-shopping-cart';
  data: {
    productItem: ProductItem;
    shoppingCartId: string;
  };
}

export interface CancelShoppingCart {
  type: 'command.cancel-shopping-cart';
  data: {
    shoppingCartId: string;
    timestamp: Date;
  };
}

export interface ConfirmShoppingCart {
  type: 'command.confirm-shopping-cart';
  data: {
    shoppingCartId: string;
    timestamp: Date;
  };
}

export interface OpenShoppingCart {
  type: 'command.open-shopping-cart';
  data: {
    clientId: string;
    shoppingCartId: string;
    timestamp: Date;
  };
}

export interface RemoveProductFromCart {
  type: 'command.remove-product-from-cart';
  data: {
    productItem: PricedProductItem;
    shoppingCartId: string;
  };
}

export type ShoppingCartCommand =
  | AddProductToCart
  | CancelShoppingCart
  | ConfirmShoppingCart
  | OpenShoppingCart
  | RemoveProductFromCart;
