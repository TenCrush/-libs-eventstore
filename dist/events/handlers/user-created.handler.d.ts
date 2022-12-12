import { IEventHandler } from '@nest-lib/cqrs';
import { UserCreatedEvent } from '../impl/user-created.event';
export declare class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
    handle(event: UserCreatedEvent): void;
}
