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
exports.MaintanceRequestService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const email_service_1 = require("../email.service");
const axios_1 = require("axios");
const aws_sdk_1 = require("aws-sdk");
let MaintanceRequestService = class MaintanceRequestService {
    constructor(db, mail) {
        this.db = db;
        this.mail = mail;
        this.api = axios_1.default.create({
            baseURL: process.env.ZAPI_URI,
            headers: { 'Client-Token': process.env.ZAPI_TOKEN },
        });
    }
    wppMessageTemplate(req) {
        return ('*Frota CAP : Manutenção de Veículos*\n\n' +
            `${req.status === 1 ? '*✴️ Seu chamado está sendo agendado✴️*\n\n' : req.status === 2 ? '*⛔ Encaminhar Veículo para oficina ⛔*\n\n' : req.status === 3 ? '*⚠️ Veículo chegou na oficina ⚠️*\n\n' : req.status === 4 ? '*📥 Orçamento enviado para aprovação📥*\n\n' : req.status === 5 ? '*🛠️ Veículo em manutenção 🛠️*\n\n' : req.status === 6 ? '*✅ Veículo Pronto para Retirada ✅*\n\n' : req.status === 7 && '*🆗Veículo Retirado🆗*\n\n'}` +
            `${req.status === 1 ? `Estamos agendando seu chamado numero:${req.id}, na oficina!` : req.status === 2 ? `O Veículo deverá ser encaminhado para oficina no dia ${req.deadlineToDeliver.toLocaleString('pt-BR')}.` : req.status === 3 ? 'O Veículo Chegou na Oficina.' : req.status === 4 ? 'Aguardando aprovação do orçamento.' : req.status === 5 ? `Orçamento aprovado, veículo está em manutenção com prazo de entrega até ${req.deadlineToForward}.` : req.status === 6 ? 'O veículo está pronto para retirada.' : req.status === 7 && `O veículo foi retirado por ${req.checkoutBy} as ${new Date(req.checkoutAt).toLocaleString('pt-BR')}`}`);
    }
    async create(createMaintanceRequestDto, user) {
        if (!user.requester) {
            throw new common_1.BadRequestException('Você não possui permissão para realizar essa solicitação, fale com o suporte!');
        }
        const vehicle = await this.db.vehicle.findUnique({
            where: { plate: createMaintanceRequestDto.plate },
        });
        if (!vehicle) {
            throw new common_1.BadRequestException({
                vehicle: `Veiculo para placa: ${createMaintanceRequestDto.plate}, não encontrado!`,
            });
        }
        const request = await this.db.maintenceRequest.create({
            data: {
                ...createMaintanceRequestDto,
                ownerId: user.id,
            },
            include: {
                budgets: true,
                Vehicle: true,
                Owner: true,
            },
        });
        await this.mail.send(request.Owner.email, request);
        await this.api
            .post('/send-text', {
            phone: `55${request.Owner.phone}`,
            message: `*Frota CAP : Manutenção de Veículos*\n\n*🆕 Seu chamado Nº ${request.id} foi recebido 🆕*\n\nIremos agendar seu chamado na Oficina`,
        })
            .catch((err) => console.log(err.message));
        return `Solicitação numero: ${request.id}, criada com sucesso!`;
    }
    async findAll(user, workshop) {
        if (!user.frotas && !workshop && !user.admin) {
            throw new common_1.BadRequestException('Usuário não possui permissão para acessar todas solicitação de manutenção!');
        }
        const requests = await this.db.maintenceRequest.findMany({
            include: {
                budgets: true,
                Owner: {
                    select: {
                        name: true,
                        phone: true,
                        email: true,
                    },
                },
                Vehicle: true,
                Workshop: {
                    select: {
                        name: true,
                        Address: true,
                        email: true,
                    },
                },
            },
        });
        return { requests };
    }
    async findOne(id, user, workshop) {
        const request = await this.db.maintenceRequest.findUnique({
            where: {
                id,
            },
            include: {
                budgets: true,
                Owner: {
                    select: {
                        name: true,
                        phone: true,
                        email: true,
                    },
                },
                Vehicle: true,
                Workshop: {
                    select: {
                        name: true,
                        Address: true,
                        email: true,
                    },
                },
            },
        });
        if (!request) {
            throw new common_1.BadRequestException(`Não foi possivel encontrar a solicitação ID: ${id}, no banco de dados!`);
        }
        if (request.ownerId !== user.id && !user.frotas && !workshop) {
            throw new common_1.BadRequestException('Solicitação encontrada, porem você não tem permissão de vizualizar-la');
        }
        return { request };
    }
    async findByUser(user) {
        const requests = await this.db.maintenceRequest.findMany({
            where: { ownerId: user.id },
            include: {
                budgets: true,
                Owner: {
                    select: {
                        name: true,
                        phone: true,
                        email: true,
                    },
                },
                Vehicle: true,
                Workshop: {
                    select: {
                        name: true,
                        Address: true,
                        email: true,
                    },
                },
            },
        });
        return { requests };
    }
    async findByWorkshop(ws) {
        const requests = await this.db.maintenceRequest.findMany({
            where: { workShopId: ws.id },
            include: {
                budgets: true,
                Owner: {
                    select: {
                        name: true,
                        phone: true,
                        email: true,
                    },
                },
                Vehicle: true,
                Workshop: {
                    select: {
                        name: true,
                        Address: true,
                        email: true,
                    },
                },
            },
        });
        return { requests };
    }
    basicValidations(request, updatedCredentials, user, workshop) {
        if (updatedCredentials.status < 0 ||
            updatedCredentials.status < request.status ||
            updatedCredentials.status > request.status + 1) {
            throw new common_1.BadRequestException('Não é possivel continuar com essa requisição pois você está tentando burlar o status da solicitação!');
        }
        if ((user && !user.frotas && updatedCredentials.status === 1) ||
            (user && !user.frotas && updatedCredentials.status === 2)) {
            throw new common_1.BadRequestException('Você não tem autorização para realizar essa requisição !');
        }
        if ((!workshop && updatedCredentials.status === 3) ||
            (!workshop && updatedCredentials.status === 4) ||
            (!workshop && updatedCredentials.status === 5) ||
            (!workshop && updatedCredentials.status === 6) ||
            (!workshop && updatedCredentials.status === 7)) {
            throw new common_1.BadRequestException('Você não tem autorização para realizar essa requisição!');
        }
    }
    async update(id, updateMaintanceRequestDto, user, workshop, file) {
        const requestFromDb = await this.db.maintenceRequest.findUnique({
            where: { id },
            include: {
                budgets: true,
                Owner: true,
                Vehicle: true,
            },
        });
        updateMaintanceRequestDto.status = Number(updateMaintanceRequestDto.status);
        updateMaintanceRequestDto.workShopId = Number(updateMaintanceRequestDto.workShopId);
        this.basicValidations(requestFromDb, updateMaintanceRequestDto, user, workshop);
        if (updateMaintanceRequestDto.status === 1) {
            const res = await this.db.maintenceRequest.update({
                where: {
                    id,
                },
                data: {
                    status: updateMaintanceRequestDto.status,
                    atendedBy: user.name,
                    atendedAt: new Date(Date.now()),
                },
                include: {
                    budgets: true,
                    Owner: true,
                    Vehicle: true,
                },
            });
            await this.mail.send(res.Owner.email, res);
            await this.api.post('/send-text', {
                phone: `55${res.Owner.phone}`,
                message: this.wppMessageTemplate(res),
            });
        }
        if (updateMaintanceRequestDto.status === 2) {
            if (!updateMaintanceRequestDto.workShopId) {
                throw new common_1.BadRequestException('ID da oficina deve ser informado!');
            }
            if (!updateMaintanceRequestDto.deadlineToDeliver) {
                throw new common_1.BadRequestException('Data para entrega do veiculo é obrigatoria!');
            }
            const dateNow = Date.now();
            const spendedTime = dateNow - new Date(requestFromDb.atendedAt).getTime();
            const res = await this.db.maintenceRequest.update({
                where: {
                    id,
                },
                data: {
                    status: 2,
                    workShopId: updateMaintanceRequestDto.workShopId,
                    atendedBy: user.name,
                    scheduledAt: new Date(dateNow),
                    timeToSchedule: spendedTime,
                    deadlineToDeliver: new Date(updateMaintanceRequestDto.deadlineToDeliver),
                },
                include: {
                    budgets: true,
                    Owner: true,
                    Vehicle: true,
                    Workshop: true,
                },
            });
            await this.mail.send(res.Owner.email, res);
            await this.api.post('/send-text', {
                phone: `55${res.Owner.phone}`,
                message: this.wppMessageTemplate(res),
            });
        }
        if (updateMaintanceRequestDto.status === 3) {
            const res = await this.db.maintenceRequest.update({
                where: {
                    id,
                },
                data: {
                    status: 3,
                    delivered: true,
                    deliveredAt: new Date(),
                },
                include: {
                    budgets: true,
                    Owner: true,
                    Vehicle: true,
                },
            });
            await this.mail.send(res.Owner.email, res);
            await this.api.post('/send-text', {
                phone: `55${res.Owner.phone}`,
                message: this.wppMessageTemplate(res),
            });
        }
        if (updateMaintanceRequestDto.status === 4) {
            const s3 = new aws_sdk_1.S3({
                credentials: {
                    accessKeyId: process.env.AWS_KEY,
                    secretAccessKey: process.env.AWS_SECRET,
                },
            });
            if (file) {
                const fileUploaded = await s3
                    .upload({
                    Bucket: process.env.BUDGET_BUCKET,
                    Key: Date.now() + file.originalname,
                    Body: file.buffer,
                    ACL: 'public-read',
                })
                    .promise();
                await this.db.budget.create({
                    data: {
                        maintenceId: requestFromDb.id,
                        key: fileUploaded.Key,
                        url: fileUploaded.Location,
                    },
                });
            }
            const res = await this.db.maintenceRequest.update({
                where: {
                    id,
                },
                data: {
                    status: 4,
                },
                include: {
                    budgets: true,
                    Owner: true,
                    Vehicle: true,
                },
            });
            await this.mail.send(res.Owner.email, res);
            await this.api.post('/send-text', {
                phone: `55${res.Owner.phone}`,
                message: this.wppMessageTemplate(res),
            });
        }
        if (updateMaintanceRequestDto.status === 5) {
            if (!updateMaintanceRequestDto.deadlineToForward) {
                throw new common_1.BadRequestException('Data do prazo de entrega é obrigatorio para avançar.');
            }
            const res = await this.db.maintenceRequest.update({
                where: {
                    id,
                },
                data: {
                    status: 5,
                    deadlineToForward: new Date(updateMaintanceRequestDto.deadlineToForward),
                    serviceStartAt: new Date(Date.now()),
                },
                include: {
                    budgets: true,
                    Owner: true,
                    Vehicle: true,
                },
            });
            await this.mail.send(res.Owner.email, res);
            await this.api.post('/send-text', {
                phone: `55${res.Owner.phone}`,
                message: this.wppMessageTemplate(res),
            });
        }
        if (updateMaintanceRequestDto.status === 6) {
            const { serviceStartAt } = requestFromDb;
            const endDate = Date.now();
            const spendedTime = endDate - new Date(serviceStartAt).getTime();
            const res = await this.db.maintenceRequest.update({
                where: {
                    id,
                },
                data: {
                    status: 6,
                    serviceTime: spendedTime,
                    serviceEndAt: new Date(endDate),
                },
                include: {
                    budgets: true,
                    Owner: true,
                    Vehicle: true,
                },
            });
            await this.mail.send(res.Owner.email, res);
            await this.api.post('/send-text', {
                phone: `55${res.Owner.phone}`,
                message: this.wppMessageTemplate(res),
            });
        }
        if (updateMaintanceRequestDto.status === 7) {
            if (!updateMaintanceRequestDto.checkoutBy) {
                throw new common_1.BadRequestException('Informar quem retirou o veiculo é obrigatorio!');
            }
            const res = await this.db.maintenceRequest.update({
                where: {
                    id,
                },
                data: {
                    status: 7,
                    checkoutBy: updateMaintanceRequestDto.checkoutBy,
                    checkoutAt: new Date(),
                },
                include: {
                    budgets: true,
                    Owner: true,
                    Vehicle: true,
                },
            });
            await this.mail.send(res.Owner.email, res);
            await this.api.post('/send-text', {
                phone: `55${res.Owner.phone}`,
                message: this.wppMessageTemplate(res),
            });
        }
        return `Solicitação de manutenção ${id}, atualizada com sucesso!`;
    }
    async remove(id, user) {
        if (user.admin) {
            throw new common_1.BadRequestException('Você não tem permissão para realizar está requisição!');
        }
        const requestFromDb = await this.db.maintenceRequest.findUnique({
            where: { id },
        });
        if (!requestFromDb) {
            throw new common_1.BadRequestException(`Não foi possivel encontrar solicitação com a id ${id}, informada!`);
        }
        const deletedRequest = await this.db.maintenceRequest.delete({
            where: { id },
        });
        return `Solicitação ID: ${deletedRequest.id}, deletada com sucesso!`;
    }
};
exports.MaintanceRequestService = MaintanceRequestService;
exports.MaintanceRequestService = MaintanceRequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], MaintanceRequestService);
//# sourceMappingURL=maintance-request.service.js.map