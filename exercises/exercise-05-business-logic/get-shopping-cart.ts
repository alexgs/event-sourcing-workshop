import { FORWARDS, START, EventStoreDBClient, ResolvedEvent } from '@eventstore/db-client';
import { shoppingCartReducer } from './shopping-cart-reducer';
import { ShoppingCart, ShoppingCartEvent } from './types';

export async function getShoppingCart(
  eventStore: EventStoreDBClient,
  streamName: string,
): Promise<ShoppingCart> {
  const rawEvents = eventStore.readStream<ShoppingCartEvent>(streamName, {
    direction: FORWARDS,
    fromRevision: START,
  });

  const events: ShoppingCartEvent[] = [];
  for await (const rawEvent of rawEvents) {
    events.push({
      id: rawEvent.event.id,
      data: rawEvent.event.data,
      type: rawEvent.event.type as ShoppingCartEvent['type'],
    } as ShoppingCartEvent);
  }
  const cart = shoppingCartReducer(events);

  cart.confirmedAt = new Date(cart.confirmedAt);
  cart.openedAt = new Date(cart.openedAt);
  return cart;
}
