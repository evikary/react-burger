import React from 'react';
import { useState } from 'react';
import style from './burger-ingridients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngridients() {

    const [current, setCurrent] = React.useState('one')

    return (
        <section className={`${style.burger_ingridients} pt-10`}>
            <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
            <aside>
                <ul className={style.tabs} style={{ display: 'flex' }}>
                    <li>
                        <Tab value="one" active={current === 'one'} onClick={setCurrent}>Булки</Tab>
                    </li>
                    <li>
                        <Tab value="two" active={current === 'two'} onClick={setCurrent}>Соусы</Tab>
                    </li>
                    <li>
                        <Tab value="three" active={current === 'three'} onClick={setCurrent}>Начинки</Tab>
                    </li>
                </ul>
            </aside>
        </section>
    );
}

export default BurgerIngridients;
