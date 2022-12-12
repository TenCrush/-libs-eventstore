"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.eventStoreBusConfig = void 0;
const common_1 = require("@nestjs/common");
const node_eventstore_client_1 = require("node-eventstore-client");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const eventstore_cqrs_1 = require("./event-store/eventstore-cqrs");
const user_created_event_1 = require("./events/impl/user-created.event");
const user_welcomed_event_1 = require("./events/impl/user-welcomed.event");
const events = {
    UserCreatedEvent: user_created_event_1.UserCreatedEvent,
    UserWelcomedEvent: user_welcomed_event_1.UserWelcomedEvent,
};
exports.eventStoreBusConfig = {
    subscriptions: [],
    events: Object.assign({}, events),
};
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            eventstore_cqrs_1.EventStoreCqrsModule.forRootAsync({
                useFactory: async () => {
                    return {
                        connectionSettings: {
                            defaultUserCredentials: {
                                username: 'admin',
                                password: 'changeit'
                            },
                            verboseLogging: true,
                            failOnNoServerResponse: true,
                        },
                        endpoint: [
                            new node_eventstore_client_1.GossipSeed({ host: '127.0.0.1', port: 2133 }, 'localhost'),
                            new node_eventstore_client_1.GossipSeed({ host: '127.0.0.1', port: 2123 }, 'localhost'),
                            new node_eventstore_client_1.GossipSeed({ host: '127.0.0.1', port: 2113 }, 'localhost')
                        ],
                    };
                },
            }, exports.eventStoreBusConfig),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
function createClock(ctor, hour, minute) {
    return new ctor(hour, minute);
}
class DigitalClock {
    constructor(h, m) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock {
    constructor(h, m) { }
    tick() {
        console.log("tick tock");
    }
}
let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
//# sourceMappingURL=app.module.js.map