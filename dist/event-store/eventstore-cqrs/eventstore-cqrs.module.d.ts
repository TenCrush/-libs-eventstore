import { EventStoreModuleAsyncOptions } from '../event-store.module';
import { EventBus, CommandBus, QueryBus, IEvent } from '@nest-lib/cqrs';
import { DynamicModule } from '@nestjs/common';
import { EventStoreBusConfig } from './event-bus.provider';
import { ExplorerService } from '@nest-lib/cqrs/dist/services/explorer.service';
export declare class EventStoreCqrsModule<EventBase extends IEvent = IEvent> {
    private readonly explorerService;
    private readonly eventsBus;
    private readonly commandsBus;
    private readonly queryBus;
    constructor(explorerService: ExplorerService<EventBase>, eventsBus: EventBus, commandsBus: CommandBus, queryBus: QueryBus);
    onModuleInit(): void;
    static forRootAsync(options: EventStoreModuleAsyncOptions, eventStoreBusConfig: EventStoreBusConfig): DynamicModule;
}
