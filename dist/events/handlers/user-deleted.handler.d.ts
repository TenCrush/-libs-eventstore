import { IEventHandler } from '@nest-lib/cqrs';
import { UserDeletedEvent } from '../impl/user-deleted.event';
export declare class UserDeletedHandler implements IEventHandler<UserDeletedEvent> {
    handle(event: UserDeletedEvent): void;
}
