import { v4 as uuid } from 'uuid';
import {
  CLIENT_ID,
  GREEN_BALLS,
  RED_BALLS,
  SHOPPING_CART_ID,
  YELLOW_BALL,
} from './constants';
import {
  ProductAddedToCart,
  ProductRemovedFromCart,
  ShoppingCartCanceled,
  ShoppingCartConfirmed,
  ShoppingCartOpened,
} from './types';

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
    productItem: RED_BALLS,
    shoppingCartId: SHOPPING_CART_ID,
  },
};

export const greenBallsAdded: ProductAddedToCart = {
  id: uuid(),
  type: 'product-added-to-shopping-cart',
  data: {
    productItem: GREEN_BALLS,
    shoppingCartId: SHOPPING_CART_ID,
  },
};

export const yellowBallAdded: ProductAddedToCart = {
  id: uuid(),
  type: 'product-added-to-shopping-cart',
  data: {
    productItem: YELLOW_BALL,
    shoppingCartId: SHOPPING_CART_ID,
  },
};

export const greenBallsRemoved: ProductRemovedFromCart = {
  id: uuid(),
  type: 'product-removed-from-shopping-cart',
  data: {
    productItem: GREEN_BALLS,
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
