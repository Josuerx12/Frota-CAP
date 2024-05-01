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
exports.CreateVehicleDto = void 0;
const class_validator_1 = require("class-validator");
const vehicle_entity_1 = require("../entities/vehicle.entity");
class CreateVehicleDto extends vehicle_entity_1.Vehicle {
}
exports.CreateVehicleDto = CreateVehicleDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Nome do veiculo é obrigatorio!' }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Placa do veiculo é obrigatoria!' }),
    (0, class_validator_1.Length)(7, 7, {
        message: 'Placa deve conter 7 caracteres, sendo 4 letras e 3 numeros!',
    }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "plate", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'Id do provedor dever ser um numero inteiro!' }),
    __metadata("design:type", Number)
], CreateVehicleDto.prototype, "providerId", void 0);
//# sourceMappingURL=create-vehicle.dto.js.map