"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopController = void 0;
const common_1 = require("@nestjs/common");
const workshop_service_1 = require("./workshop.service");
const create_workshop_dto_1 = require("./dto/create-workshop.dto");
const update_workshop_dto_1 = require("./dto/update-workshop.dto");
let WorkshopController = class WorkshopController {
    constructor(workshopService) {
        this.workshopService = workshopService;
    }
    create(createWorkshopDto, req) {
        return this.workshopService.create(createWorkshopDto, req.user);
    }
    findAll() {
        return this.workshopService.findAll();
    }
    loggedWorkshopDetails(req) {
        return this.workshopService.loggedWorkshopDetails(req.workshop);
    }
    findOne(id) {
        return this.workshopService.findOne(+id);
    }
    update(id, updateWorkshopDto, req) {
        return this.workshopService.update(+id, updateWorkshopDto, req.user);
    }
    remove(id, req) {
        return this.workshopService.remove(+id, req.user);
    }
};
exports.WorkshopController = WorkshopController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_workshop_dto_1.CreateWorkshopDto, Object]),
    __metadata("design:returntype", void 0)
], WorkshopController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WorkshopController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/detail'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WorkshopController.prototype, "loggedWorkshopDetails", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorkshopController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_workshop_dto_1.UpdateWorkshopDto, Object]),
    __metadata("design:returntype", void 0)
], WorkshopController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WorkshopController.prototype, "remove", null);
exports.WorkshopController = WorkshopController = __decorate([
    (0, common_1.Controller)('workshop'),
    __metadata("design:paramtypes", [workshop_service_1.WorkshopService])
], WorkshopController);
//# sourceMappingURL=workshop.controller.js.map