import { EventStoreDBClient } from '@eventstore/db-client';
import { appendToStream } from './append-to-stream';
import { CLIENT_ID, SHOPPING_CART_ID } from './constants';
import {
  cartConfirmed,
  cartOpened,
  greenBallsAdded,
  greenBallsRemoved,
  redBalls,
  redBallsAdded,
  yellowBall,
  yellowBallAdded,
} from './events';
import { getShoppingCart } from './get-shopping-cart';
import { getShoppingCartStreamName } from './get-shopping-cart-stream-name';
import { ShoppingCart, ShoppingCartEvent } from './types';

describe('Function `getShoppingCart`', () => {
  let eventStore: EventStoreDBClient = null;

  beforeAll(async () => {
    eventStore = EventStoreDBClient.connectionString(
      'esdb://localhost:2113?tls=false',
    );
  });

  afterAll(async () => {
    await eventStore.dispose();
  });

  it('correctly retrieves the state of the shopping cart', async () => {
    const streamName = getShoppingCartStreamName(SHOPPING_CART_ID);
    const events: ShoppingCartEvent[] = [
      cartOpened,
      redBallsAdded,
      greenBallsAdded,
      yellowBallAdded,
      greenBallsRemoved,
      cartConfirmed,
    ];
    await appendToStream(eventStore, streamName, events);

    const output = await getShoppingCart(eventStore, streamName);
    const expectedOutput: ShoppingCart = {
      id: SHOPPING_CART_ID,
      clientId: CLIENT_ID,
      confirmedAt: new Date('2023-08-07'),
      openedAt: new Date('2023-08-06'),
      products: [redBalls, yellowBall],
      status: 'confirmed',
    };
    expect(output).toEqual(expectedOutput);
  });
});
