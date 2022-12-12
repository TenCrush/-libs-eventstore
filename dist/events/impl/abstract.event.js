"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAbstractEvent = void 0;
class UserAbstractEvent {
    constructor(id) {
        this.id = id;
    }
    get streamName() {
        return `users-${this.id}`;
    }
}
exports.UserAbstractEvent = UserAbstractEvent;
//# sourceMappingURL=abstract.event.js.map