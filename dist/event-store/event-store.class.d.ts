import { EventStoreNodeConnection, ConnectionSettings, TcpEndPoint, GossipSeed } from 'node-eventstore-client';
export declare class EventStore {
    private settings;
    private endpoint;
    connection: EventStoreNodeConnection;
    isConnected: boolean;
    retryAttempts: number;
    private logger;
    constructor(settings: ConnectionSettings, endpoint: TcpEndPoint | GossipSeed[]);
    connect(): Promise<void>;
    getConnection(): EventStoreNodeConnection;
    close(): void;
}
