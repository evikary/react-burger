import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendForgotData } from '../../services/api';
import style from './reset-password.module.css';

function ResetPassword() {
    const [data, setData] = useState({ password: '', token: '' });

    const onChange = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    console.log(data);

    return (
        <main>
            <section className={style.container}>
                <h1 className="text text_type_main-medium">Восстановление пароля</h1>
                <div style={{ display: 'flex', flexDirection: 'column', rowGap: '24px', paddingTop: '24px', paddingBottom: '24px' }}>
                    <PasswordInput placeholder="Введите новый пароль" onChange={onChange} value={data.password} name={'password'} extraClass="mb-2" />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={onChange}
                        value={data.token}
                        name={'token'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1"
                    />
                </div>
                <Button onClick={() => sendForgotData(data)} htmlType="button" type="primary" size="medium">
                    Сохранить
                </Button>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '80px' }}>
                    <p className={`text text_type_main-default text_color_inactive ${style.text}`}>Вспомнили пароль?</p>
                    <Link to="/login">
                        <Button htmlType="button" type="secondary" size="medium">
                            Войти
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default ResetPassword;
