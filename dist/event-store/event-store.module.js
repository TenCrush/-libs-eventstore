"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EventStoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStoreModule = void 0;
const common_1 = require("@nestjs/common");
const event_store_class_1 = require("./event-store.class");
let EventStoreModule = EventStoreModule_1 = class EventStoreModule {
    static forRoot(settings, endpoint) {
        return {
            module: EventStoreModule_1,
            providers: [
                {
                    provide: event_store_class_1.EventStore,
                    useFactory: () => {
                        return new event_store_class_1.EventStore(settings, endpoint);
                    },
                },
            ],
            exports: [event_store_class_1.EventStore],
        };
    }
    static forRootAsync(options) {
        return {
            module: EventStoreModule_1,
            providers: [
                {
                    provide: event_store_class_1.EventStore,
                    useFactory: async (...args) => {
                        const { connectionSettings, endpoint } = await options.useFactory(...args);
                        return new event_store_class_1.EventStore(connectionSettings, endpoint);
                    },
                    inject: options.inject,
                },
            ],
            exports: [event_store_class_1.EventStore],
        };
    }
};
EventStoreModule = EventStoreModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [],
        providers: [event_store_class_1.EventStore],
        exports: [event_store_class_1.EventStore],
    })
], EventStoreModule);
exports.EventStoreModule = EventStoreModule;
//# sourceMappingURL=event-store.module.js.map