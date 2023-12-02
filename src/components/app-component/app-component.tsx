import React, { useEffect, useState } from 'react';
import style from './app-component.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { linkIngredients } from '../../utils/ constants';
import ErrorAPI from '../error-api/error-api';
import Loader from '../loader/loader';

function App() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [load, setLoad] = useState(true);

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
                        <BurgerIngredients data={data} />
                        <BurgerConstructor data={data} />
                    </main>
                </>
            )}
        </>
    );
}

export default App;
