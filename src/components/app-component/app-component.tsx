import React, { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import ErrorAPI from '../error-api/error-api';
import Loader from '../loader/loader';
import { getIngredients } from '../../services/burger-ingredients/actions';
import { useDispatch, useSelector } from 'react-redux';
import { allItems } from '../../services/burger-ingredients/selector';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/home/home';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import NotFound from '../../pages/not-found/not-found';
import { checkAuth } from '../../services/user/action';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import Feed from '../../pages/feed/feed';
import ProfileEdit from '../profile-edit/profile-edit';
import Orders from '../orders/orders';

function App() {
    const { load, fail } = useSelector(allItems);
    const dispatch: any = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
        dispatch(checkAuth());
    }, []);

    return (
        <>
            {load && <Loader />}
            {fail && !load && <ErrorAPI>Сервис не работает! Попробуйте немного позже...</ErrorAPI>}
            {!fail && !load && (
                <>
                    <AppHeader />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
                        <Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
                        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
                        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
                        <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
                            <Route index element={<OnlyAuth component={<ProfileEdit />} />} />
                            <Route path="orders" element={<OnlyAuth component={<Orders />} />} />
                        </Route>
                        <Route path="/feed" element={<Feed />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </>
            )}
        </>
    );
}

export default App;
