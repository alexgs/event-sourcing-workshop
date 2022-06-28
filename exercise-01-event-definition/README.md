# Exercise 01 - Event Definition

Adapted from [the original][1].

[1]: https://github.com/oskardudycz/EventSourcing.NetCore/blob/main/Workshops/IntroductionToEventSourcing/01-EventsDefinition/README.md

## Background

Assume the following shopping cart process:

1. The customer may add a product to the shopping cart only after opening it.
2. When selecting and adding a product to the basket customer needs to provide the quantity chosen. The product price is calculated by the system based on the current price list.
3. The customer may remove a product with a given price from the cart.
4. The customer can confirm the shopping cart and start the order fulfilment process.
5. The customer may also cancel the shopping cart and reject all selected products.
6. After shopping cart confirmation or cancellation, the product can no longer be added or removed from the cart.

## Exercise

_Model the events that occur during this process and the entity representing the current state of the shopping cart._ 

#### Requirements

1. Write the event definitions in code.
2. Create sample events that represent a specific shopping cart.

## Solution

1. [`notes.md`](./notes.md) contains scratch work and initial thinking.
2. [`types.ts`](./types.ts) contains the event definitions (requirement 1).
3. [`sample-events.ts`](./sample-events.ts) contains the sample events for a specific shopping cart (requirement 2).
