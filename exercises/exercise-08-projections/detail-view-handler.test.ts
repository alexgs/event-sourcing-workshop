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
      },
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

  describe('correctly handles adding an item to a shopping cart', () => {
    it('when the item is *not* already in the cart', () => {
      const clientId = uuid();
      const db = database.collection<ShoppingCartDetails>('shoppingCarts');
      const dressId = uuid();
      const openTimestamp = new Date().toISOString();
      const shoppingCartId = uuid();

      const emptyCart: ShoppingCartDetails = {
        id: shoppingCartId,
        productItems: [],
        status: ShoppingCartStatus.Pending,
        clientId: clientId,
        openedAt: openTimestamp,
        totalAmount: 0,
        totalItemsCount: 0,
      };
      db.store(shoppingCartId, emptyCart);

      const event = {
        type: 'ProductItemAddedToShoppingCart',
        data: {
          shoppingCartId,
          productItem: {
            productId: dressId,
            quantity: 3,
            unitPrice: 150,
          },
        },
        metadata: {
          eventId: uuid(),
          streamPosition: 1,
          logPosition: 1,
        },
      };
      detailViewHandler(db)(event);
      const output = db.get(shoppingCartId);

      const expectedDetails: ShoppingCartDetails = {
        id: shoppingCartId,
        productItems: [
          {
            productId: dressId,
            quantity: 3,
            unitPrice: 150,
          },
        ],
        status: ShoppingCartStatus.Pending,
        clientId: clientId,
        openedAt: openTimestamp,
        totalAmount: 450,
        totalItemsCount: 3,
      };
      expect(output).toEqual(expectedDetails);
    });

    it('when the item *is* already in the cart', () => {
      const clientId = uuid();
      const db = database.collection<ShoppingCartDetails>('shoppingCarts');
      const dressId = uuid();
      const openTimestamp = new Date().toISOString();
      const shoppingCartId = uuid();

      const pendingCart: ShoppingCartDetails = {
        id: shoppingCartId,
        productItems: [
          {
            productId: dressId,
            quantity: 3,
            unitPrice: 150,
          }
        ],
        status: ShoppingCartStatus.Pending,
        clientId: clientId,
        openedAt: openTimestamp,
        totalAmount: 450,
        totalItemsCount: 3,
      };
      db.store(shoppingCartId, pendingCart);

      const event = {
        type: 'ProductItemAddedToShoppingCart',
        data: {
          shoppingCartId,
          productItem: {
            productId: dressId,
            quantity: 3,
            unitPrice: 150,
          },
        },
        metadata: {
          eventId: uuid(),
          streamPosition: 2,
          logPosition: 2,
        },
      };
      detailViewHandler(db)(event);
      const output = db.get(shoppingCartId);

      const expectedDetails: ShoppingCartDetails = {
        id: shoppingCartId,
        productItems: [
          {
            productId: dressId,
            quantity: 6,
            unitPrice: 150,
          },
        ],
        status: ShoppingCartStatus.Pending,
        clientId: clientId,
        openedAt: openTimestamp,
        totalAmount: 900,
        totalItemsCount: 6,
      };
      expect(output).toEqual(expectedDetails);
    });
  });
});
