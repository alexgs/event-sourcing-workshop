import { EventStoreDBClient } from '@eventstore/db-client';
import { addSeconds } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { GREEN_BALLS, RED_BALLS, SHOPPING_CART_ID } from './constants';
import { commandProcessor } from './command-processor';
import { getShoppingCart } from './get-shopping-cart';
import { getShoppingCartStreamName } from './get-shopping-cart-stream-name';
import {
  AddProductToCart,
  ConfirmShoppingCart,
  OpenShoppingCart,
  RemoveProductFromCart,
  ShoppingCart,
} from './types';

describe('Function `commandProcessor`', () => {
  let eventStore: EventStoreDBClient = null;

  beforeAll(async () => {
    eventStore = EventStoreDBClient.connectionString(
      'esdb://localhost:2113?tls=false',
    );
  });

  afterAll(async () => {
    await eventStore.dispose();
  });

  it('handles a single open command', async () => {
    const now = new Date();
    const command: OpenShoppingCart = {
      type: 'command.open-shopping-cart',
      data: {
        shoppingCartId: SHOPPING_CART_ID,
        clientId: uuid(),
        timestamp: now,
      },
    };

    const result = await commandProcessor(eventStore, command);
    expect(result).toEqual(1);
  });

  it('handles a (happy path) series of commands', async () => {
    const now = new Date();
    const command1: OpenShoppingCart = {
      type: 'command.open-shopping-cart',
      data: {
        shoppingCartId: SHOPPING_CART_ID,
        clientId: uuid(),
        timestamp: now,
      },
    };
    const command2: AddProductToCart = {
      type: 'command.add-product-to-shopping-cart',
      data: {
        shoppingCartId: SHOPPING_CART_ID,
        productItem: RED_BALLS,
      },
    };
    const command3: AddProductToCart = {
      type: 'command.add-product-to-shopping-cart',
      data: {
        shoppingCartId: SHOPPING_CART_ID,
        productItem: GREEN_BALLS,
      },
    };
    const command4: ConfirmShoppingCart = {
      type: 'command.confirm-shopping-cart',
      data: {
        shoppingCartId: SHOPPING_CART_ID,
        timestamp: addSeconds(now, 13),
      },
    };

    const result1 = await commandProcessor(eventStore, command1);
    const result2 = await commandProcessor(eventStore, command2);
    const result3 = await commandProcessor(eventStore, command3);
    const result4 = await commandProcessor(eventStore, command4);

    const actualCart = await getShoppingCart(
      eventStore,
      getShoppingCartStreamName(SHOPPING_CART_ID),
    );
    const expectedCart: ShoppingCart = {
      id: SHOPPING_CART_ID,
      status: 'confirmed',
      products: [RED_BALLS, GREEN_BALLS],
      clientId: command1.data.clientId,
      openedAt: now,
      confirmedAt: addSeconds(now, 13),
    };
    expect(actualCart).toEqual(expectedCart);
  });

  describe('correctly handles violations of business logic rules:', () => {
    it('The customer may add a product to the shopping cart only after opening it.', async () => {
      const command: AddProductToCart = {
        type: 'command.add-product-to-shopping-cart',
        data: {
          shoppingCartId: SHOPPING_CART_ID,
          productItem: GREEN_BALLS,
        },
      };
      await expect(
        async () => await commandProcessor(eventStore, command),
      ).rejects.toThrowError();
    });

    it('The customer may remove a product with a given price from the cart.', async () => {
      const now = new Date();
      const command1: OpenShoppingCart = {
        type: 'command.open-shopping-cart',
        data: {
          shoppingCartId: SHOPPING_CART_ID,
          clientId: uuid(),
          timestamp: now,
        },
      };
      const command2: AddProductToCart = {
        type: 'command.add-product-to-shopping-cart',
        data: {
          shoppingCartId: SHOPPING_CART_ID,
          productItem: RED_BALLS,
        },
      };
      const command3: RemoveProductFromCart = {
        type: 'command.remove-product-from-cart',
        data: {
          shoppingCartId: SHOPPING_CART_ID,
          productItem: GREEN_BALLS,
        },
      };

      const result1 = await commandProcessor(eventStore, command1);
      const result2 = await commandProcessor(eventStore, command2);

      await expect(
        async () => await commandProcessor(eventStore, command3),
      ).rejects.toThrowError();
    });
  });
});
