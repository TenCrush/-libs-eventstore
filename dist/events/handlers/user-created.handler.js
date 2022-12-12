"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreatedHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nest-lib/cqrs");
const user_created_event_1 = require("../impl/user-created.event");
let UserCreatedHandler = class UserCreatedHandler {
    handle(event) {
        common_1.Logger.log(event, 'UserCreatedEvent');
    }
};
UserCreatedHandler = __decorate([
    (0, cqrs_1.EventsHandler)(user_created_event_1.UserCreatedEvent)
], UserCreatedHandler);
exports.UserCreatedHandler = UserCreatedHandler;
//# sourceMappingURL=user-created.handler.js.map