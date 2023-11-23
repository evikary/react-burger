import style from './ingredients-category.module.css';
import IngredientDetail from '../ingredient-details/ingredient-detail';
import { IIngredient } from '../../utils/types';

interface IProps {
    ingredients: IIngredient[];
    children: React.ReactNode;
}

function IngredientsСategory({ ingredients, children }: IProps) {
    return (
        <div className="pb-10">
            <h2 className="text text_type_main-medium">{children}</h2>
            <ul className={`${style.container} pt-6 pl-4 pr-4`}>
                {ingredients.map((item) => {
                    return (
                        <li key={item._id} className={style.item}>
                            <IngredientDetail image={item.image} name={item.name} price={item.price} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default IngredientsСategory;
