import { EventStoreDBClient } from '@eventstore/db-client';

import { SHOPPING_CART_ID } from './constants';
import {
  cartConfirmed,
  cartOpened,
  greenBallsAdded,
  greenBallsRemoved,
  redBallsAdded,
  yellowBallAdded,
} from './events';
import { ShoppingCartEvent } from './types';
import {appendToStream} from "./append-to-stream";

describe('Function `appendToStream`', () => {
  let eventStore: EventStoreDBClient = null;

  beforeAll(async () => {
    eventStore = EventStoreDBClient.connectionString('esdb://localhost:2113?tls=false');
  });

  it('appends events to EventStoreDB', async () => {
    const streamName = `shopping-cart-${SHOPPING_CART_ID}`;
    const events: ShoppingCartEvent[] = [
      cartOpened,
      redBallsAdded,
      greenBallsAdded,
      yellowBallAdded,
      greenBallsRemoved,
      cartConfirmed,
    ];
    const appendedEventsCount = await appendToStream(eventStore, streamName, events);

    expect(appendedEventsCount).toBe(BigInt(events.length));
  });
});
