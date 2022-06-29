# Exercise 02 - Getting the current entity state from events

Adapted from [the original][1].

[1]: https://github.com/oskardudycz/EventSourcing.NetCore/blob/main/Workshops/IntroductionToEventSourcing/02-GettingStateFromEvents/README.md

Having a defined structure of events and an entity representing the shopping cart from the [previous exercise][2], fill a `GetShoppingCart` function that will rebuild the current state from events.

[2]: https://github.com/oskardudycz/EventSourcing.NetCore/blob/main/Workshops/IntroductionToEventSourcing/01-EventsDefinition

If needed you can modify the events or entity structure.

There are two variations:
- using mutable entities: [Mutable/GettingStateFromEventsTests.cs][3],
- using fully immutable structures: [Immutable/GettingStateFromEventsTests.cs][4].

[3]: https://github.com/oskardudycz/EventSourcing.NetCore/blob/main/Workshops/IntroductionToEventSourcing/02-GettingStateFromEvents/Mutable/GettingStateFromEventsTests.cs
[4]: https://github.com/oskardudycz/EventSourcing.NetCore/blob/main/Workshops/IntroductionToEventSourcing/02-GettingStateFromEvents/Immutable/GettingStateFromEventsTests.cs

Select your preferred approach (or both) to solve this use case.

_**Reminder**: In Event Sourcing, we're rebuilding the current state by applying on it events data in order of appearance_
