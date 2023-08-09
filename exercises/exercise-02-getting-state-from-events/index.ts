type ShoppingCartStatus = 'new' | 'open' | 'confirmed' | 'canceled';

export interface ProductItem {
  productId: string;
  quantity: number;
}

export type PricedProductItem = ProductItem & {
  unitPrice: number;
};

interface ShoppingCart {
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

interface ShoppingCartOpened extends GenericEvent {
  type: 'shopping-cart-opened';
  data: {
    clientId: string;
    openedAt: Date;
    shoppingCartId: string;
  };
}

const cartOpened: ShoppingCartOpened = {
  id: 'abc123',
  type: 'shopping-cart-opened',
  data: {
    clientId: 'client-19',
    openedAt: new Date(),
    shoppingCartId: 'cart-7',
  },
};

interface ProductAddedToCart extends GenericEvent {
  type: 'product-added-to-shopping-cart';
  data: {
    productItem: PricedProductItem;
    shoppingCartId: string;
  };
}

const productAdded: ProductAddedToCart = {
  id: 'abc124',
  type: 'product-added-to-shopping-cart',
  data: {
    productItem: {
      productId: 'product-1',
      unitPrice: 19,
      quantity: 2,
    },
    shoppingCartId: 'cart-7',
  },
};

interface ProductRemovedFromCart extends GenericEvent {
  type: 'product-removed-from-shopping-cart';
  data: {
    productItem: PricedProductItem;
    shoppingCartId: string;
  };
}

const productRemoved: ProductRemovedFromCart = {
  id: 'abc125',
  type: 'product-removed-from-shopping-cart',
  data: {
    productItem: {
      productId: 'product-1',
      unitPrice: 19,
      quantity: 2,
    },
    shoppingCartId: 'cart-7',
  },
};

interface ShoppingCartConfirmed extends GenericEvent {
  type: 'shopping-cart-confirmed';
  data: {
    confirmedAt: Date;
    shoppingCartId: string;
  };
}

const cartConfirmed: ShoppingCartConfirmed = {
  id: 'abc126',
  type: 'shopping-cart-confirmed',
  data: {
    confirmedAt: new Date(),
    shoppingCartId: 'cart-7',
  },
};

interface ShoppingCartCanceled extends GenericEvent {
  type: 'shopping-cart-canceled';
  data: {
    canceledAt: Date;
    shoppingCartId: string;
  };
}

const cartCanceled: ShoppingCartCanceled = {
  id: 'abc127',
  type: 'shopping-cart-canceled',
  data: {
    canceledAt: new Date(),
    shoppingCartId: 'cart-7',
  },
};

export type ShoppingCartEvent =
  | ShoppingCartOpened
  | ProductAddedToCart
  | ProductRemovedFromCart
  | ShoppingCartCanceled
  | ShoppingCartConfirmed;
