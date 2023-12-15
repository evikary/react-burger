import React, { useCallback, useMemo, useRef } from 'react';
import { useState } from 'react';
import style from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsСategory from '../ingredients-category/ingredients-category';
import { useDispatch, useSelector } from 'react-redux';
import { allItems } from '../../services/burger-ingredients/selector';
import Modal from '../modal/modal';
import ModalIngredientsDetails from '../modal-ingredients-details/modal-igredients-details';
import { closeModalIngredients, openModalIngredients } from '../../services/modal-burger/action';
import { IIngredient } from '../../utils/types';
import { addIngredient } from '../../services/constructor-ingredients/actions';
import { getIngredientModal } from '../../services/modal-burger/selector';

function BurgerIngredients() {
    const { items } = useSelector(allItems);
    const [current, setCurrent] = useState('buns');
    const buns = useMemo(() => items.filter((item) => item.type === 'bun'), [items]);
    const sauces = useMemo(() => items.filter((item) => item.type === 'sauce'), [items]);
    const mains = useMemo(() => items.filter((item) => item.type === 'main'), [items]);
    const dispatch = useDispatch();
    const tabsRef = useRef<HTMLUListElement | null>(null);
    const bunRef = useRef<HTMLDivElement | null>(null);
    const saucesRef = useRef<HTMLDivElement | null>(null);
    const mainsRef = useRef<HTMLDivElement | null>(null);

    const handleClick = useCallback((item: IIngredient) => {
        dispatch(addIngredient(item));
        dispatch(openModalIngredients(item));
    }, []);

    const detail = useSelector(getIngredientModal);

    function handleScroll() {
        const tabsRect: any = tabsRef.current?.getBoundingClientRect();
        const tabsYpos = tabsRect.y + tabsRect.height;

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
                <IngredientsСategory refCategory={bunRef} id={'buns'} onClick={handleClick} ingredients={buns}>
                    Булки
                </IngredientsСategory>
                <IngredientsСategory refCategory={saucesRef} id={'sauces'} onClick={handleClick} ingredients={sauces}>
                    Соусы
                </IngredientsСategory>
                <IngredientsСategory refCategory={mainsRef} id={'mains'} onClick={handleClick} ingredients={mains}>
                    Начинки
                </IngredientsСategory>
            </section>
            {detail !== null && (
                <Modal onClose={() => dispatch(closeModalIngredients())}>
                    <ModalIngredientsDetails details={detail} />
                </Modal>
            )}
        </section>
    );
}

export default React.memo(BurgerIngredients);
