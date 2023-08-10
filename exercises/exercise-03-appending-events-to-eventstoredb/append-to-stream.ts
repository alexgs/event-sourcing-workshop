import { ANY, EventStoreDBClient, jsonEvent } from '@eventstore/db-client';
import { ShoppingCartEvent } from './types';

export async function appendToStream(
  eventStore: EventStoreDBClient,
  streamName: string,
  events: ShoppingCartEvent[],
): Promise<bigint> {
  let successCount = 0;
  const serializedEvents = events.map(jsonEvent);

  // console.log(serializedEvents);
  // for (const event of events) {
  //   await eventStore.appendToStream(streamName, {
  //     ...event,
  //     contentType: 'application/json',
  //     metadata: {},
  //   });
  //   successCount = successCount + 1;
  // }

  await eventStore.appendToStream(streamName, serializedEvents, {
    expectedRevision: ANY,
  });

  return BigInt(successCount);
}
