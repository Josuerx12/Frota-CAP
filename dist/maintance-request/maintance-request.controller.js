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
exports.MaintanceRequestController = void 0;
const common_1 = require("@nestjs/common");
const maintance_request_service_1 = require("./maintance-request.service");
const create_maintance_request_dto_1 = require("./dto/create-maintance-request.dto");
const update_maintance_request_dto_1 = require("./dto/update-maintance-request.dto");
const platform_express_1 = require("@nestjs/platform-express");
let MaintanceRequestController = class MaintanceRequestController {
    constructor(maintanceRequestService) {
        this.maintanceRequestService = maintanceRequestService;
    }
    create(createMaintanceRequestDto, req) {
        return this.maintanceRequestService.create(createMaintanceRequestDto, req.user);
    }
    findAll(req) {
        return this.maintanceRequestService.findAll(req.user, req.workshop);
    }
    findByUser(req) {
        return this.maintanceRequestService.findByUser(req.user);
    }
    findByWorkshop(req) {
        return this.maintanceRequestService.findByWorkshop(req.workshop);
    }
    update(id, updateMaintanceRequestDto, req, files) {
        return this.maintanceRequestService.update(+id, updateMaintanceRequestDto, req.user, req.workshop, files);
    }
    remove(id, req) {
        return this.maintanceRequestService.remove(+id, req.user);
    }
};
exports.MaintanceRequestController = MaintanceRequestController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_maintance_request_dto_1.CreateMaintanceRequestDto, Object]),
    __metadata("design:returntype", void 0)
], MaintanceRequestController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MaintanceRequestController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MaintanceRequestController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)('/ws'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MaintanceRequestController.prototype, "findByWorkshop", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_maintance_request_dto_1.UpdateMaintanceRequestDto, Object, Array]),
    __metadata("design:returntype", void 0)
], MaintanceRequestController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MaintanceRequestController.prototype, "remove", null);
exports.MaintanceRequestController = MaintanceRequestController = __decorate([
    (0, common_1.Controller)('maintance-request'),
    __metadata("design:paramtypes", [maintance_request_service_1.MaintanceRequestService])
], MaintanceRequestController);
//# sourceMappingURL=maintance-request.controller.js.map