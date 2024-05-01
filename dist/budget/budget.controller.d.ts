/// <reference types="multer" />
import { BudgetService } from './budget.service';
export declare class BudgetController {
    private readonly budgetService;
    constructor(budgetService: BudgetService);
    create(file: Express.Multer.File): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, file: Express.Multer.File): string;
    remove(id: string): string;
}
