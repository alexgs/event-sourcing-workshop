type ShoppingCartStatus = 'new' | 'open' | 'confirmed' | 'canceled';

interface ShoppingCart {
  id: string;
  products: [
    {
      id: string;
      quantity: number;
    },
  ];
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
    shoppingCartId: string;
  };
}

const cartOpened: ShoppingCartOpened = {
  id: 'abc123',
  type: 'shopping-cart-opened',
  data: {
    shoppingCartId: 'cart-7',
  },
};

interface ProductAddedToCart extends GenericEvent {
  type: 'product-added-to-shopping-cart';
  data: {
    productId: string;
    productQuantity: number;
    shoppingCartId: string;
  };
}

const productAdded: ProductAddedToCart = {
  id: 'abc124',
  type: 'product-added-to-shopping-cart',
  data: {
    productId: 'product-1',
    productQuantity: 1,
    shoppingCartId: 'cart-7',
  },
};

interface ProductRemovedFromCart extends GenericEvent {
  type: 'product-removed-from-shopping-cart';
  data: {
    productId: string;
    productQuantity: number;
    shoppingCartId: string;
  };
}

const productRemoved: ProductRemovedFromCart = {
  id: 'abc125',
  type: 'product-removed-from-shopping-cart',
  data: {
    productId: 'product-1',
    productQuantity: 1,
    shoppingCartId: 'cart-7',
  },
};

interface ShoppingCartConfirmed extends GenericEvent {
  type: 'shopping-cart-confirmed';
  data: {
    shoppingCartId: string;
  };
}

const cartConfirmed: ShoppingCartConfirmed = {
  id: 'abc126',
  type: 'shopping-cart-confirmed',
  data: {
    shoppingCartId: 'cart-7',
  },
};

interface ShoppingCartCanceled extends GenericEvent {
  type: 'shopping-cart-canceled';
  data: {
    shoppingCartId: string;
  };
}

const cartCanceled: ShoppingCartCanceled = {
  id: 'abc127',
  type: 'shopping-cart-canceled',
  data: {
    shoppingCartId: 'cart-7',
  },
};
