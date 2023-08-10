import { CLIENT_ID, SHOPPING_CART_ID } from './constants';
import {
  cartConfirmed,
  cartOpened,
  greenBallsAdded,
  greenBallsRemoved,
  redBalls,
  redBallsAdded,
  yellowBall,
  yellowBallAdded,
} from './events';
import { shoppingCartReducer } from './shopping-cart-reducer';
import { ShoppingCart, ShoppingCartEvent } from './types';

describe('Shopping cart reducer', () => {
  it('correctly processes a series of events', () => {
    const expectedOutput: ShoppingCart = {
      id: SHOPPING_CART_ID,
      clientId: CLIENT_ID,
      confirmedAt: new Date('2023-08-07'),
      openedAt: new Date('2023-08-06'),
      products: [redBalls, yellowBall],
      status: 'confirmed',
    };

    const events: ShoppingCartEvent[] = [
      cartOpened,
      redBallsAdded,
      greenBallsAdded,
      yellowBallAdded,
      greenBallsRemoved,
      cartConfirmed,
    ];
    const cart = shoppingCartReducer(events);

    expect(cart).toEqual(expectedOutput);
  });
});
