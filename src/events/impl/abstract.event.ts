import { IAggregateEvent } from './../../event-store/shared/aggregate-event.interface';


export class UserAbstractEvent implements IAggregateEvent {
    constructor(public readonly id: string) {}
    get streamName() {
        return `users-${this.id}`;
    }
}
