import style from './modal-igredients-details.module.css';
import { allItems } from '../../services/burger-ingredients/selector';
import { useParams } from 'react-router-dom';
import Loader from '../loader/loader';
import { useSelector } from '../../services/store';

function ModalIngredientsDetails() {
    const { items } = useSelector(allItems);
    const { id } = useParams();
    const ingredient = items.find((item) => item._id === id);

    if (!ingredient) {
        return <Loader />;
    }

    return (
        <div className={style.container}>
            <h2 className={`text text_type_main-large ${style.title}`}>Детали ингредиента</h2>
            <img src={ingredient.image_large} alt={ingredient.name} />
            <p className="mt-4 text text_type_main-medium">{ingredient.name}</p>
            <div data-testid="calories" className={`mt-8 ${style.box}`}>
                <div className={style.box_mini}>
                    <span className="text text_type_main-default text_color_inactive">Калории,ккал</span>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.calories}</span>
                </div>
                <div className={style.box_mini}>
                    <span className="text text_type_main-default text_color_inactive">Белки, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</span>
                </div>
                <div className={style.box_mini}>
                    <span className="text text_type_main-default text_color_inactive">Жиры, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.fat}</span>
                </div>
                <div className={style.box_mini}>
                    <span className="text text_type_main-default text_color_inactive">Углеводы, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</span>
                </div>
            </div>
        </div>
    );
}

export default ModalIngredientsDetails;
