import style from './ingredients-category.module.css';
import IngredientDetail from '../ingredient-details/ingredient-detail';
import { IIngredient } from '../../utils/types';
import React from 'react';
import { useSelector } from 'react-redux';
import { getIngredientsCounter } from '../../services/constructor-ingredients/selector';

interface IProps {
    ingredients: IIngredient[];
    children: React.ReactNode;
    onClick: (item: IIngredient) => void;
}

function IngredientsСategory({ ingredients, children, onClick }: IProps) {
    const counter = useSelector(getIngredientsCounter);
    return (
        <div className="pb-10">
            <h2 className="text text_type_main-medium">{children}</h2>
            <ul className={`${style.container} pt-6 pl-4 pr-4`}>
                {ingredients.map((item) => {
                    return (
                        <li onClick={() => onClick(item)} key={item._id} className={style.item}>
                            <IngredientDetail counter={counter[item._id]} image={item.image} name={item.name} price={item.price} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default React.memo(IngredientsСategory);
