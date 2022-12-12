import { DynamicModule } from '@nestjs/common';
import { ConnectionSettings, GossipSeed, TcpEndPoint } from 'node-eventstore-client';
export interface EventStoreModuleOptions {
    connectionSettings: ConnectionSettings;
    endpoint: TcpEndPoint | GossipSeed[];
}
export interface EventStoreModuleAsyncOptions {
    useFactory: (...args: any[]) => Promise<EventStoreModuleOptions> | EventStoreModuleOptions;
    inject?: any[];
}
export declare class EventStoreModule {
    static forRoot(settings: ConnectionSettings, endpoint: TcpEndPoint | GossipSeed[]): DynamicModule;
    static forRootAsync(options: EventStoreModuleAsyncOptions): DynamicModule;
}
