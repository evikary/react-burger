import React, { useEffect, useState } from 'react';
import style from './app-component.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { linkIngredients } from '../../utils/ constants';
import ErrorAPI from '../error-api/error-api';
import Loader from '../loader/loader';
import { IngredientsContext } from '../../services/ingredientsContext';
import { ConstructorContext } from '../../services/constructorContext';
import { IConstructor, IIngredient } from '../../utils/types';

function App() {
    const [data, setData] = useState<IIngredient[]>([]);
    const [error, setError] = useState(false);
    const [load, setLoad] = useState(true);
    const [ingredientsConstructor, setIngredientsConstructor] = useState<IConstructor>({ bun: null, toppings: [] });

    const getIngredients = async (url: string) => {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Произошла ошибка...');
            }

            const json = await response.json();
            setData(json.data);
            setLoad(false);
        } catch (error) {
            setError(true);
            setLoad(false);
        }
    };

    useEffect(() => {
        getIngredients(linkIngredients);
    }, []);

    return (
        <>
            {load && <Loader />}
            {error && !load && <ErrorAPI>Сервис не работает! Попробуйте немного позже...</ErrorAPI>}
            {!error && !load && (
                <>
                    <AppHeader />
                    <main className={style.main}>
                        <IngredientsContext.Provider value={{ ingredients: data, setIngredients: setData }}>
                            <ConstructorContext.Provider value={{ ingredientsConstructor, setIngredientsConstructor }}>
                                <BurgerIngredients />
                                <BurgerConstructor />
                            </ConstructorContext.Provider>
                        </IngredientsContext.Provider>
                    </main>
                </>
            )}
        </>
    );
}

export default App;
