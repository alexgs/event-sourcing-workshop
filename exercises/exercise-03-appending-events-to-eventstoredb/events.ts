import {CLIENT_ID, SHOPPING_CART_ID} from './constants';
import {
  PricedProductItem,
  ProductAddedToCart,
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
  id: '2ddeb581-be09-4db0-bb7b-db11b680d85e',
  type: 'shopping-cart-opened',
  data: {
    clientId: CLIENT_ID,
    openedAt: new Date('2023-08-06'),
    shoppingCartId: SHOPPING_CART_ID,
  },
};

export const redBallsAdded: ProductAddedToCart = {
  id: 'a1caa6b5-f4f5-4c95-b1c6-5adcddd54364',
  type: 'product-added-to-shopping-cart',
  data: {
    productItem: redBalls,
    shoppingCartId: SHOPPING_CART_ID,
  },
};

export const greenBallsAdded: ProductAddedToCart = {
  id: '79117e93-231a-4b40-815f-1b5b18c8f6b3',
  type: 'product-added-to-shopping-cart',
  data: {
    productItem: greenBalls,
    shoppingCartId: SHOPPING_CART_ID,
  },
};

export const yellowBallAdded: ProductAddedToCart = {
  id: 'e177e2b0-2f87-41d9-b494-42166230d194',
  type: 'product-added-to-shopping-cart',
  data: {
    productItem: yellowBall,
    shoppingCartId: SHOPPING_CART_ID,
  },
};

export const greenBallsRemoved: ProductRemovedFromCart = {
  id: '35031958-f524-4334-97a2-98756fa88889',
  type: 'product-removed-from-shopping-cart',
  data: {
    productItem: greenBalls,
    shoppingCartId: SHOPPING_CART_ID,
  },
};

export const cartConfirmed: ShoppingCartConfirmed = {
  id: '47b218c9-e57a-4a4e-84a4-1fe90f8f569c',
  type: 'shopping-cart-confirmed',
  data: {
    confirmedAt: new Date('2023-08-07'),
    shoppingCartId: SHOPPING_CART_ID,
  },
};

export const cartCanceled: ShoppingCartCanceled = {
  id: '72409d22-7680-4235-bfbc-57143f12c167',
  type: 'shopping-cart-canceled',
  data: {
    canceledAt: new Date('2023-08-08'),
    shoppingCartId: SHOPPING_CART_ID,
  },
};
