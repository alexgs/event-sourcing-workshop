import { NO_STREAM, EventStoreDBClient, jsonEvent } from '@eventstore/db-client';
import { ShoppingCartEvent } from './types';

export async function appendToStream(
  eventStore: EventStoreDBClient,
  streamName: string,
  events: ShoppingCartEvent[],
  expectedRevision: number | null
): Promise<number> {
  const serializedEvents = events.map(jsonEvent);
  const revision = expectedRevision ? BigInt(expectedRevision) : NO_STREAM;

  await eventStore.appendToStream(streamName, serializedEvents, {
    expectedRevision: revision,
  });

  return events.length;
}
