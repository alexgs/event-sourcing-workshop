import { EventStoreDBClient } from '@eventstore/db-client';
import { v4 as uuid } from 'uuid';

import { appendToStream } from './append-to-stream';
import { SHOPPING_CART_ID } from './constants';
import { getShoppingCartStreamName } from './get-shopping-cart-stream-name';
import {
  cartConfirmed,
  cartOpened,
  greenBallsAdded,
  greenBallsRemoved,
  redBallsAdded,
  yellowBallAdded,
} from './events';
import { ShoppingCartEvent } from './types';

describe('Function `appendToStream`', () => {
  let eventStore: EventStoreDBClient = null;

  beforeAll(async () => {
    eventStore = EventStoreDBClient.connectionString(
      'esdb://localhost:2113?tls=false',
    );
  });

  afterAll(async () => {
    await eventStore.dispose();
  });

  it('appends events to EventStoreDB', async () => {
    const streamName = getShoppingCartStreamName(SHOPPING_CART_ID);
    const events: ShoppingCartEvent[] = [
      cartOpened,
      redBallsAdded,
      greenBallsAdded,
      yellowBallAdded,
      greenBallsRemoved,
      cartConfirmed,
    ];
    const appendedEventsCount = await appendToStream(
      eventStore,
      streamName,
      events,
      null,
    );

    expect(appendedEventsCount).toEqual(events.length);
  });

  it('throws an error if the expected revision is wrong', () => {
    const events: ShoppingCartEvent[] = [
      cartOpened,
      redBallsAdded,
      greenBallsAdded,
      yellowBallAdded,
      greenBallsRemoved,
      cartConfirmed,
    ];
    const shoppingCartId = uuid();
    const streamName = getShoppingCartStreamName(shoppingCartId);

    expect(
      async () => await appendToStream(eventStore, streamName, events, 10)
    ).rejects.toThrowError();
  });
});
