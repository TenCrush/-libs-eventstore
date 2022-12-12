import { IEventHandler } from '@nest-lib/cqrs';
import { UserWelcomedEvent } from '../impl/user-welcomed.event';
export declare class UserWelcomedHandler implements IEventHandler<UserWelcomedEvent> {
    handle(event: UserWelcomedEvent): void;
}
