import { IEvent, Constructor } from '@nest-lib/cqrs';
import { Subject } from 'rxjs';
import { EventStorePersistentSubscription, ResolvedEvent, EventStoreCatchUpSubscription } from 'node-eventstore-client';
import { EventStoreBusConfig, EventStorePersistentSubscription as ESPersistentSubscription, EventStoreCatchupSubscription as ESCatchUpSubscription } from './event-bus.provider';
import { EventStore } from '../event-store.class';
export interface IEventConstructors {
    [key: string]: Constructor<IEvent>;
}
interface ExtendedCatchUpSubscription extends EventStoreCatchUpSubscription {
    isLive: boolean | undefined;
}
interface ExtendedPersistentSubscription extends EventStorePersistentSubscription {
    isLive: boolean | undefined;
}
export declare class EventStoreBus {
    private eventStore;
    private subject$;
    private eventHandlers;
    private logger;
    private catchupSubscriptions;
    private catchupSubscriptionsCount;
    private persistentSubscriptions;
    private persistentSubscriptionsCount;
    constructor(eventStore: EventStore, subject$: Subject<IEvent>, config: EventStoreBusConfig);
    subscribeToPersistentSubscriptions(subscriptions: ESPersistentSubscription[]): Promise<void>;
    createMissingPersistentSubscriptions(subscriptions: ESPersistentSubscription[]): Promise<void>;
    subscribeToCatchUpSubscriptions(subscriptions: ESCatchUpSubscription[]): void;
    get allCatchUpSubscriptionsLive(): boolean;
    get allPersistentSubscriptionsLive(): boolean;
    get isLive(): boolean;
    publish(event: IEvent, stream?: string): Promise<void>;
    publishAll(events: IEvent[], stream?: string): Promise<void>;
    subscribeToCatchupSubscription(stream: string): ExtendedCatchUpSubscription;
    subscribeToPersistentSubscription(stream: string, subscriptionName: string): Promise<ExtendedPersistentSubscription>;
    onEvent(_subscription: EventStorePersistentSubscription | EventStoreCatchUpSubscription, payload: ResolvedEvent): Promise<void>;
    onDropped(subscription: ExtendedPersistentSubscription | ExtendedCatchUpSubscription, _reason: string, error: Error): void;
    reSubscribeToPersistentSubscription(stream: string, subscriptionName: string): void;
    onLiveProcessingStarted(subscription: ExtendedCatchUpSubscription): void;
    addEventHandlers(eventHandlers: IEventConstructors): void;
}
export {};
