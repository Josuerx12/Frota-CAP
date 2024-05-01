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
exports.CreateProviderDto = void 0;
const class_validator_1 = require("class-validator");
const provider_entity_1 = require("../entities/provider.entity");
class CreateProviderDto extends provider_entity_1.Provider {
}
exports.CreateProviderDto = CreateProviderDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Nome deve ser uma linha de letras!' }),
    (0, class_validator_1.Length)(3, 100, { message: 'Nome deve conter de 3 a 100 caracteres!' }),
    __metadata("design:type", String)
], CreateProviderDto.prototype, "name", void 0);
//# sourceMappingURL=create-provider.dto.js.map