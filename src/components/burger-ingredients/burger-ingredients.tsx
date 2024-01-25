import React, { useMemo, useRef } from 'react';
import { useState } from 'react';
import style from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsСategory from '../ingredients-category/ingredients-category';
import { useSelector } from 'react-redux';
import { allItems } from '../../services/burger-ingredients/selector';
import { IIngredient } from '../../utils/types';

function BurgerIngredients() {
    const { items } = useSelector(allItems);
    const [current, setCurrent] = useState<string>('buns');
    const buns = useMemo<IIngredient[]>(() => items.filter((item) => item.type === 'bun'), [items]);
    const sauces = useMemo<IIngredient[]>(() => items.filter((item) => item.type === 'sauce'), [items]);
    const mains = useMemo<IIngredient[]>(() => items.filter((item) => item.type === 'main'), [items]);
    const tabsRef = useRef<HTMLUListElement>(null);
    const bunRef = useRef<HTMLDivElement>(null);
    const saucesRef = useRef<HTMLDivElement>(null);
    const mainsRef = useRef<HTMLDivElement>(null);

    function handleScroll() {
        let tabsYpos: number;
        const tabsRect = tabsRef.current?.getBoundingClientRect();
        if (tabsRect) {
            tabsYpos = tabsRect.y + tabsRect.height;
        }

        let minDest = Infinity;
        let id = '';
        [bunRef, saucesRef, mainsRef]
            .map((item) => {
                return {
                    ref: item,
                    posY: item.current?.getBoundingClientRect().y || Infinity,
                };
            })
            .forEach((item) => {
                const dy = Math.abs(item.posY - tabsYpos);
                if (dy < minDest) {
                    minDest = dy;
                    id = item.ref.current?.id || current;
                }
            });

        setCurrent(id);
    }

    return (
        <section className={`${style.ingredients} pt-10`}>
            <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
            <aside>
                <ul ref={tabsRef} className={style.tabs} style={{ display: 'flex' }}>
                    <li>
                        <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
                            Булки
                        </Tab>
                    </li>
                    <li>
                        <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
                            Соусы
                        </Tab>
                    </li>
                    <li>
                        <Tab value="mains" active={current === 'mains'} onClick={setCurrent}>
                            Начинки
                        </Tab>
                    </li>
                </ul>
            </aside>
            <section onScroll={handleScroll} className={`${style.container} mt-10`}>
                <IngredientsСategory refCategory={bunRef} id={'buns'} ingredients={buns}>
                    Булки
                </IngredientsСategory>
                <IngredientsСategory refCategory={saucesRef} id={'sauces'} ingredients={sauces}>
                    Соусы
                </IngredientsСategory>
                <IngredientsСategory refCategory={mainsRef} id={'mains'} ingredients={mains}>
                    Начинки
                </IngredientsСategory>
            </section>
        </section>
    );
}

export default React.memo(BurgerIngredients);
