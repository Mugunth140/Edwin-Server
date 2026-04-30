import { Repository } from 'typeorm';
import { Drawing } from './entities/drawing.entity.js';
import { DrawingCategory } from '../common/enums.js';
export declare class DrawingsService {
    private drawingsRepo;
    constructor(drawingsRepo: Repository<Drawing>);
    create(data: Partial<Drawing>): Promise<Drawing>;
    findAll(query: {
        projectId?: string;
        category?: DrawingCategory;
        revision?: string;
    }): Promise<Drawing[]>;
    findOne(id: string): Promise<Drawing>;
    softDelete(id: string): Promise<void>;
}
