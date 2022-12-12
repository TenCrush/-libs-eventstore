import { Logger } from '@nestjs/common';
import { IEventHandler, EventsHandler } from '@nest-lib/cqrs';

import { UserUpdatedEvent } from '../impl/user-updated.event';

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
    handle(event: UserUpdatedEvent) {
        Logger.log(event, 'UserUpdatedEvent'); // write here
    }
}
