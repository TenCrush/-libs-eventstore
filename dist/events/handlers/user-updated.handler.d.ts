import { IEventHandler } from '@nest-lib/cqrs';
import { UserUpdatedEvent } from '../impl/user-updated.event';
export declare class UserUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
    handle(event: UserUpdatedEvent): void;
}
