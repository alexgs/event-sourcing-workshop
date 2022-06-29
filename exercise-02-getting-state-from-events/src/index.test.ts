import { expect } from 'chai';
import { getShoppingCart } from './index';
import {
  PRODUCT_ADDED_TO_CART,
  PRODUCT_REMOVED_FROM_CART,
  SHOPPING_CART_CREATED,
  SHOPPING_CART_STATUS,
  BaseEvent,
  PricedProduct,
  ProductAddedToCart,
  ProductRemovedFromCart,
  ShoppingCartCreatedEvent,
} from './types';

describe('Function `getShoppingCart`', () => {
  function getValues() {
    const cartId = '6f79884e-c74b-4032-b7e9-42f3bd93ad28';
    const userId = '0f89fe17-658c-43f8-8712-cf52d540228e';

    const newBenSherman: PricedProduct = {
      id: '438067bb-5dd8-44e1-9096-387775dbf39b',
      quantity: 2,
      unitPrice: 12995,
    };
    const sweetKicks: PricedProduct = {
      id: '132ef3bd-a27f-47a3-8af9-9ef77e40ee13',
      quantity: 1,
      unitPrice: 22727,
    };
    const tightJeans: PricedProduct = {
      id: 'da01a0b7-6a0d-4443-9b55-6cd61569a449',
      quantity: 1,
      unitPrice: 8489,
    };

    const event1: ShoppingCartCreatedEvent = {
      type: SHOPPING_CART_CREATED,
      data: {
        userId,
        shoppingCartId: cartId,
        status: SHOPPING_CART_STATUS.PENDING,
      },
    };
    const event2: ProductAddedToCart = {
      type: PRODUCT_ADDED_TO_CART,
      data: {
        product: sweetKicks,
        shoppingCartId: cartId,
      },
    };
    const event3: ProductAddedToCart = {
      type: PRODUCT_ADDED_TO_CART,
      data: {
        product: tightJeans,
        shoppingCartId: cartId,
      },
    };
    const event4: ProductAddedToCart = {
      type: PRODUCT_ADDED_TO_CART,
      data: {
        product: newBenSherman,
        shoppingCartId: cartId,
      },
    };
    const event5: ProductRemovedFromCart = {
      type: PRODUCT_REMOVED_FROM_CART,
      data: {
        product: tightJeans,
        shoppingCartId: cartId,
      },
    };

    const events: BaseEvent[] = [event1, event2, event3, event4, event5];
    const items: PricedProduct[] = [sweetKicks, newBenSherman];

    return { cartId, events, items, userId };
  }

  it('returns the correct shopping cart ID', () => {
    const { cartId, events } = getValues();
    const cart = getShoppingCart(events);
    expect(cart.id).to.equal(cartId);
  });

  it('returns the correct user ID', () => {
    const { events, userId } = getValues();
    const cart = getShoppingCart(events);
    expect(cart.userId).to.equal(userId);
  });

  it('returns the correct number of items', () => {
    const { events, items } = getValues();
    const cart = getShoppingCart(events);
    expect(cart.items.length).to.equal(items.length);
  });

  it('returns the correct list of items', () => {
    const { events, items } = getValues();
    const cart = getShoppingCart(events);
    expect(cart.items).to.deep.equal(items);
  });
});
