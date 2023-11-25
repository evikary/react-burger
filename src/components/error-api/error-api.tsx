import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './error-api.module.css';

interface IProps {
    children: React.ReactNode;
}

function ErrorAPI({ children }: IProps) {
    return (
        <div className={`${style.error} mt-30`}>
            <Logo />
            <h2 className="mt-10 text text_type_main-large">{children}</h2>
        </div>
    );
}

export default ErrorAPI;
