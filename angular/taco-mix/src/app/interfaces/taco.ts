import { Recipe } from "./recipe";

export interface iTaco {
    name: string,
    recipe: Recipe
}

export class Taco implements iTaco {
    name:string = '';
    recipe: Recipe = {shell: '', proteins: [], toppings: [], sauces: []};
}