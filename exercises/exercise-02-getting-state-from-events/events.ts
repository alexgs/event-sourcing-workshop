import {
  PricedProductItem,
  ProductAddedToCart,
  ProductItem,
  ProductRemovedFromCart,
  ShoppingCartCanceled,
  ShoppingCartConfirmed,
  ShoppingCartOpened,
} from './types';

export const redBalls: PricedProductItem = {
  productId: 'product-7',
  quantity: 3,
  unitPrice: 2.99,
};

export const greenBalls: PricedProductItem = {
  productId: 'product-1',
  quantity: 6,
  unitPrice: 5.95,
};

export const yellowBall: PricedProductItem = {
  productId: 'product-5',
  quantity: 1,
  unitPrice: 12.99,
};

export const cartOpened: ShoppingCartOpened = {
  id: 'abc123',
  type: 'shopping-cart-opened',
  data: {
    clientId: 'client-19',
    openedAt: new Date('2023-08-06'),
    shoppingCartId: 'cart-7',
  },
};

export const redBallsAdded: ProductAddedToCart = {
  id: 'abc124',
  type: 'product-added-to-shopping-cart',
  data: {
    productItem: redBalls,
    shoppingCartId: 'cart-7',
  },
};

export const greenBallsAdded: ProductAddedToCart = {
  id: 'abc128',
  type: 'product-added-to-shopping-cart',
  data: {
    productItem: greenBalls,
    shoppingCartId: 'cart-7',
  },
};

export const yellowBallAdded: ProductAddedToCart = {
  id: 'abc129',
  type: 'product-added-to-shopping-cart',
  data: {
    productItem: yellowBall,
    shoppingCartId: 'cart-7',
  },
};

export const greenBallsRemoved: ProductRemovedFromCart = {
  id: 'abc125',
  type: 'product-removed-from-shopping-cart',
  data: {
    productItem: greenBalls,
    shoppingCartId: 'cart-7',
  },
};

export const cartConfirmed: ShoppingCartConfirmed = {
  id: 'abc126',
  type: 'shopping-cart-confirmed',
  data: {
    confirmedAt: new Date('2023-08-07'),
    shoppingCartId: 'cart-7',
  },
};

export const cartCanceled: ShoppingCartCanceled = {
  id: 'abc127',
  type: 'shopping-cart-canceled',
  data: {
    canceledAt: new Date('2023-08-08'),
    shoppingCartId: 'cart-7',
  },
};
