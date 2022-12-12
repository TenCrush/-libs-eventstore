"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdatedHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nest-lib/cqrs");
const user_updated_event_1 = require("../impl/user-updated.event");
let UserUpdatedHandler = class UserUpdatedHandler {
    handle(event) {
        common_1.Logger.log(event, 'UserUpdatedEvent');
    }
};
UserUpdatedHandler = __decorate([
    (0, cqrs_1.EventsHandler)(user_updated_event_1.UserUpdatedEvent)
], UserUpdatedHandler);
exports.UserUpdatedHandler = UserUpdatedHandler;
//# sourceMappingURL=user-updated.handler.js.map