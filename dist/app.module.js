"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const prisma_service_1 = require("./prisma.service");
const auth_module_1 = require("./auth/auth.module");
const provider_module_1 = require("./provider/provider.module");
const auth_guard_middleware_1 = require("./auth-guard/auth-guard.middleware");
const vehicle_module_1 = require("./vehicle/vehicle.module");
const maintance_request_module_1 = require("./maintance-request/maintance-request.module");
const workshop_module_1 = require("./workshop/workshop.module");
const budget_module_1 = require("./budget/budget.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(auth_guard_middleware_1.AuthGuardMiddleware)
            .forRoutes('/user', '/provider', '/vehicle', '/maintance-request', '/workshop', '/budget');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            provider_module_1.ProviderModule,
            vehicle_module_1.VehicleModule,
            maintance_request_module_1.MaintanceRequestModule,
            workshop_module_1.WorkshopModule,
            budget_module_1.BudgetModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map