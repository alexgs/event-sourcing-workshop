import { v4 as uuid } from 'uuid';
import {
  AddProductToCart,
  ProductAddedToCart,
  ShoppingCart,
  ShoppingCartCommand,
  ShoppingCartEvent,
} from './types';

function processAddProductToShoppingCart(
  cart: ShoppingCart,
  command: AddProductToCart,
): ProductAddedToCart {
  if (!cart.openedAt) {
    throw new Error('Cart must be opened before adding product(s).');
  }

  return {
    id: uuid(),
    type: 'product-added-to-shopping-cart',
    data: {
      shoppingCartId: command.data.shoppingCartId,
      productItem: command.data.productItem,
    },
  };
}

export function processCommand(
  cart: ShoppingCart,
  command: ShoppingCartCommand,
): ShoppingCartEvent {
  // process the command to get an event
  let event: ShoppingCartEvent = null;
  switch (command.type) {
    case 'command.add-product-to-shopping-cart':
      return processAddProductToShoppingCart(cart, command as AddProductToCart);
    case 'command.cancel-shopping-cart':
      break;
    case 'command.confirm-shopping-cart':
      break;
    case 'command.open-shopping-cart':
      break;
    case 'command.remove-product-from-cart':
      break;
  }

  return event;
}
