"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandlers = void 0;
const user_created_handler_1 = require("./user-created.handler");
const user_deleted_handler_1 = require("./user-deleted.handler");
const user_updated_handler_1 = require("./user-updated.handler");
const user_welcomed_handler_1 = require("./user-welcomed.handler");
exports.EventHandlers = [
    user_created_handler_1.UserCreatedHandler,
    user_updated_handler_1.UserUpdatedHandler,
    user_deleted_handler_1.UserDeletedHandler,
    user_welcomed_handler_1.UserWelcomedHandler,
];
//# sourceMappingURL=index.js.map