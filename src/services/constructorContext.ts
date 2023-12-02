import { createContext } from 'react';
import { IConstructorContext } from '../utils/types';

export const ConstructorContext = createContext<IConstructorContext>({
    ingredientsConstructor: { bun: null, toppings: [] },
    setIngredientsConstructor: () => {},
});
