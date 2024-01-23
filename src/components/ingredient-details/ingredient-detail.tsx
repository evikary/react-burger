import style from './ingredient-detail.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { IIngredient } from '../../utils/types';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

interface IProps {
    counter: number;
    ingredient: IIngredient;
}

function IngredientDetail({ ingredient, counter }: IProps) {
    const location = useLocation();

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
    });

    return (
        <li ref={dragRef}>
            <Link className={style.item} to={`/ingredients/${ingredient._id}`} state={{ backgroundLocation: location }}>
                {counter && <Counter count={counter} size="default" extraClass="m-1" />}
                <img src={ingredient.image} alt={ingredient.name} />
                <div className={`${style.box} mt-2 mb-2`}>
                    <span className="mr-2 text text_type_digits-default">{ingredient.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`${style.name} text text_type_main-default`}>{ingredient.name}</p>
            </Link>
        </li>
    );
}

export default React.memo(IngredientDetail);
