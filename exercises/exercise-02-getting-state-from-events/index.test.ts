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
import { shoppingCardReducer } from './index';
import { ShoppingCart, ShoppingCartEvent } from './types';

describe('Shopping cart reducer', () => {
  it('correctly processes a series of events', () => {
    const expectedOutput: ShoppingCart = {
      id: 'cart-7',
      clientId: 'client-19',
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
    const cart = shoppingCardReducer(events);

    expect(cart).toEqual(expectedOutput);
  });
});
