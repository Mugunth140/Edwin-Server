import { DrawingCategory } from '../common/enums.js';
import { DrawingsService } from './drawings.service.js';
export declare class DrawingsController {
    private readonly drawingsService;
    constructor(drawingsService: DrawingsService);
    create(file: Express.Multer.File, body: {
        projectId: string;
        title: string;
        category: DrawingCategory;
        revision?: string;
    }, req: any): Promise<import("./entities/drawing.entity.js").Drawing>;
    findAll(projectId?: string, category?: DrawingCategory, revision?: string): Promise<import("./entities/drawing.entity.js").Drawing[]>;
    findOne(id: string): Promise<import("./entities/drawing.entity.js").Drawing>;
    softDelete(id: string): Promise<void>;
}
