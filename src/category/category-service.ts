import CategoryModel from "./category-model";
import { Category } from "./category-types";

export class CategoryService {
    async create(category: Category) {
        try {
            console.log("category ::::::: ", category);

            const newCategory = new CategoryModel(category);

            const savedCategory = await newCategory.save();
            console.log("savedCategory ::::::: ", savedCategory);

            return savedCategory;
        } catch (error) {
            console.error("Error saving category to database:", error);
            throw error;
        }
    }
}
