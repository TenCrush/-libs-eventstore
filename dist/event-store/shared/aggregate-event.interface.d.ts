import { IEvent } from '@nest-lib/cqrs';
export interface IAggregateEvent extends IEvent {
    streamName: string;
}
