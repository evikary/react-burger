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

export interface IBodyPost {
    ingredients: string[];
}

export interface IOrder {
    name: string;
    order: {
        num: number | null;
    };
    success: boolean;
}

export interface IConstructorAction {
    type: string;
    payload: IIngredient;
    from: number;
    to: number;
}

export interface IStore {
    ingredientsConstructor: IConstructor;
    burgerIngredients: {
        load: boolean;
        fail: boolean;
        items: IIngredient[];
    };
    orderModal: {
        num: null | number;
    };
    ingredientModal: {
        ingredientItem: null | IIngredient;
    };
}

export interface IIngredientsAction {
    type: string;
    payload: IIngredient[];
}

export interface IModalAction {
    type: string;
    payload: null | number;
}

export interface INumberOrder {
    num: null | number;
}

export interface IModalIngredientsAction {
    type: string;
    payload: null | IIngredient;
}

export interface IIngredientItem {
    ingredientItem: null | IIngredient;
}
