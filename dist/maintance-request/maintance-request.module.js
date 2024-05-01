"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintanceRequestModule = void 0;
const common_1 = require("@nestjs/common");
const maintance_request_service_1 = require("./maintance-request.service");
const maintance_request_controller_1 = require("./maintance-request.controller");
const prisma_service_1 = require("../prisma.service");
const email_service_1 = require("../email.service");
let MaintanceRequestModule = class MaintanceRequestModule {
};
exports.MaintanceRequestModule = MaintanceRequestModule;
exports.MaintanceRequestModule = MaintanceRequestModule = __decorate([
    (0, common_1.Module)({
        controllers: [maintance_request_controller_1.MaintanceRequestController],
        providers: [maintance_request_service_1.MaintanceRequestService, prisma_service_1.PrismaService, email_service_1.EmailService],
    })
], MaintanceRequestModule);
//# sourceMappingURL=maintance-request.module.js.map