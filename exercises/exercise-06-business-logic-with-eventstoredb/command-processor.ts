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
  const cart: ShoppingCart = await getShoppingCart(eventStore, streamName);
  try {
    const event = processCommand(cart, command);
    const result = await appendToStream(eventStore, streamName, [event]);
    return result;
  } catch (e) {
    console.log(`Error processing command: ${e.message}`);
  }
}
