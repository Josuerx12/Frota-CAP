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
exports.VehicleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let VehicleService = class VehicleService {
    constructor(db) {
        this.db = db;
    }
    async create(createVehicleDto, user) {
        if (!user.admin) {
            throw new common_1.BadRequestException('Você não possui permissão para realizar esta requisição!', { cause: new Error(), description: 'authorization' });
        }
        const plateRegex = /^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$/;
        if (!plateRegex.test(createVehicleDto.plate)) {
            throw new common_1.BadRequestException({
                plate: 'Placa deve ser uma placa valida!',
            });
        }
        const vehicle = await this.db.vehicle.create({
            data: {
                ...createVehicleDto,
            },
        });
        return `Veiculo placa: ${vehicle.name}, adicionado com sucesso!`;
    }
    async findAll(user) {
        const vehicles = await this.db.vehicle.findMany({
            include: {
                provider: true,
            },
        });
        return { vehicles };
    }
    async findOne(id) {
        const vehicle = await this.db.vehicle.findUnique({
            where: { id },
        });
        if (!vehicle) {
            throw new common_1.BadRequestException('Nenhum veiculo encontrado para id informada!');
        }
        return { vehicle };
    }
    async update(id, updateVehicleDto, user) {
        if (!user.admin) {
            throw new common_1.BadRequestException('Você não possui permissão para realizar esta requisição!', { cause: new Error(), description: 'authorization' });
        }
        const vehiclesFromDb = await this.db.vehicle.findMany();
        const vehicleExists = await this.db.vehicle.findUnique({
            where: { id },
        });
        if (!vehicleExists) {
            throw new common_1.BadRequestException('Nenhum veiculo encontrado para id informada!');
        }
        if (vehiclesFromDb.find((v) => v.plate === updateVehicleDto.plate)) {
            throw new common_1.BadRequestException({ plate: 'Placa informada já em uso!' });
        }
        const plateRegex = /^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$/;
        if (updateVehicleDto.plate && !plateRegex.test(updateVehicleDto.plate)) {
            throw new common_1.BadRequestException({
                plate: 'Placa deve ser uma placa valida!',
            });
        }
        const vehicleEdited = await this.db.vehicle.update({
            where: { id },
            data: {
                ...updateVehicleDto,
            },
        });
        return `Veiculo ${vehicleEdited.name}, editado com sucesso!`;
    }
    async remove(id, user) {
        if (!user.admin) {
            throw new common_1.BadRequestException('Você não possui permissão para realizar esta requisição!', { cause: new Error(), description: 'authorization' });
        }
        const vehiclesFromDb = await this.db.vehicle.findUnique({
            where: { id },
        });
        if (!vehiclesFromDb) {
            throw new common_1.BadRequestException('Nenhum veiculo encontrado para id informada!');
        }
        const vehicleDeleted = await this.db.vehicle.delete({
            where: { id },
        });
        return `Veiculo ${vehicleDeleted.name}|${vehicleDeleted.plate}, removido com sucesso!`;
    }
};
exports.VehicleService = VehicleService;
exports.VehicleService = VehicleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VehicleService);
//# sourceMappingURL=vehicle.service.js.map