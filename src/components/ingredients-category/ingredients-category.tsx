import style from './ingredients-category.module.css';
import IngredientDetail from '../ingredient-details/ingredient-detail';
import { IIngredient } from '../../utils/types';
import React from 'react';
import { useSelector } from 'react-redux';
import { getIngredientsCounter } from '../../services/constructor-ingredients/selector';

interface IProps {
    refCategory: any;
    id: string;
    ingredients: IIngredient[];
    children: React.ReactNode;
}

function IngredientsСategory({ refCategory, id, ingredients, children }: IProps) {
    const counter = useSelector(getIngredientsCounter);
    return (
        <div ref={refCategory} id={id} className="pb-10">
            <h2 className="text text_type_main-medium">{children}</h2>
            <ul className={`${style.container} pt-6 pl-4 pr-4`}>
                {ingredients.map((item) => {
                    return <IngredientDetail key={item._id} ingredient={item} counter={counter[item._id]} />;
                })}
            </ul>
        </div>
    );
}

export default React.memo(IngredientsСategory);
