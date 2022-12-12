import { EventStoreModule, EventStoreModuleAsyncOptions } from '../event-store.module';
import { EventBus, CommandBus, QueryBus, CqrsModule, IEvent } from '@nest-lib/cqrs';
import { Global, Module, DynamicModule } from '@nestjs/common';
import { EventBusProvider, EventStoreBusConfig } from './event-bus.provider';
import { ExplorerService } from '@nest-lib/cqrs/dist/services/explorer.service';
import { ModuleRef, ModulesContainer } from '@nestjs/core';

import { EventPublisher } from './event-publisher';
import { EventStore } from '../event-store.class';

@Global()
@Module({
    imports: [CqrsModule],
    providers: []
})
export class EventStoreCqrsModule<EventBase extends IEvent = IEvent> {
  constructor(
    private readonly explorerService: ExplorerService<EventBase>,
    private readonly eventsBus: EventBus,
    private readonly commandsBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  onModuleInit() {
    const { events, queries, sagas, commands } = this.explorerService.explore();

    this.eventsBus.register(events);
    this.commandsBus.register(commands);
    this.queryBus.register(queries);
    this.eventsBus.registerSagas(sagas);
  }

  static forRootAsync(
    options: EventStoreModuleAsyncOptions,
    eventStoreBusConfig: EventStoreBusConfig,
  ): DynamicModule {
    return {
      module: EventStoreCqrsModule,
      imports: [EventStoreModule.forRootAsync(options)],
      providers: [
        CommandBus,
        QueryBus,
        EventPublisher,
        ExplorerService,
        {
          provide: EventBus,
          useFactory: (commandBus, moduleRef, eventStore) => {
            return new EventBusProvider(
              commandBus,
              moduleRef,
              eventStore,
              eventStoreBusConfig,
            );
          },
          inject: [CommandBus, ModuleRef, EventStore],
        },
        {
          provide: EventBusProvider,
          useExisting: EventBus,
        },
      ],
      exports: [
        EventStoreModule,
        EventBusProvider,
        EventBus,
        CommandBus,
        ExplorerService,
        EventPublisher,
      ],
    };
  }

}
