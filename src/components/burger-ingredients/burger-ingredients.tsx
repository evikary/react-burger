import React, { useCallback, useMemo } from 'react';
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
    const [current, setCurrent] = useState('one');
    const buns = useMemo(() => items.filter((item) => item.type === 'bun'), [items]);
    const sauces = useMemo(() => items.filter((item) => item.type === 'sauce'), [items]);
    const mains = useMemo(() => items.filter((item) => item.type === 'main'), [items]);
    const dispatch = useDispatch();

    const handleClick = useCallback((item: IIngredient) => {
        dispatch(addIngredient(item));
        dispatch(openModalIngredients(item));
    }, []);

    const detail = useSelector(getIngredientModal);

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
                <IngredientsСategory onClick={handleClick} ingredients={buns}>
                    Булки
                </IngredientsСategory>
                <IngredientsСategory onClick={handleClick} ingredients={sauces}>
                    Соусы
                </IngredientsСategory>
                <IngredientsСategory onClick={handleClick} ingredients={mains}>
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
