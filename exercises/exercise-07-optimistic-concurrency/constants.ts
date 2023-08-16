import { v4 as uuid } from 'uuid';
import { PricedProductItem } from './types';

export const CLIENT_ID = '536afddb-8cb5-44e5-9c55-0731530de707';

export const RED_BALLS: PricedProductItem = {
  productId: '0691270e-2cff-44ba-b511-d7da55cd175b',
  quantity: 3,
  unitPrice: 2.99,
};

export const GREEN_BALLS: PricedProductItem = {
  productId: '95830807-2dee-4ff3-b9e4-a39558123f7b',
  quantity: 6,
  unitPrice: 5.95,
};

export const YELLOW_BALL: PricedProductItem = {
  productId: 'fa7bd632-45ca-4e62-8351-cf0a7364e457',
  quantity: 1,
  unitPrice: 12.99,
};


export const SHOPPING_CART_ID = uuid();
