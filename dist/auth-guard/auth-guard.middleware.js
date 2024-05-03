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
exports.AuthGuardMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_service_1 = require("../prisma.service");
let AuthGuardMiddleware = class AuthGuardMiddleware {
    constructor(db) {
        this.db = db;
    }
    use(req, res, next) {
        const headerToken = req.headers.authorization;
        if (!headerToken) {
            throw new common_1.BadRequestException('Nenhum token informado! Autentique-se para acessar está rota', {
                cause: new Error(),
                description: 'token-invalido',
            });
        }
        const token = headerToken.split(' ')[1];
        if (token) {
            (0, jsonwebtoken_1.verify)(token, process.env.SECRET, async (err, decodedToken) => {
                if (err) {
                    console.log(err);
                    throw new common_1.BadRequestException({ token: 'Token invalido' }, { cause: new Error(), description: 'token-invalido' });
                }
                else {
                    if (decodedToken.user) {
                        const user = await this.db.user.findUnique({
                            where: { id: decodedToken.user.id },
                            select: {
                                email: true,
                                password: false,
                                id: true,
                                name: true,
                                phone: true,
                                MaintenceRequest: false,
                                admin: true,
                                frotas: true,
                                requester: true,
                                createdAt: true,
                                updatedAt: true,
                            },
                        });
                        req.user = user;
                        next();
                    }
                    if (decodedToken.workshop) {
                        const workshop = await this.db.workshop.findUnique({
                            where: {
                                id: decodedToken.workshop.id,
                            },
                            select: {
                                name: true,
                                id: true,
                                Address: true,
                                email: true,
                                createdAt: true,
                                updatedAt: true,
                                MaintenceRequest: true,
                                phone: true,
                            },
                        });
                        req.workshop = workshop;
                        next();
                    }
                }
            });
        }
    }
};
exports.AuthGuardMiddleware = AuthGuardMiddleware;
exports.AuthGuardMiddleware = AuthGuardMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthGuardMiddleware);
//# sourceMappingURL=auth-guard.middleware.js.map