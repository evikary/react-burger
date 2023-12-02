import { createContext } from 'react';
import { IIngredientsContext } from '../utils/types';

export const IngredientsContext = createContext<IIngredientsContext>({ ingredients: [], setIngredients: () => {} });
