import { expect } from 'chai';
import { getShoppingCart } from './index';
import { BaseEvent, PricedProduct } from './types';

describe('Function `getShoppingCart`', () => {
  function getValues() {
    const events: BaseEvent[] = [];
    const items: PricedProduct[] = [];
    return {
      events,
      items,
      cartId: '6f79884e-c74b-4032-b7e9-42f3bd93ad28',
      userId: '0f89fe17-658c-43f8-8712-cf52d540228e',
    };
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
