import { OnModuleDestroy, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IEventHandler, IEvent, ObservableBus, CommandBus, ISaga } from '@nest-lib/cqrs';
import { EventStoreBus, IEventConstructors } from './event-store.bus';
import { EventStore } from '../event-store.class';
export declare enum EventStoreSubscriptionType {
    Persistent = 0,
    CatchUp = 1
}
export type EventStorePersistentSubscription = {
    type: EventStoreSubscriptionType.Persistent;
    stream: string;
    persistentSubscriptionName: string;
};
export type EventStoreCatchupSubscription = {
    type: EventStoreSubscriptionType.CatchUp;
    stream: string;
};
export type EventStoreSubscriptionConfig = {
    persistentSubscriptionName: string;
};
export type EventStoreSubscription = EventStorePersistentSubscription | EventStoreCatchupSubscription;
export type EventStoreBusConfig = {
    subscriptions: EventStoreSubscription[];
    events: IEventConstructors;
};
export type EventHandlerType = Type<IEventHandler<IEvent>>;
export declare class EventBusProvider extends ObservableBus<IEvent> implements OnModuleDestroy {
    private readonly commandBus;
    private readonly moduleRef;
    private readonly eventStore;
    private config;
    private _publisher;
    private readonly subscriptions;
    private readonly cqrsOptions;
    constructor(commandBus: CommandBus, moduleRef: ModuleRef, eventStore: EventStore, config: EventStoreBusConfig);
    get publisher(): EventStoreBus;
    set publisher(_publisher: EventStoreBus);
    onModuleDestroy(): void;
    publish<T extends IEvent>(event: T, stream: string): void;
    publishAll(events: IEvent[]): void;
    bind(handler: IEventHandler<IEvent>, name: string): void;
    registerSagas(types?: Type<any>[]): void;
    register(handlers?: EventHandlerType[]): void;
    protected registerHandler(handler: EventHandlerType): void;
    protected ofEventName(name: string): Observable<IEvent>;
    private getEventName;
    protected registerSaga(saga: ISaga): void;
    private reflectEventsNames;
    private useDefaultPublisher;
}
