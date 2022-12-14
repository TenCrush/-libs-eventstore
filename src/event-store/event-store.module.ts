import { Global, Module, DynamicModule } from '@nestjs/common';
import { EventStore } from './event-store.class';
import { ConnectionSettings, GossipSeed, TcpEndPoint } from 'node-eventstore-client';

export class HttpEndpoint extends GossipSeed {
};

export interface EventStoreModuleOptions {
    connectionSettings: ConnectionSettings;
    endpoint: TcpEndPoint | HttpEndpoint[];
}

export interface EventStoreModuleAsyncOptions {
    useFactory: (...args: any[]) => Promise<EventStoreModuleOptions> | EventStoreModuleOptions;
    inject?: any[];
}

@Global()
@Module({
    imports: [],
    providers: [EventStore],
    exports: [EventStore],
})
export class EventStoreModule {
    static forRoot(
        settings: ConnectionSettings,
        endpoint: TcpEndPoint | GossipSeed[],
    ): DynamicModule {
        return {
            module: EventStoreModule,
            providers: [
                {
                    provide: EventStore,
                    useFactory: () => {
                        return new EventStore(settings, endpoint);
                    },
                },
            ],
            exports: [EventStore],
        };
    }

    static forRootAsync(options: EventStoreModuleAsyncOptions): DynamicModule {
        return {
            module: EventStoreModule,
            providers: [
                {
                    provide: EventStore,
                    useFactory: async (...args) => {
                        const { connectionSettings, endpoint } = await options.useFactory(
                            ...args,
                        );
                        return new EventStore(connectionSettings, endpoint);
                    },
                    inject: options.inject,
                },
            ],
            exports: [EventStore],
        };
    }
}
