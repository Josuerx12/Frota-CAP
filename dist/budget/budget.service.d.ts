/// <reference types="multer" />
export declare class BudgetService {
    create(file: Express.Multer.File): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, file: Express.Multer.File): string;
    remove(id: number): string;
}
