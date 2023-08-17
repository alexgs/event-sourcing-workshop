import { PricedProductItem } from './types';

interface ShoppingCartDetail {
  id: string;
  items: PricedProductItem[];
  itemCount: number;
  total: number;
}

describe('There is a Projection that', () => {
  it('stores a detailed view of the shopping cart', () => {
    const actualProjection: ShoppingCartDetail = null; // TODO
    const expectedProjection: ShoppingCartDetail = {
      id: shoppingCartId,
      items: [], // TODO
      itemCount: 0, // TODO
      total: 0, // TODO
    };
    expect(actualProjection).toEqual(expectedProjection);
  });

  it.todo('stores a summary of pending shopping carts');
});
