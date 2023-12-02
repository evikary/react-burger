import style from './ingredients-category.module.css';
import IngredientDetail from '../ingredient-details/ingredient-detail';
import { IIngredient } from '../../utils/types';
import { useState } from 'react';
import Modal from '../modal/modal';
import ModalIngredientsDetails from '../modal-ingredients-details/modal-igredients-details';

interface IProps {
    ingredients: IIngredient[];
    children: React.ReactNode;
}

function IngredientsСategory({ ingredients, children }: IProps) {
    const [open, setOpen] = useState(false);
    const [detail, setDetail] = useState<IIngredient | null>(null);

    const handleClick = (item: IIngredient) => {
        setDetail(item);
        setOpen(true);
    };

    return (
        <div className="pb-10">
            <h2 className="text text_type_main-medium">{children}</h2>
            <ul className={`${style.container} pt-6 pl-4 pr-4`}>
                {ingredients.map((item) => {
                    return (
                        <li onClick={() => handleClick(item)} key={item._id} className={style.item}>
                            <IngredientDetail image={item.image} name={item.name} price={item.price} />
                        </li>
                    );
                })}
            </ul>
            {open && detail !== null && (
                <Modal onClose={() => setOpen(false)}>
                    <ModalIngredientsDetails details={detail} />
                </Modal>
            )}
        </div>
    );
}

export default IngredientsСategory;
