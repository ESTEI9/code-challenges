import { RecipeItem } from "./recipe-item";

export interface Recipe {
    shell: string,
    proteins: Array<RecipeItem>,
    toppings?: Array<RecipeItem>,
    sauces?: Array<RecipeItem>,
}
