import { EventStoreDBClient } from '@eventstore/db-client';
import {ShoppingCartEvent} from "./types";

export async function appendToStream(
  eventStore: EventStoreDBClient,
  streamName: string,
  events: ShoppingCartEvent[]
): Promise<bigint> {
  // TODO: Fill append events logic here.
  return Promise.reject('Not implemented!');
}
