import { EventStoreDBClient } from '@eventstore/db-client';
import { appendToStream } from './append-to-stream';
import { getShoppingCart } from './get-shopping-cart';
import { getShoppingCartStreamName } from './get-shopping-cart-stream-name';
import { processCommand } from './process-command';
import { ShoppingCart, ShoppingCartCommand } from './types';

/**
 * This is a module that wraps the `processorCommand` function and database interactions.
 */
export async function commandProcessor(
  eventStore: EventStoreDBClient,
  command: ShoppingCartCommand,
) {
  const streamName = getShoppingCartStreamName(command.data.shoppingCartId);
  const cart: ShoppingCart | null = await getShoppingCart(
    eventStore,
    streamName,
  );
  const event = processCommand(cart, command);
  return appendToStream(eventStore, streamName, [event]);
}
