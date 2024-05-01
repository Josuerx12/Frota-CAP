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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor(db) {
        this.db = db;
    }
    async login(credentials) {
        const userFromDB = await this.db.user.findUnique({
            where: { email: credentials.email },
        });
        if (!userFromDB) {
            throw new common_1.BadRequestException({
                email: 'Nenhum localizado para o email informado! Solicite seu acesso!',
            });
        }
        const verifiedUser = await (0, bcryptjs_1.compare)(credentials.password, userFromDB.password);
        if (!verifiedUser) {
            throw new common_1.BadRequestException({
                password: 'Senha incorreta, corrija e tente novamente!',
            });
        }
        const user = await this.db.user.findUnique({
            where: { id: userFromDB.id },
            select: {
                email: true,
                password: false,
                id: true,
                name: true,
                phone: true,
                MaintenceRequest: false,
                createdAt: false,
                updatedAt: false,
            },
        });
        const token = (0, jsonwebtoken_1.sign)({ user }, process.env.SECRET);
        return { token };
    }
    async loginWorkshop(credentials) {
        const workshopFromDb = await this.db.workshop.findUnique({
            where: { email: credentials.email },
        });
        if (!workshopFromDb) {
            throw new common_1.BadRequestException({
                email: 'Nenhum localizado para o email informado! Solicite seu acesso!',
            });
        }
        const verifiedWorkshop = await (0, bcryptjs_1.compare)(credentials.password, workshopFromDb.password);
        if (!verifiedWorkshop) {
            throw new common_1.BadRequestException({
                password: 'Senha incorreta, corrija e tente novamente!',
            });
        }
        const workshop = await this.db.workshop.findUnique({
            where: { id: workshopFromDb.id },
            select: {
                email: true,
                password: false,
                id: true,
                name: true,
                Address: true,
                MaintenceRequest: false,
                createdAt: false,
                updatedAt: false,
            },
        });
        const token = (0, jsonwebtoken_1.sign)({ workshop }, process.env.SECRET);
        return { token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map