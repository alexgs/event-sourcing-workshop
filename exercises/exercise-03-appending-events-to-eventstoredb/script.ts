import { EventStoreDBClient } from '@eventstore/db-client';
import { appendToStream } from './append-to-stream';
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

async function main() {
  const eventStore = EventStoreDBClient.connectionString(
    'esdb://localhost:2113?tls=false',
  );
  const streamName = `shopping-cart-${SHOPPING_CART_ID}`;
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
  );
  console.log(`Added ${appendedEventsCount} events to the event store.`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
  });
