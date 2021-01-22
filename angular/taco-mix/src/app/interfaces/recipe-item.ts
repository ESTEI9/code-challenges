export interface iRecipeItem {
    name: string,
    measure: number,
    unit?: string
}

export class RecipeItem implements iRecipeItem {
    name: string = '';
    measure: number = 1;
    unit: string = '';
}
