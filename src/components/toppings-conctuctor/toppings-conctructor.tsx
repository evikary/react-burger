import style from './toppings-conctructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { addMove } from '../../services/constructor-ingredients/actions';
import { useDispatch } from 'react-redux';
import { IDragCollectedProps, IDragItems, IIngredient } from '../../utils/types';

interface IProps {
    item: IIngredient;
    index: number;
    handleClose: () => void;
}

function ToppingsConstructor({ item, index, handleClose }: IProps) {
    const dispatch = useDispatch();
    const ref = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop<IDragItems, unknown, unknown>({
        accept: 'sorting',
        hover(item: { item: IIngredient; index: number }, monitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            dispatch(addMove(dragIndex, hoverIndex));

            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag<IDragItems, unknown, IDragCollectedProps>({
        type: 'sorting',
        item: () => {
            return { item, index, type: 'sorting' };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
        <div ref={ref} className={style.box} style={{ opacity }}>
            <DragIcon type="primary" />
            <ConstructorElement handleClose={handleClose} text={item.name} price={item.price} thumbnail={item.image_mobile} />
        </div>
    );
}

export default ToppingsConstructor;
