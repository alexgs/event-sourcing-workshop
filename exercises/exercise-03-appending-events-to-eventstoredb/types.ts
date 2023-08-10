type ShoppingCartStatus = 'new' | 'open' | 'confirmed' | 'canceled';

export interface ProductItem {
  productId: string;
  quantity: number;
}

export interface PricedProductItem extends ProductItem {
  unitPrice: number;
};

export interface ShoppingCart {
  id: string;
  canceledAt?: Date;
  clientId: string;
  confirmedAt?: Date;
  openedAt: Date;
  products: PricedProductItem[];
  status: ShoppingCartStatus;
}

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
