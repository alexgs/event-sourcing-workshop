import { ANY, EventStoreDBClient, jsonEvent } from '@eventstore/db-client';
import { ShoppingCartEvent } from './types';

export async function appendToStream(
  eventStore: EventStoreDBClient,
  streamName: string,
  events: ShoppingCartEvent[],
  expectedRevision: bigint
): Promise<number> {
  const serializedEvents = events.map(jsonEvent);

  await eventStore.appendToStream(streamName, serializedEvents, {
    expectedRevision,
  });

  return events.length;
}
