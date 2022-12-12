"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStoreBus = void 0;
const node_eventstore_client_1 = require("node-eventstore-client");
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
const event_bus_provider_1 = require("./event-bus.provider");
class EventStoreBus {
    constructor(eventStore, subject$, config) {
        this.eventStore = eventStore;
        this.subject$ = subject$;
        this.logger = new common_1.Logger('EventStoreBus');
        this.catchupSubscriptions = [];
        this.persistentSubscriptions = [];
        this.addEventHandlers(config.events);
        const catchupSubscriptions = config.subscriptions.filter((sub) => {
            return sub.type === event_bus_provider_1.EventStoreSubscriptionType.CatchUp;
        });
        const persistentSubscriptions = config.subscriptions.filter((sub) => {
            return sub.type === event_bus_provider_1.EventStoreSubscriptionType.Persistent;
        });
        this.subscribeToCatchUpSubscriptions(catchupSubscriptions);
        this.subscribeToPersistentSubscriptions(persistentSubscriptions);
    }
    async subscribeToPersistentSubscriptions(subscriptions) {
        this.persistentSubscriptionsCount = subscriptions.length;
        await this.createMissingPersistentSubscriptions(subscriptions);
        this.persistentSubscriptions = await Promise.all(subscriptions.map(async (subscription) => {
            return await this.subscribeToPersistentSubscription(subscription.stream, subscription.persistentSubscriptionName);
        }));
    }
    async createMissingPersistentSubscriptions(subscriptions) {
        const settings = node_eventstore_client_1.PersistentSubscriptionSettings.create();
        settings['resolveLinkTos'] = true;
        try {
            await Promise.all(subscriptions.map(async (subscription) => {
                return this.eventStore.getConnection().createPersistentSubscription(subscription.stream, subscription.persistentSubscriptionName, settings)
                    .then(() => this.logger.log(`Created persistent subscription -
            ${subscription.persistentSubscriptionName}:${subscription.stream}`))
                    .catch(() => { });
            }));
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    subscribeToCatchUpSubscriptions(subscriptions) {
        this.catchupSubscriptionsCount = subscriptions.length;
        this.catchupSubscriptions = subscriptions.map((subscription) => {
            return this.subscribeToCatchupSubscription(subscription.stream);
        });
    }
    get allCatchUpSubscriptionsLive() {
        const initialized = this.catchupSubscriptions.length === this.catchupSubscriptionsCount;
        return (initialized &&
            this.catchupSubscriptions.every((subscription) => {
                return !!subscription && subscription.isLive;
            }));
    }
    get allPersistentSubscriptionsLive() {
        const initialized = this.persistentSubscriptions.length === this.persistentSubscriptionsCount;
        return (initialized &&
            this.persistentSubscriptions.every((subscription) => {
                return !!subscription && subscription.isLive;
            }));
    }
    get isLive() {
        return (this.allCatchUpSubscriptionsLive && this.allPersistentSubscriptionsLive);
    }
    async publish(event, stream) {
        const payload = (0, node_eventstore_client_1.createEventData)((0, uuid_1.v4)(), event.constructor.name, true, Buffer.from(JSON.stringify(event)));
        try {
            await this.eventStore.getConnection().appendToStream(stream, -2, [payload]);
        }
        catch (err) {
            this.logger.error(err.message, err.stack);
        }
    }
    async publishAll(events, stream) {
        try {
            await this.eventStore.getConnection().appendToStream(stream, -2, (events || []).map((event) => (0, node_eventstore_client_1.createEventData)((0, uuid_1.v4)(), event.constructor.name, true, Buffer.from(JSON.stringify(event)))));
        }
        catch (err) {
            this.logger.error(err);
        }
    }
    subscribeToCatchupSubscription(stream) {
        this.logger.log(`Catching up and subscribing to stream ${stream}!`);
        try {
            return this.eventStore.getConnection().subscribeToStreamFrom(stream, 0, true, (sub, payload) => this.onEvent(sub, payload), subscription => this.onLiveProcessingStarted(subscription), (sub, reason, error) => this.onDropped(sub, reason, error));
        }
        catch (err) {
            this.logger.error(err.message, err.stack);
        }
    }
    async subscribeToPersistentSubscription(stream, subscriptionName) {
        try {
            const resolved = (await this.eventStore.getConnection().connectToPersistentSubscription(stream, subscriptionName, (sub, payload) => this.onEvent(sub, payload), (sub, reason, error) => this.onDropped(sub, reason, error)));
            this.logger.log(`Connection to persistent subscription ${subscriptionName} on stream ${stream} established!`);
            resolved.isLive = true;
            return resolved;
        }
        catch (err) {
            this.logger.error(`[${stream}][${subscriptionName}] ${err.message}`, err.stack);
            this.reSubscribeToPersistentSubscription(stream, subscriptionName);
        }
    }
    async onEvent(_subscription, payload) {
        const { event } = payload;
        if ((payload.link !== null && !payload.isResolved) || !event || !event.isJson) {
            this.logger.error('Received event that could not be resolved!');
            return;
        }
        const handler = this.eventHandlers[event.eventType];
        if (!handler) {
            this.logger.error('Received event that could not be handled!');
            return;
        }
        const data = Object.values(JSON.parse(event.data.toString()));
        this.subject$.next(new this.eventHandlers[event.eventType](...data));
    }
    onDropped(subscription, _reason, error) {
        subscription.isLive = false;
        this.logger.error(error.message, error.stack);
        if (subscription._subscriptionId !== undefined) {
            this.reSubscribeToPersistentSubscription(subscription._streamId, subscription._subscriptionId);
        }
    }
    reSubscribeToPersistentSubscription(stream, subscriptionName) {
        this.logger.warn(`connecting to subscription ${subscriptionName} ${stream}. Retrying...`);
        setTimeout((stream, subscriptionName) => this.subscribeToPersistentSubscription(stream, subscriptionName), 3000, stream, subscriptionName);
    }
    onLiveProcessingStarted(subscription) {
        subscription.isLive = true;
        this.logger.log('Live processing of EventStore events started!');
    }
    addEventHandlers(eventHandlers) {
        this.eventHandlers = Object.assign(Object.assign({}, this.eventHandlers), eventHandlers);
    }
}
exports.EventStoreBus = EventStoreBus;
//# sourceMappingURL=event-store.bus.js.map