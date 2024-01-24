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
    success: boolean;
    name: string;
    order: {
        ingredients: IIngredient[];
        _id: string;
        owner: {
            name: string;
            email: string;
            createdAt: string;
            updatedAt: string;
        };
        status: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        number: number;
        price: number;
    };
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
    auth: {
        user: IUser;
        isAuthChecked: boolean;
        registerUserError: null | string;
        registerUserRequest: boolean;
        loginUserError: null | string;
        loginUserRequest: boolean;
        updateUserError: null;
        updateUserRequest: boolean;
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

export interface ILoginAction {
    type: string;
    payload: null | IUser;
}

export interface IFormResetPassword {
    password: string;
    token: string;
}

export interface IFormForgotData {
    email: string;
}

export interface IFormLogin extends IFormForgotData {
    password: string;
}

export interface IUser extends IFormForgotData {
    name: string;
}

export interface IFormRegister extends IFormForgotData {
    name: string;
    password: string;
}

// Api

export interface IDataIngredients {
    success: boolean;
    data: IIngredient[];
}

export interface IRegisterResponse {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export interface IResetResponse {
    success: boolean;
    message: string;
}

export interface IOptionsResponse extends RequestInit {
    headers: Record<string, string>;
}

//DnD

export interface IDragItems {
    type: string;
    item: IIngredient;
    index: number;
}

export interface IDragCollectedProps {
    isDragging: boolean;
}

export interface IDropCollectedProps {
    canDrop: boolean;
    dragItem: IIngredient;
    isOver: boolean;
}
