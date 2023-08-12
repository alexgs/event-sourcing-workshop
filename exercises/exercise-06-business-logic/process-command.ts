import { ShoppingCart, ShoppingCartCommand, ShoppingCartEvent } from './types';

export function processCommand(
  cart: ShoppingCart,
  command: ShoppingCartCommand,
): ShoppingCartEvent {
  // process the command to get an event
  let event: ShoppingCartEvent = null;
  switch (command.type) {
    case 'command.add-product-to-shopping-cart':
      break;
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
