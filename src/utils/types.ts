export interface IIngredient {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    key?: string;
}

export interface IConstructor {
    bun: IIngredient | null;
    toppings: IIngredient[];
}

export interface IIngredientsContext {
    ingredients: IIngredient[];
    setIngredients: (ingredients: IIngredient[]) => void;
}

export interface IConstructorContext {
    ingredientsConstructor: IConstructor;
    setIngredientsConstructor: (ingredientsConstructor: IConstructor) => void;
}
