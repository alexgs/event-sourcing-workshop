import {
  CLIENT_ID,
  GREEN_BALLS,
  RED_BALLS,
  SHOPPING_CART_ID,
  YELLOW_BALL,
} from './constants';
import { processCommand } from './process-command';
import {
  ProductAddedToCart,
  ProductRemovedFromCart,
  ShoppingCart,
  ShoppingCartCanceled,
  ShoppingCartConfirmed,
  ShoppingCartOpened,
} from './types';

describe('Function `processCommand`', () => {
  it('returns the correct event for command `AddProductToCart`', () => {
    const now = new Date();
    const cart: ShoppingCart = {
      id: SHOPPING_CART_ID,
      clientId: CLIENT_ID,
      expectedRevision: 0,
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

  it('returns the correct event for command `CancelShoppingCart`', () => {
    const openTime = new Date('2023-08-06');
    const cancelTime = new Date('2023-08-08');

    const expectedEvent: Partial<ShoppingCartCanceled> = {
      type: 'shopping-cart-canceled',
      data: {
        canceledAt: cancelTime,
        shoppingCartId: SHOPPING_CART_ID,
      },
    };
    const cart: ShoppingCart = {
      id: SHOPPING_CART_ID,
      clientId: CLIENT_ID,
      expectedRevision: 0,
      openedAt: openTime,
      products: [],
      status: 'open',
    };

    const output = processCommand(cart, {
      type: 'command.cancel-shopping-cart',
      data: {
        timestamp: cancelTime,
        shoppingCartId: SHOPPING_CART_ID,
      },
    });
    expect(output).toMatchObject(expectedEvent);
  });

  it('returns the correct event for command `ConfirmShoppingCart`', () => {
    const openTime = new Date('2023-08-06');
    const confirmationTime = new Date('2023-08-08');

    const expectedEvent: Partial<ShoppingCartConfirmed> = {
      type: 'shopping-cart-confirmed',
      data: {
        confirmedAt: confirmationTime,
        shoppingCartId: SHOPPING_CART_ID,
      },
    };
    const cart: ShoppingCart = {
      id: SHOPPING_CART_ID,
      clientId: CLIENT_ID,
      expectedRevision: 2,
      openedAt: openTime,
      products: [YELLOW_BALL, RED_BALLS],
      status: 'open',
    };

    const output = processCommand(cart, {
      type: 'command.confirm-shopping-cart',
      data: {
        timestamp: confirmationTime,
        shoppingCartId: SHOPPING_CART_ID,
      },
    });
    expect(output).toMatchObject(expectedEvent);
  });

  it('returns the correct event for command `OpenShoppingCart`', () => {
    const openTime = new Date('2023-08-06');

    const expectedEvent: Partial<ShoppingCartOpened> = {
      type: 'shopping-cart-opened',
      data: {
        clientId: CLIENT_ID,
        openedAt: openTime,
        shoppingCartId: SHOPPING_CART_ID,
      },
    };
    const cart: ShoppingCart = {
      id: SHOPPING_CART_ID,
      clientId: CLIENT_ID,
      expectedRevision: 0,
      openedAt: openTime,
      products: [],
      status: 'open',
    };

    const output = processCommand(cart, {
      type: 'command.open-shopping-cart',
      data: {
        clientId: CLIENT_ID,
        shoppingCartId: SHOPPING_CART_ID,
        timestamp: openTime,
      },
    });
    expect(output).toMatchObject(expectedEvent);
  });

  it('returns the correct event for command `RemoveProductFromCart`', () => {
    const openTime = new Date('2023-08-06');

    const expectedEvent: Partial<ProductRemovedFromCart> = {
      type: 'product-removed-from-shopping-cart',
      data: {
        productItem: RED_BALLS,
        shoppingCartId: SHOPPING_CART_ID,
      },
    };
    const cart: ShoppingCart = {
      id: SHOPPING_CART_ID,
      clientId: CLIENT_ID,
      expectedRevision: 2,
      openedAt: openTime,
      products: [RED_BALLS, YELLOW_BALL],
      status: 'open',
    };

    const output = processCommand(cart, {
      type: 'command.remove-product-from-cart',
      data: {
        productItem: RED_BALLS,
        shoppingCartId: SHOPPING_CART_ID,
      },
    });
    expect(output).toMatchObject(expectedEvent);
  });

  it('calculates the price from the price list', () => {
    const now = new Date();
    const cart: ShoppingCart = {
      id: SHOPPING_CART_ID,
      clientId: CLIENT_ID,
      expectedRevision: 0,
      openedAt: now,
      products: [],
      status: 'open',
    };

    const output = processCommand(cart, {
      type: 'command.add-product-to-shopping-cart',
      data: {
        productItem: {
          productId: RED_BALLS.productId,
          quantity: RED_BALLS.quantity,
        },
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

  it("throws an error when adding a product to a cart that isn't opened", () => {
    const now = new Date();
    const cart: ShoppingCart = {
      id: SHOPPING_CART_ID,
      clientId: CLIENT_ID,
      expectedRevision: 0,
      openedAt: now,
      products: [],
      status: 'confirmed',
    };

    expect(() =>
      processCommand(cart, {
        type: 'command.add-product-to-shopping-cart',
        data: {
          productItem: RED_BALLS,
          shoppingCartId: SHOPPING_CART_ID,
        },
      }),
    ).toThrowError();
  });

  it("throws an error when canceling a cart that isn't opened", () => {
    const openTime = new Date('2023-08-06');
    const cancelTime = new Date('2023-08-08');

    const cart: ShoppingCart = {
      id: SHOPPING_CART_ID,
      clientId: CLIENT_ID,
      expectedRevision: 0,
      openedAt: openTime,
      products: [],
      status: 'new',
    };

    expect(() =>
      processCommand(cart, {
        type: 'command.cancel-shopping-cart',
        data: {
          timestamp: cancelTime,
          shoppingCartId: SHOPPING_CART_ID,
        },
      }),
    ).toThrowError();
  });

  it("throws an error when confirming a cart that isn't opened", () => {
    const openTime = new Date('2023-08-06');
    const confirmationTime = new Date('2023-08-08');

    const cart: ShoppingCart = {
      id: SHOPPING_CART_ID,
      clientId: CLIENT_ID,
      expectedRevision: 0,
      openedAt: openTime,
      products: [YELLOW_BALL, RED_BALLS],
      status: 'canceled',
    };

    expect(() =>
      processCommand(cart, {
        type: 'command.confirm-shopping-cart',
        data: {
          timestamp: confirmationTime,
          shoppingCartId: SHOPPING_CART_ID,
        },
      }),
    ).toThrowError();
  });

  it('throws an error when confirming an empty cart', () => {
    const openTime = new Date('2023-08-06');
    const confirmationTime = new Date('2023-08-08');

    const cart: ShoppingCart = {
      id: SHOPPING_CART_ID,
      clientId: CLIENT_ID,
      expectedRevision: 0,
      openedAt: openTime,
      products: [],
      status: 'open',
    };

    expect(() =>
      processCommand(cart, {
        type: 'command.confirm-shopping-cart',
        data: {
          timestamp: confirmationTime,
          shoppingCartId: SHOPPING_CART_ID,
        },
      }),
    ).toThrowError();
  });

  it('throws an error when removing a product not in the cart', () => {
    const openTime = new Date('2023-08-06');

    const cart: ShoppingCart = {
      id: SHOPPING_CART_ID,
      clientId: CLIENT_ID,
      expectedRevision: 2,
      openedAt: openTime,
      products: [RED_BALLS, YELLOW_BALL],
      status: 'open',
    };

    expect(() =>
      processCommand(cart, {
        type: 'command.remove-product-from-cart',
        data: {
          productItem: GREEN_BALLS,
          shoppingCartId: SHOPPING_CART_ID,
        },
      }),
    ).toThrowError();
  });
});
