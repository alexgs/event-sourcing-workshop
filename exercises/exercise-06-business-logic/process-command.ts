import { v4 as uuid } from 'uuid';
import {
  AddProductToCart,
  CancelShoppingCart,
  ConfirmShoppingCart,
  OpenShoppingCart,
  ProductAddedToCart,
  ProductRemovedFromCart,
  RemoveProductFromCart,
  ShoppingCart,
  ShoppingCartCanceled,
  ShoppingCartCommand,
  ShoppingCartConfirmed,
  ShoppingCartEvent,
  ShoppingCartOpened,
} from './types';

function processAddProductToShoppingCart(
  cart: ShoppingCart,
  command: AddProductToCart,
): ProductAddedToCart {
  if (cart.status !== 'open') {
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

function processCancelShoppingCart(
  cart: ShoppingCart,
  command: CancelShoppingCart,
): ShoppingCartCanceled {
  if (cart.status !== 'open') {
    throw new Error('Cart must be opened before canceling.');
  }

  return {
    id: uuid(),
    type: 'shopping-cart-canceled',
    data: {
      shoppingCartId: command.data.shoppingCartId,
      canceledAt: command.data.timestamp,
    },
  };
}

function processConfirmShoppingCart(
  cart: ShoppingCart,
  command: ConfirmShoppingCart,
): ShoppingCartConfirmed {
  if (cart.status !== 'open') {
    throw new Error('Cart must be opened before confirming.');
  }
  if (cart.products.length < 1) {
    throw new Error('Cart must contain product(s) before confirming.');
  }

  return {
    id: uuid(),
    type: 'shopping-cart-confirmed',
    data: {
      shoppingCartId: command.data.shoppingCartId,
      confirmedAt: command.data.timestamp,
    },
  };
}

function processOpenShoppingCart(
  _cart: ShoppingCart,
  command: OpenShoppingCart,
): ShoppingCartOpened {
  return {
    id: uuid(),
    type: 'shopping-cart-opened',
    data: {
      clientId: command.data.clientId,
      openedAt: command.data.timestamp,
      shoppingCartId: command.data.shoppingCartId,
    },
  };
}

function processRemoveProductFromCart(
  cart: ShoppingCart,
  command: RemoveProductFromCart,
): ProductRemovedFromCart {
  if (cart.status !== 'open') {
    throw new Error('Cart must be opened before removing products.');
  }
  if (!cart.products.includes(command.data.productItem)) {
    throw new Error('Cart must contain the product to be removed.');
  }

  return {
    id: uuid(),
    type: 'product-removed-from-shopping-cart',
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
  switch (command.type) {
    case 'command.add-product-to-shopping-cart':
      return processAddProductToShoppingCart(cart, command as AddProductToCart);
    case 'command.cancel-shopping-cart':
      return processCancelShoppingCart(cart, command as CancelShoppingCart);
    case 'command.confirm-shopping-cart':
      return processConfirmShoppingCart(cart, command as ConfirmShoppingCart);
    case 'command.open-shopping-cart':
      return processOpenShoppingCart(cart, command as OpenShoppingCart);
    case 'command.remove-product-from-cart':
      return processRemoveProductFromCart(cart, command as RemoveProductFromCart);
  }
}
