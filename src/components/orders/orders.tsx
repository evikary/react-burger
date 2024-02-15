import CardOrder from '../card-order/card-order';
import style from './orders.module.css';

function Orders() {
    const mokDate = {
        success: true,
        orders: [
            {
                ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
                _id: 1,
                status: 'done',
                number: 1,
                createdAt: '2024-02-11T10:07:25.654Z',
                updatedAt: '2024-02-11T10:07:25.654Z',
            },
            {
                ingredients: ['643d69a5c3f7b9001cfa093e'],
                _id: 2,
                status: 'done',
                number: 2,
                createdAt: '2024-02-11T20:07:25.654Z',
                updatedAt: '2024-02-11T20:07:25.654Z',
            },
            {
                ingredients: [
                    '643d69a5c3f7b9001cfa0942',
                    '643d69a5c3f7b9001cfa0943',
                    '643d69a5c3f7b9001cfa093f',
                    '643d69a5c3f7b9001cfa0940',
                    '643d69a5c3f7b9001cfa093d',
                    '643d69a5c3f7b9001cfa0944',
                    '643d69a5c3f7b9001cfa0945',
                    '643d69a5c3f7b9001cfa093c',
                    '643d69a5c3f7b9001cfa0941',
                ],
                _id: 3,
                status: 'done',
                number: 3,
                createdAt: '2024-02-10T20:14:30.654Z',
                updatedAt: '2024-02-10T20:14:30.654Z',
            },
            {
                ingredients: ['643d69a5c3f7b9001cfa0940', '643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0944', '643d69a5c3f7b9001cfa0945'],
                _id: 4,
                status: 'done',
                number: 4,
                createdAt: '2024-02-01T20:10:00.654Z',
                updatedAt: '2024-02-01T20:10:00.654Z',
            },
            {
                ingredients: [
                    '643d69a5c3f7b9001cfa094a',
                    '643d69a5c3f7b9001cfa093f',
                    '643d69a5c3f7b9001cfa0940',
                    '643d69a5c3f7b9001cfa0942',
                    '643d69a5c3f7b9001cfa0943',
                    '643d69a5c3f7b9001cfa093f',
                    '643d69a5c3f7b9001cfa0940',
                    '643d69a5c3f7b9001cfa093d',
                    '643d69a5c3f7b9001cfa0944',
                    '643d69a5c3f7b9001cfa0945',
                    '643d69a5c3f7b9001cfa093c',
                    '643d69a5c3f7b9001cfa0941',
                ],
                _id: 5,
                status: 'done',
                number: 5,
                createdAt: '2024-01-23T20:13:23.654Z',
                updatedAt: '2024-01-23T20:13:23.654Z',
            },
        ],
        total: 2,
        totalToday: 2,
    };

    return (
        <section className={`${style.container} pr-2`}>
            {mokDate.orders.map((item) => {
                return <CardOrder key={item._id} ingredientsId={item.ingredients} time={item.createdAt} number={item.number} />;
            })}
        </section>
    );
}

export default Orders;
