import { v4 as uuid } from 'uuid';
import { detailViewHandler } from './detail-view-handler';
import {
  ShoppingCartDetails,
  ShoppingCartStatus,
} from './projections.exercise.test';
import { Database, getDatabase } from './tools/database';

describe('Function `detailViewHandler`', () => {
  let database: Database;

  beforeAll(() => {
    database = getDatabase();
  });

  it('correctly handles opening a shopping cart', () => {
    const clientId = uuid();
    const db = database.collection<ShoppingCartDetails>('shoppingCarts');
    const shoppingCartId = uuid();
    const openTimestamp = new Date().toISOString();

    const event = {
      type: 'ShoppingCartOpened',
      data: {
        clientId,
        shoppingCartId,
        openedAt: openTimestamp,
      },
      metadata: {
        eventId: uuid(),
        streamPosition: 0,
        logPosition: 0,
      }
    };
    detailViewHandler(db)(event);
    const output = db.get(shoppingCartId);

    const expectedDetails: ShoppingCartDetails = {
      id: shoppingCartId,
      productItems: [],
      status: ShoppingCartStatus.Pending,
      clientId: clientId,
      openedAt: openTimestamp,
      totalAmount: 0,
      totalItemsCount: 0,
    };
    expect(output).toEqual(expectedDetails);
  });

  it.todo('correctly handles adding an item to a shopping cart');
});
