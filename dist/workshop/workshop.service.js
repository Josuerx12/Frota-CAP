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
exports.WorkshopService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcryptjs_1 = require("bcryptjs");
let WorkshopService = class WorkshopService {
    constructor(db) {
        this.db = db;
    }
    adminGuard(user) {
        if (!user.admin) {
            throw new common_1.BadRequestException('Você não tem permissão para executar essa requisição.');
        }
    }
    async create(createWorkshopDto, user) {
        const { email, name, password, address, phone } = createWorkshopDto;
        this.adminGuard(user);
        const salt = await (0, bcryptjs_1.genSalt)(10);
        const passHash = await (0, bcryptjs_1.hash)(password, salt);
        const mailInUseValidation = await this.db.workshop.findUnique({
            where: {
                email: email,
            },
        });
        if (mailInUseValidation) {
            throw new common_1.BadRequestException({
                email: 'Email já em uso, insira outro para continuar.',
            });
        }
        const phoneInUseValidation = await this.db.workshop.findUnique({
            where: {
                phone: phone,
            },
        });
        if (phoneInUseValidation) {
            throw new common_1.BadRequestException({
                email: 'Numero de telefone já em uso, insira outro para continuar.',
            });
        }
        const ws = await this.db.workshop.create({
            data: {
                email: email,
                phone: phone
                    ?.replace('(', '')
                    ?.replace(')', '')
                    ?.replace('-', '')
                    ?.replace(' ', ''),
                name: name,
                password: passHash,
                Address: {
                    create: {
                        ...address,
                    },
                },
            },
        });
        return `Nova oficina id: ${ws.id} - nome: ${ws.name} adicionada, `;
    }
    async findAll() {
        const workshops = await this.db.workshop.findMany({
            select: {
                Address: true,
                createdAt: true,
                email: true,
                phone: true,
                id: true,
                MaintenceRequest: true,
                name: true,
                password: false,
                updatedAt: true,
            },
        });
        return { workshops };
    }
    async findOne(id) {
        const workshop = await this.db.workshop.findUnique({
            where: { id },
            select: {
                Address: true,
                createdAt: true,
                email: true,
                id: true,
                MaintenceRequest: true,
                name: true,
                password: false,
                updatedAt: true,
            },
        });
        return { workshop };
    }
    async loggedWorkshopDetails(ws) {
        const workshop = await this.db.workshop.findUnique({
            where: { id: ws.id },
            select: {
                Address: true,
                createdAt: true,
                email: true,
                phone: true,
                id: true,
                MaintenceRequest: true,
                name: true,
                password: false,
                updatedAt: true,
            },
        });
        return { workshop };
    }
    async update(id, updateWorkshopDto, user) {
        this.adminGuard(user);
        const wsExists = await this.db.workshop.findUnique({ where: { id } });
        if (!wsExists) {
            throw new common_1.BadRequestException('Nenhuma oficina encontrada para id informada.');
        }
        let passHash;
        const { password } = updateWorkshopDto;
        if (password) {
            const salt = await (0, bcryptjs_1.genSalt)(10);
            passHash = await (0, bcryptjs_1.hash)(password, salt);
        }
        const ws = await this.db.workshop.update({
            where: {
                id,
            },
            data: {
                ...updateWorkshopDto,
                password: passHash,
                Address: {
                    update: {
                        ...updateWorkshopDto.address,
                    },
                },
            },
        });
        return `Oficina id: ${ws.id} - nome: ${ws.name}, editada com sucesso.`;
    }
    async remove(id, user) {
        this.adminGuard(user);
        const wsExists = await this.db.workshop.findUnique({ where: { id } });
        if (!wsExists) {
            throw new common_1.BadRequestException('Nenhuma oficina encontrada para id informada.');
        }
        const ws = await this.db.workshop.delete({
            where: {
                id,
            },
        });
        return `Oficina id: ${ws.id}, deletada com sucesso!`;
    }
};
exports.WorkshopService = WorkshopService;
exports.WorkshopService = WorkshopService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkshopService);
//# sourceMappingURL=workshop.service.js.map