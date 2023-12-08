import React, { useEffect } from 'react';
import style from './app-component.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ErrorAPI from '../error-api/error-api';
import Loader from '../loader/loader';
import { getIngredients } from '../../services/burger-ingredients/actions';
import { useDispatch, useSelector } from 'react-redux';
import { allItems } from '../../services/burger-ingredients/selector';

function App() {
    const { load, fail } = useSelector(allItems);
    const dispatch: any = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
    }, []);

    return (
        <>
            {load && <Loader />}
            {fail && !load && <ErrorAPI>Сервис не работает! Попробуйте немного позже...</ErrorAPI>}
            {!fail && !load && (
                <>
                    <AppHeader />
                    <main className={style.main}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </main>
                </>
            )}
        </>
    );
}

export default App;
