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
exports.CreateWorkshopDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const workshop_entity_1 = require("../entities/workshop.entity");
class Address {
}
__decorate([
    (0, class_validator_1.IsString)({ message: 'Nome da rua é obrigatório e deve ser informado.' }),
    __metadata("design:type", String)
], Address.prototype, "street", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ allowNaN: false }, { message: 'CEP é obrigatorio e deve ser informado.' }),
    __metadata("design:type", Number)
], Address.prototype, "cep", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ allowNaN: false }, { message: 'Numero de indentificação do local deve ser informado.' }),
    __metadata("design:type", Number)
], Address.prototype, "number", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Nome da cidade deve ser informada.' }),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Nome do estado deve ser informado.' }),
    __metadata("design:type", String)
], Address.prototype, "state", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Nome do país deve ser informado.' }),
    __metadata("design:type", String)
], Address.prototype, "country", void 0);
class CreateWorkshopDto extends workshop_entity_1.Workshop {
}
exports.CreateWorkshopDto = CreateWorkshopDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Email valido é obrigatorio.' }),
    __metadata("design:type", String)
], CreateWorkshopDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsPhoneNumber)('BR', {
        message: 'Numero da oficina é obrigatorio para o cadastro.',
    }),
    __metadata("design:type", String)
], CreateWorkshopDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkshopDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkshopDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Address),
    __metadata("design:type", Address)
], CreateWorkshopDto.prototype, "address", void 0);
//# sourceMappingURL=create-workshop.dto.js.map