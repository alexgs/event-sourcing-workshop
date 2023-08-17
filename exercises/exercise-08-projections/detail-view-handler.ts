import {
  PricedProductItem,
  ShoppingCartDetails,
  ShoppingCartEvent,
  ShoppingCartStatus,
} from './projections.exercise.test';
import { EventEnvelope, EventHandler } from './tools/eventStore';
import { DocumentsCollection } from './tools/database';

type HandlerWrapper = (
  db: DocumentsCollection<ShoppingCartDetails>,
) => EventHandler;

function handleAddItemToCart(
  details: ShoppingCartDetails,
  item: PricedProductItem,
): ShoppingCartDetails {
  const output = { ...details };
  const currentItem = details.productItems.find(
    (productItem) => productItem.productId === item.productId,
  );

  if (currentItem) {
    // I'm just going to edit the current item in place (which is not great in
    //   terms of immutability, but it's fine for this project).
    currentItem.quantity += item.quantity;
  } else {
    output.productItems.push(item);
  }
  output.totalItemsCount += item.quantity;
  output.totalAmount += item.unitPrice * item.quantity;
  return output;
}

export const detailViewHandler: HandlerWrapper = (
  db: DocumentsCollection<ShoppingCartDetails>,
) =>
  function detailViewWrappedHandler(
    eventEnvelope: EventEnvelope<ShoppingCartEvent>,
  ) {
    const { shoppingCartId } = eventEnvelope.data;
    switch (eventEnvelope.type) {
      case 'ProductItemAddedToShoppingCart':
        const currentCart = db.get(shoppingCartId);
        const updatedCart = handleAddItemToCart(
          currentCart,
          eventEnvelope.data.productItem,
        );
        db.store(shoppingCartId, updatedCart);
        break;
      case 'ProductItemRemovedFromShoppingCart':
        break;
      case 'ShoppingCartCanceled':
        break;
      case 'ShoppingCartConfirmed':
        break;
      case 'ShoppingCartOpened':
        db.store(shoppingCartId, {
          id: shoppingCartId,
          clientId: eventEnvelope.data.clientId,
          openedAt: eventEnvelope.data.openedAt,
          productItems: [],
          status: ShoppingCartStatus.Pending,
          totalAmount: 0,
          totalItemsCount: 0,
        });
        break;
    }
  };
