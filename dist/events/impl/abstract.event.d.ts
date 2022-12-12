import { IAggregateEvent } from './../../event-store/shared/aggregate-event.interface';
export declare class UserAbstractEvent implements IAggregateEvent {
    readonly id: string;
    constructor(id: string);
    get streamName(): string;
}
