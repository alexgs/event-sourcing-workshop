import { v4 as uuid } from 'uuid';
import { CLIENT_ID, SHOPPING_CART_ID } from './constants';
import {
  PricedProductItem,
  ProductAddedToCart,
  ProductRemovedFromCart,
  ShoppingCartCanceled,
  ShoppingCartConfirmed,
  ShoppingCartOpened,
} from './types';

export const redBalls: PricedProductItem = {
  productId: '0691270e-2cff-44ba-b511-d7da55cd175b',
  quantity: 3,
  unitPrice: 2.99,
};

export const greenBalls: PricedProductItem = {
  productId: '95830807-2dee-4ff3-b9e4-a39558123f7b',
  quantity: 6,
  unitPrice: 5.95,
};

export const yellowBall: PricedProductItem = {
  productId: 'fa7bd632-45ca-4e62-8351-cf0a7364e457',
  quantity: 1,
  unitPrice: 12.99,
};

export const cartOpened: ShoppingCartOpened = {
  id: uuid(),
  type: 'shopping-cart-opened',
  data: {
    clientId: CLIENT_ID,
    openedAt: new Date('2023-08-06'),
    shoppingCartId: SHOPPING_CART_ID,
  },
};

export const redBallsAdded: ProductAddedToCart = {
  id: uuid(),
  type: 'product-added-to-shopping-cart',
  data: {
    productItem: redBalls,
    shoppingCartId: SHOPPING_CART_ID,
  },
};

export const greenBallsAdded: ProductAddedToCart = {
  id: uuid(),
  type: 'product-added-to-shopping-cart',
  data: {
    productItem: greenBalls,
    shoppingCartId: SHOPPING_CART_ID,
  },
};

export const yellowBallAdded: ProductAddedToCart = {
  id: uuid(),
  type: 'product-added-to-shopping-cart',
  data: {
    productItem: yellowBall,
    shoppingCartId: SHOPPING_CART_ID,
  },
};

export const greenBallsRemoved: ProductRemovedFromCart = {
  id: uuid(),
  type: 'product-removed-from-shopping-cart',
  data: {
    productItem: greenBalls,
    shoppingCartId: SHOPPING_CART_ID,
  },
};

export const cartConfirmed: ShoppingCartConfirmed = {
  id: uuid(),
  type: 'shopping-cart-confirmed',
  data: {
    confirmedAt: new Date('2023-08-07'),
    shoppingCartId: SHOPPING_CART_ID,
  },
};

export const cartCanceled: ShoppingCartCanceled = {
  id: uuid(),
  type: 'shopping-cart-canceled',
  data: {
    canceledAt: new Date('2023-08-08'),
    shoppingCartId: SHOPPING_CART_ID,
  },
};
