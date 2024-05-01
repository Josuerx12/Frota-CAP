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
exports.ProviderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProviderService = class ProviderService {
    constructor(db) {
        this.db = db;
    }
    async create(credentials, user) {
        if (!user.admin) {
            throw new common_1.BadRequestException('Você não possui permissão para realizar esta requisição!', { cause: new Error(), description: 'authorization' });
        }
        const providers = await this.db.provider.findMany();
        if (providers.find((p) => p.name === credentials.name)) {
            throw new common_1.BadRequestException({
                name: 'Nome do prevedor já cadastrado no banco de dados!!',
            });
        }
        const provider = await this.db.provider.create({
            data: { ...credentials },
        });
        return `Provedor ${provider.name}, criado com sucesso!`;
    }
    async findAll() {
        const providers = await this.db.provider.findMany({
            include: {
                Vehicle: true,
            },
        });
        return { providers };
    }
    async findOne(id) {
        const provider = await this.db.provider.findUnique({
            where: { id },
            include: {
                Vehicle: true,
            },
        });
        return { provider };
    }
    async update(id, updateProviderDto, user) {
        if (!user.admin) {
            throw new common_1.BadRequestException('Você não possui permissão para realizar esta requisição!', { cause: new Error(), description: 'authorization' });
        }
        const provider = await this.db.provider.findUnique({ where: { id } });
        if (!provider) {
            throw new common_1.BadRequestException('Nenhum provedor encontrado no banco de dados para id informada!', {
                cause: new Error(),
                description: 'buscar-provedor',
            });
        }
        const providerUpdated = await this.db.provider.update({
            where: { id },
            data: { ...updateProviderDto },
        });
        return `Provedor ${providerUpdated.name}, atualizado com sucesso!`;
    }
    async remove(id, user) {
        if (!user.admin) {
            throw new common_1.BadRequestException('Você não possui permissão para realizar esta requisição!', { cause: new Error(), description: 'authorization' });
        }
        const providerFromDb = await this.db.provider.findUnique({ where: { id } });
        if (!providerFromDb) {
            throw new common_1.BadRequestException('Nenhum usuário encontrado no banco de dados para id informada!', {
                cause: new Error(),
                description: 'buscar-provider',
            });
        }
        await this.db.provider.delete({ where: { id } });
        return `Provedor ${providerFromDb.id}, deletado com sucesso!`;
    }
};
exports.ProviderService = ProviderService;
exports.ProviderService = ProviderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProviderService);
//# sourceMappingURL=provider.service.js.map