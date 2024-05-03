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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcryptjs_1 = require("bcryptjs");
const uuid_1 = require("uuid");
let UserService = class UserService {
    constructor(db) {
        this.db = db;
    }
    async create(createUserDto, userAuthenticated) {
        if (!userAuthenticated.admin) {
            throw new common_1.BadRequestException('Você não tem autorização para criar um novo usuário.');
        }
        const allUsers = await this.db.user.findMany();
        if (allUsers.find((user) => user.email === createUserDto.email)) {
            throw new common_1.BadRequestException({
                email: 'E-mail já cadastrado no banco de dados!!',
            });
        }
        if (allUsers.find((user) => user.phone === createUserDto.phone)) {
            throw new common_1.BadRequestException({
                phone: 'Telefone já cadastrado no banco de dados!!',
            });
        }
        if (createUserDto.password !== createUserDto.confirmPassword) {
            throw new common_1.BadRequestException({
                confirmPassword: 'Senhas não conferem!',
            });
        }
        const salt = await (0, bcryptjs_1.genSalt)(10);
        const passwordHash = await (0, bcryptjs_1.hash)(createUserDto.password, salt);
        const user = await this.db.user.create({
            data: {
                id: (0, uuid_1.v4)(),
                email: createUserDto.email,
                name: createUserDto.name,
                phone: createUserDto.phone
                    ?.replace('(', '')
                    ?.replace(')', '')
                    ?.replace('-', '')
                    ?.replace(' ', ''),
                password: passwordHash,
                admin: createUserDto.admin,
                frotas: createUserDto.frotas,
            },
        });
        return `Usuário ${user.name}, criado com sucesso!`;
    }
    async findAll(userAuthenticated) {
        if (!userAuthenticated.admin) {
            throw new common_1.BadRequestException('Você não possui autorização para acessar essa rota!');
        }
        const users = await this.db.user.findMany({
            select: {
                email: true,
                password: false,
                id: true,
                name: true,
                phone: true,
                MaintenceRequest: false,
                createdAt: true,
                updatedAt: true,
                admin: true,
                frotas: true,
                requester: true,
            },
            orderBy: {
                name: 'asc',
            },
        });
        return { users };
    }
    async findOne(id) {
        const user = await this.db.user.findUnique({
            where: {
                id: id,
            },
            select: {
                email: true,
                password: false,
                id: true,
                name: true,
                phone: true,
                MaintenceRequest: true,
                createdAt: true,
                updatedAt: true,
                admin: true,
                frotas: true,
                requester: true,
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Nenhum usuário encontrado no banco de dados para id informada!', {
                cause: new Error(),
                description: 'buscar-usuario',
            });
        }
        return { user };
    }
    async profile(user) {
        const userDetails = await this.db.user.findUnique({
            where: {
                id: user.id,
            },
            select: {
                email: true,
                password: false,
                id: true,
                name: true,
                phone: true,
                MaintenceRequest: false,
                createdAt: true,
                updatedAt: true,
                admin: true,
                frotas: true,
                requester: true,
            },
        });
        return { user: userDetails };
    }
    async update(id, updateUserDto, user) {
        const userFromDb = await this.db.user.findUnique({
            where: { id },
        });
        if (!userFromDb) {
            throw new common_1.BadRequestException('Nenhum usuário encontrado no banco de dados para id informada!', {
                cause: new Error(),
                description: 'buscar-usuario',
            });
        }
        if (user.id !== id && !user.admin) {
            throw new common_1.BadRequestException('Você não possui permissão para realizar esta requisição!', { cause: new Error(), description: 'authorization' });
        }
        if ((updateUserDto.admin ||
            updateUserDto.frotas ||
            updateUserDto.requester) &&
            !user.admin) {
            throw new common_1.BadRequestException({
                auth: 'Você não tem permissão para adicionar cargos ao usuário!',
            });
        }
        if (updateUserDto.password !== updateUserDto.confirmPassword) {
            throw new common_1.BadRequestException({
                confirmPassword: 'Senhas não conferem!',
            });
        }
        if (updateUserDto.password) {
            const salt = await (0, bcryptjs_1.genSalt)(10);
            const passwordHash = await (0, bcryptjs_1.hash)(updateUserDto.password, salt);
            updateUserDto.password = passwordHash;
        }
        await this.db.user.update({
            where: {
                id,
            },
            data: {
                email: updateUserDto.email,
                name: updateUserDto.name,
                phone: updateUserDto.phone
                    ?.replace('(', '')
                    ?.replace(')', '')
                    ?.replace('-', '')
                    ?.replace(' ', ''),
                password: updateUserDto.password,
                admin: updateUserDto.admin,
                frotas: updateUserDto.frotas,
            },
        });
        return `This action updates a #${id} user`;
    }
    async remove(id, user) {
        const userFromDb = await this.db.user.findUnique({ where: { id: id } });
        if (!userFromDb) {
            throw new common_1.BadRequestException('Nenhum usuário encontrado no banco de dados para id informada!', {
                cause: new Error(),
                description: 'buscar-usuario',
            });
        }
        if (user.id !== id && !user.admin) {
            throw new common_1.BadRequestException('Você não possui permissão para realizar esta requisição!', { cause: new Error(), description: 'authorization' });
        }
        const deletedUser = await this.db.user.delete({ where: { id: id } });
        return `Usuário ${deletedUser.name}, deletado com sucesso!`;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map