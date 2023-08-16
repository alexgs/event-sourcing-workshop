import { v4 as uuid } from 'uuid';
import { GREEN_BALLS, RED_BALLS, YELLOW_BALL } from './constants';
import {
  AddProductToCart,
  CancelShoppingCart,
  ConfirmShoppingCart,
  OpenShoppingCart,
  PricedProductItem,
  ProductAddedToCart,
  ProductItem,
  ProductRemovedFromCart,
  RemoveProductFromCart,
  ShoppingCart,
  ShoppingCartCanceled,
  ShoppingCartCommand,
  ShoppingCartConfirmed,
  ShoppingCartEvent,
  ShoppingCartOpened,
} from './types';

function getUnitPrice(product: ProductItem): number {
  const productList = [RED_BALLS, GREEN_BALLS, YELLOW_BALL];
  const item = productList.find((item) => item.productId === product.productId);
  return item.unitPrice;
}

function processAddProductToShoppingCart(
  cart: ShoppingCart | null,
  command: AddProductToCart,
): ProductAddedToCart {
  if (cart?.status !== 'open') {
    throw new Error('Cart must be opened before adding product(s).');
  }

  const pricedItem: PricedProductItem = {
    ...command.data.productItem,
    unitPrice: getUnitPrice(command.data.productItem),
  };

  return {
    id: uuid(),
    type: 'product-added-to-shopping-cart',
    data: {
      shoppingCartId: command.data.shoppingCartId,
      productItem: pricedItem,
    },
  };
}

function processCancelShoppingCart(
  cart: ShoppingCart | null,
  command: CancelShoppingCart,
): ShoppingCartCanceled {
  if (cart?.status !== 'open') {
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
  cart: ShoppingCart | null,
  command: ConfirmShoppingCart,
): ShoppingCartConfirmed {
  if (cart?.status !== 'open') {
    throw new Error('Cart must be opened before confirming.');
  }
  if (cart?.products.length < 1) {
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
  _cart: null,
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
  cart: ShoppingCart | null,
  command: RemoveProductFromCart,
): ProductRemovedFromCart {
  if (cart?.status !== 'open') {
    throw new Error('Cart must be opened before removing products.');
  }
  if (cart && !cart.products.includes(command.data.productItem)) {
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

/**
 * This is a pure function that simply processes commands into corresponding events
 */
export function processCommand(
  cart: ShoppingCart | null,
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
      // TODO There could be better handling/checking/error-throwing for `cart` being `null` or an actual value
      return processOpenShoppingCart(cart as null, command as OpenShoppingCart);
    case 'command.remove-product-from-cart':
      return processRemoveProductFromCart(
        cart,
        command as RemoveProductFromCart,
      );
  }
}
