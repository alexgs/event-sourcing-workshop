import {
  ProductAddedToCart,
  ProductRemovedFromCart,
  ShoppingCartCanceled,
  ShoppingCartConfirmed,
  ShoppingCartOpened,
} from './types';

const cartOpened: ShoppingCartOpened = {
  id: 'abc123',
  type: 'shopping-cart-opened',
  data: {
    clientId: 'client-19',
    openedAt: new Date(),
    shoppingCartId: 'cart-7',
  },
};

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

const cartConfirmed: ShoppingCartConfirmed = {
  id: 'abc126',
  type: 'shopping-cart-confirmed',
  data: {
    confirmedAt: new Date(),
    shoppingCartId: 'cart-7',
  },
};

const cartCanceled: ShoppingCartCanceled = {
  id: 'abc127',
  type: 'shopping-cart-canceled',
  data: {
    canceledAt: new Date(),
    shoppingCartId: 'cart-7',
  },
};
