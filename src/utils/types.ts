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

//WS

export enum WebSocketStatus {
    CONNECTING = 'CONNECTING',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
}

export interface IOrder {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: string;
    updatedAt: string;
    _id: string;
}

export interface IIngredientsOrder {
    createdAt: string;
    ingredients: IIngredient[];
    name: string;
    number: number;
    status: string;
    updatedAt: string;
    _id: string;
}

export interface IFeedOrders {
    orders: IOrder[];
    success: boolean;
    total: number;
    totalToday: number;
}
