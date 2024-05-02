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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMaintanceRequestDto = void 0;
const client_1 = require("@prisma/client");
const maintance_request_entity_1 = require("../entities/maintance-request.entity");
const class_validator_1 = require("class-validator");
class CreateMaintanceRequestDto extends maintance_request_entity_1.MaintanceRequest {
}
exports.CreateMaintanceRequestDto = CreateMaintanceRequestDto;
__decorate([
    (0, class_validator_1.IsInt)({ message: 'KM do veiculo é obrigatório!' }),
    __metadata("design:type", Number)
], CreateMaintanceRequestDto.prototype, "km", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Nome do motorista é obrigatório!' }),
    (0, class_validator_1.Length)(3, 100, { message: 'Nome do motorista deve ter de 3 a 100 letras.' }),
    __metadata("design:type", String)
], CreateMaintanceRequestDto.prototype, "driverName", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Placa do veiculo é obrigatório!' }),
    (0, class_validator_1.Length)(7, 7, {
        message: 'Placa deve conter 7 caracteres, sendo 4 letras e 3 numeros!',
    }),
    __metadata("design:type", String)
], CreateMaintanceRequestDto.prototype, "plate", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Serviço da solicitação é uma informação obrigatorio.' }),
    (0, class_validator_1.Length)(4, 255, {
        message: 'Observação deve ter de 4 a 255 letras e ou numeros.',
    }),
    __metadata("design:type", String)
], CreateMaintanceRequestDto.prototype, "service", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Status deve ser informado!' }),
    __metadata("design:type", Number)
], CreateMaintanceRequestDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Nome de quem atendeu deve ser uma linha de letras.' }),
    __metadata("design:type", String)
], CreateMaintanceRequestDto.prototype, "atendedBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({ strict: false }, { message: 'Data deve ser uma data valida!' }),
    __metadata("design:type", Object)
], CreateMaintanceRequestDto.prototype, "atendedAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Nome de quem atendeu deve ser uma linha de letras.' }),
    __metadata("design:type", String)
], CreateMaintanceRequestDto.prototype, "finishedBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({ strict: false }, { message: 'Data deve ser uma data valida!' }),
    __metadata("design:type", Object)
], CreateMaintanceRequestDto.prototype, "finishedAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Orçamento deve ser um array.' }),
    __metadata("design:type", Object)
], CreateMaintanceRequestDto.prototype, "budgets", void 0);
//# sourceMappingURL=create-maintance-request.dto.js.map