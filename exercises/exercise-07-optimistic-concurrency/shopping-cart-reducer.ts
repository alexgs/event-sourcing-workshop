import {
  PricedProductItem,
  ProductAddedToCart,
  ProductRemovedFromCart,
  ShoppingCart,
  ShoppingCartCanceled,
  ShoppingCartConfirmed,
  ShoppingCartEvent,
  ShoppingCartOpened,
} from './types';

function processCartCanceled(
  cart: ShoppingCart,
  event: ShoppingCartCanceled,
): ShoppingCart {
  if (cart.id === event.data.shoppingCartId && cart.status === 'open') {
    return {
      ...cart,
      canceledAt: event.data.canceledAt,
      expectedRevision: cart.expectedRevision + BigInt(1),
      status: 'canceled',
    };
  }
  throw new Error('Illegal attempt to cancel a cart.');
}

function processCartConfirmed(
  cart: ShoppingCart,
  event: ShoppingCartConfirmed,
): ShoppingCart {
  if (cart.id === event.data.shoppingCartId && cart.status === 'open') {
    return {
      ...cart,
      confirmedAt: event.data.confirmedAt,
      expectedRevision: cart.expectedRevision + BigInt(1),
      status: 'confirmed',
    };
  }
  throw new Error('Illegal attempt to confirm a cart.');
}

function processCartOpened(event: ShoppingCartOpened): ShoppingCart {
  return {
    id: event.data.shoppingCartId,
    clientId: event.data.clientId,
    expectedRevision: BigInt(0),
    openedAt: event.data.openedAt,
    products: [],
    status: 'open',
  };
}

function processProductAdded(
  cart: ShoppingCart,
  event: ProductAddedToCart,
): ShoppingCart {
  if (cart.id === event.data.shoppingCartId && cart.status === 'open') {
    return {
      ...cart,
      expectedRevision: cart.expectedRevision + BigInt(1),
      products: [...cart.products, event.data.productItem],
    };
  }
  throw new Error('Illegal attempt to add a product to a cart.');
}

function processProductRemoved(
  cart: ShoppingCart,
  event: ProductRemovedFromCart,
): ShoppingCart {
  if (cart.id === event.data.shoppingCartId && cart.status === 'open') {
    const products: PricedProductItem[] = cart.products.filter(
      (product) => product.productId !== event.data.productItem.productId,
    );

    return {
      ...cart,
      expectedRevision: cart.expectedRevision + BigInt(1),
      products,
    };
  }
  throw new Error('Illegal attempt to remove a product from a cart.');
}

export function shoppingCartReducer(events: ShoppingCartEvent[]): ShoppingCart | null {
  let output: ShoppingCart | null = null;
  for (const event of events) {
    switch (event.type) {
      case 'shopping-cart-canceled':
        output = processCartCanceled(output, event as ShoppingCartCanceled);
        break;
      case 'shopping-cart-confirmed':
        output = processCartConfirmed(output, event as ShoppingCartConfirmed);
        break;
      case 'shopping-cart-opened':
        output = processCartOpened(event as ShoppingCartOpened);
        break;
      case 'product-added-to-shopping-cart':
        output = processProductAdded(output, event as ProductAddedToCart);
        break;
      case 'product-removed-from-shopping-cart':
        output = processProductRemoved(output, event as ProductRemovedFromCart);
        break;
    }
  }

  return output;
}
