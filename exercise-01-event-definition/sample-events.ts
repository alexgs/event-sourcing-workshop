import {
  PRODUCT_ADDED_TO_CART,
  PRODUCT_REMOVED_FROM_CART,
  SHOPPING_CART_CONFIRMED,
  SHOPPING_CART_CREATED,
  SHOPPING_CART_FULFILLMENT_STARTED,
  SHOPPING_CART_STATUS,
  CartFulfillmentStarted,
  ProductAddedToCart,
  ProductRemovedFromCart,
  ShoppingCartConfirmed,
  ShoppingCartCreatedEvent, ShoppingCartCanceled, SHOPPING_CART_CANCELED,
} from './types';

// Step 1: Create cart
const event000: ShoppingCartCreatedEvent = {
  type: SHOPPING_CART_CREATED,
  data: {
    shoppingCartId: '6f79884e-c74b-4032-b7e9-42f3bd93ad28',
    status: SHOPPING_CART_STATUS.OPEN,
    userId: '0f89fe17-658c-43f8-8712-cf52d540228e',
  },
};

// Step 2: Add product 1
const event020: ProductAddedToCart = {
  type: PRODUCT_ADDED_TO_CART,
  data: {
    shoppingCartId: '6f79884e-c74b-4032-b7e9-42f3bd93ad28',
    productId: 'e5bf28e9-49fa-4aba-b753-d537342fd360',
    quantity: 1,
    unitPrice: 1299,
  }
};

// Step 3: Add product 2 with quantity 3
const event030: ProductAddedToCart = {
  type: PRODUCT_ADDED_TO_CART,
  data: {
    shoppingCartId: '6f79884e-c74b-4032-b7e9-42f3bd93ad28',
    productId: '027dc6b9-22fa-4700-a2b6-34ea7e900a78',
    quantity: 3,
    unitPrice: 469,
  }
};

// Step 4: Add product 3
const event040: ProductAddedToCart = {
  type: PRODUCT_ADDED_TO_CART,
  data: {
    shoppingCartId: '6f79884e-c74b-4032-b7e9-42f3bd93ad28',
    productId: '3afd7d21-d53a-4499-a665-807b13b5979a',
    quantity: 1,
    unitPrice: 2112,
  }
};

// Step 5: Remove 2 items of product 2
const event050: ProductRemovedFromCart = {
  type: PRODUCT_REMOVED_FROM_CART,
  data: {
    shoppingCartId: '6f79884e-c74b-4032-b7e9-42f3bd93ad28',
    productId: '027dc6b9-22fa-4700-a2b6-34ea7e900a78',
    quantity: 2,
    unitPrice: 469,
  },
};

// Step 6A.1: Confirm shopping cart -> Close cart
const event060: ShoppingCartConfirmed = {
  type: SHOPPING_CART_CONFIRMED,
  data: {
    shoppingCartId: '6f79884e-c74b-4032-b7e9-42f3bd93ad28',
    status: SHOPPING_CART_STATUS.CLOSED,
    userId: '0f89fe17-658c-43f8-8712-cf52d540228e',
  },
};

// Step 6A.2: Confirm shopping cart -> Start fulfillment and attach invoice ID
const event070: CartFulfillmentStarted = {
  type: SHOPPING_CART_FULFILLMENT_STARTED,
  data: {
    invoiceId: '87519e52-e3f9-43cb-a4f8-4759c2b9d87f',
    shoppingCartId: '6f79884e-c74b-4032-b7e9-42f3bd93ad28',
  }
};

// Step 6B.1: Cancel shopping cart -> Close cart
const event080: ShoppingCartCanceled = {
  type: SHOPPING_CART_CANCELED,
  data: {
    shoppingCartId: '6f79884e-c74b-4032-b7e9-42f3bd93ad28',
    status: SHOPPING_CART_STATUS.CLOSED,
    userId: '0f89fe17-658c-43f8-8712-cf52d540228e',
  },
};

// Step 6B.2: Cancel shopping cart -> Remove all items (1/3)
const event090: ProductRemovedFromCart = {
  type: PRODUCT_REMOVED_FROM_CART,
  data: {
    shoppingCartId: '6f79884e-c74b-4032-b7e9-42f3bd93ad28',
    productId: 'e5bf28e9-49fa-4aba-b753-d537342fd360',
    quantity: 1,
    unitPrice: 1299,
  },
};

// Step 6B.2: Cancel shopping cart -> Remove all items (2/3)
const event100: ProductRemovedFromCart = {
  type: PRODUCT_REMOVED_FROM_CART,
  data: {
    shoppingCartId: '6f79884e-c74b-4032-b7e9-42f3bd93ad28',
    productId: '027dc6b9-22fa-4700-a2b6-34ea7e900a78',
    quantity: 1,
    unitPrice: 469,
  },
};

// Step 6B.2: Cancel shopping cart -> Remove all items (3/3)
const event110: ProductRemovedFromCart = {
  type: PRODUCT_REMOVED_FROM_CART,
  data: {
    shoppingCartId: '6f79884e-c74b-4032-b7e9-42f3bd93ad28',
    productId: '3afd7d21-d53a-4499-a665-807b13b5979a',
    quantity: 1,
    unitPrice: 2112,
  },
};

// Step 7: Add product 4
// No event as this is an illegal operation. The command processor shall throw an error, which may produce an event (but
// such an event is outside the scope of the current exercise).
