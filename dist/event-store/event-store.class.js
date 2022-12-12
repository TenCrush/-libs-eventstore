"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStore = void 0;
const node_eventstore_client_1 = require("node-eventstore-client");
const common_1 = require("@nestjs/common");
class EventStore {
    constructor(settings, endpoint) {
        this.settings = settings;
        this.endpoint = endpoint;
        this.isConnected = false;
        this.logger = new common_1.Logger(this.constructor.name);
        this.retryAttempts = 0;
        this.connect();
    }
    async connect() {
        this.connection = (0, node_eventstore_client_1.createConnection)(this.settings, this.endpoint);
        this.connection.connect();
        this.connection.on('connected', () => {
            this.logger.log('Connection to EventStore established!');
            this.retryAttempts = 0;
            this.isConnected = true;
        });
        this.connection.on('closed', () => {
            this.logger.error(`Connection to EventStore closed! reconnecting attempt(${this.retryAttempts})...`);
            this.retryAttempts += 1;
            this.isConnected = false;
            this.connect();
        });
    }
    getConnection() {
        return this.connection;
    }
    close() {
        this.connection.close();
    }
}
exports.EventStore = EventStore;
//# sourceMappingURL=event-store.class.js.map