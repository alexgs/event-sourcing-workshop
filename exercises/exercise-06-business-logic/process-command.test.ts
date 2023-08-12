import { CLIENT_ID, RED_BALLS, SHOPPING_CART_ID } from './constants';
import { processCommand } from './process-command';
import { ProductAddedToCart, ShoppingCart } from './types';

describe('Function `processCommand`', () => {
  it('returns the correct event for command `AddProductToCart`', () => {
    const now = new Date();
    const cart: ShoppingCart = {
      id: SHOPPING_CART_ID,
      clientId: CLIENT_ID,
      openedAt: now,
      products: [],
      status: 'open',
    };

    const output = processCommand(cart, {
      type: 'command.add-product-to-shopping-cart',
      data: {
        productItem: RED_BALLS,
        shoppingCartId: SHOPPING_CART_ID,
      },
    });

    const expectedEvent: Partial<ProductAddedToCart> = {
      type: 'product-added-to-shopping-cart',
      data: {
        productItem: RED_BALLS,
        shoppingCartId: SHOPPING_CART_ID,
      },
    };
    expect(output).toMatchObject(expectedEvent);
  });
});
