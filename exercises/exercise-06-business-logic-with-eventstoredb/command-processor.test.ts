import { EventStoreDBClient } from '@eventstore/db-client';
import { v4 as uuid } from 'uuid';
import { SHOPPING_CART_ID } from './constants';
import { OpenShoppingCart } from './types';
import {commandProcessor} from "./command-processor";

describe('Function `commandProcessor`', () => {
  let eventStore: EventStoreDBClient = null;

  beforeAll(async () => {
    eventStore = EventStoreDBClient.connectionString(
      'esdb://localhost:2113?tls=false',
    );
  });

  afterAll(async () => {
    await eventStore.dispose();
  });

  it('handles a single open command', async () => {
    const now = new Date();
    const command: OpenShoppingCart = {
      type: 'command.open-shopping-cart',
      data: {
        shoppingCartId: SHOPPING_CART_ID,
        clientId: uuid(),
        timestamp: now,
      },
    };

    const result = await commandProcessor(eventStore, command);
    expect(result).toEqual(1);
  });

  it.todo('handles a (happy path) series of commands');
  it.todo('correctly handles violations of business logic rules');
});
