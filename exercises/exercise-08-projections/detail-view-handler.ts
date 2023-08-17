import {
  ShoppingCartDetails,
  ShoppingCartEvent,
} from './projections.exercise.test';
import { EventEnvelope, EventHandler } from './tools/eventStore';
import { DocumentsCollection } from './tools/database';

type HandlerWrapper = (
  db: DocumentsCollection<ShoppingCartDetails>,
) => EventHandler;

export const detailViewHandler: HandlerWrapper = (
  db: DocumentsCollection<ShoppingCartDetails>,
) =>
  function detailViewWrappedHandler(
    eventEnvelope: EventEnvelope<ShoppingCartEvent>,
  ) {
    switch (eventEnvelope.type) {
      case 'ProductItemAddedToShoppingCart':
        break;
      case 'ProductItemRemovedFromShoppingCart':
        break;
      case 'ShoppingCartCanceled':
        break;
      case 'ShoppingCartConfirmed':
        break;
      case 'ShoppingCartOpened':
        break;
    }
  };
