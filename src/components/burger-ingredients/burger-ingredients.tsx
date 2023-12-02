import React, { useContext, useMemo } from 'react';
import { useState } from 'react';
import style from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsСategory from '../ingredients-category/ingredients-category';
import { IIngredientsContext } from '../../utils/types';
import { IngredientsContext } from '../../services/ingredientsContext';

function BurgerIngredients() {
    const { ingredients } = useContext<IIngredientsContext>(IngredientsContext);
    const [current, setCurrent] = useState('one');
    const buns = useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients]);
    const sauces = useMemo(() => ingredients.filter((item) => item.type === 'sauce'), [ingredients]);
    const mains = useMemo(() => ingredients.filter((item) => item.type === 'main'), [ingredients]);

    return (
        <section className={`${style.ingredients} pt-10`}>
            <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
            <aside>
                <ul className={style.tabs} style={{ display: 'flex' }}>
                    <li>
                        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                            Булки
                        </Tab>
                    </li>
                    <li>
                        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                            Соусы
                        </Tab>
                    </li>
                    <li>
                        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                            Начинки
                        </Tab>
                    </li>
                </ul>
            </aside>
            <section className={`${style.container} mt-10`}>
                <IngredientsСategory ingredients={buns}>Булки</IngredientsСategory>
                <IngredientsСategory ingredients={sauces}>Соусы</IngredientsСategory>
                <IngredientsСategory ingredients={mains}>Начинки</IngredientsСategory>
            </section>
        </section>
    );
}

export default BurgerIngredients;
