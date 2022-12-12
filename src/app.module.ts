import { Module } from '@nestjs/common';
import { GossipSeed } from 'node-eventstore-client';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventStoreBusConfig, EventStoreCqrsModule, IEventConstructors } from './event-store/eventstore-cqrs';
import { UserCreatedEvent } from './events/impl/user-created.event';
import { UserWelcomedEvent } from './events/impl/user-welcomed.event';

const events: IEventConstructors = {
    UserCreatedEvent: UserCreatedEvent,
    UserWelcomedEvent: UserWelcomedEvent,
};
export const eventStoreBusConfig: EventStoreBusConfig = {
    subscriptions: [
        // TODO: read about subs in eventStore, how can they help us.
        // TODO: dont forget to create a `Persistent Subscription`
        // TODO: and enable `resolveLinkTos` https://eventstore.org/docs/dotnet-api/reading-events/index.html
        // {
        //     // persistent subscription
        //     type: EventStoreSubscriptionType.Persistent,
        //     stream: '$ce-users',
        //     persistentSubscriptionName: 'g1',
        // },
        // {
        //     // example of persistent subscription to external stream events...
        //     type: EventStoreSubscriptionType.Persistent,
        //     stream: '$ce-orders',
        //     persistentSubscriptionName: 'g1',
        // },
        // {
        //     // Catchup subscription
        //     type: EventStoreSubscriptionType.CatchUp,
        //     stream: '$ce-users',
        // },
    ],
    events: { ...events },
};

@Module({
    imports: [
        EventStoreCqrsModule.forRootAsync(
            {
                useFactory: async () => {
                    return {
                        connectionSettings: {
                            defaultUserCredentials: {
                                username: 'admin',
                                password: 'changeit'
                            },
                            verboseLogging: true,
                            failOnNoServerResponse: true,
                        },
                        endpoint:
                            [
                                new GossipSeed({ host: '127.0.0.1', port: 2133 }, 'localhost'),
                                new GossipSeed({ host: '127.0.0.1', port: 2123 }, 'localhost'),
                                new GossipSeed({ host: '127.0.0.1', port: 2113 }, 'localhost')
                            ]
                        ,
                    };
                },
            },
            eventStoreBusConfig,
        ),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }




interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
