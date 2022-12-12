import { AggregateRoot } from '@nest-lib/cqrs';
import { EventBusProvider } from './event-bus.provider';
export interface Constructor<T> {
    new (...args: any[]): T;
}
export declare class EventPublisher {
    private readonly eventBus;
    constructor(eventBus: EventBusProvider);
    mergeClassContext<T extends Constructor<AggregateRoot>>(metatype: T): T;
    mergeObjectContext<T extends AggregateRoot>(object: T): T;
}
