import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resetForgotData } from '../../services/api';
import { IFormResetPassword } from '../../utils/types';
import style from './reset-password.module.css';

function ResetPassword() {
    const [data, setData] = useState<IFormResetPassword>({ password: '', token: '' });
    const [fail, setFail] = useState<string>('');
    const navigate = useNavigate();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (localStorage.getItem('reset-password') !== 'approve') {
            navigate('/');
        }
    }, []);

    const resetForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await resetForgotData(data);
            if (res.message === 'Password successfully reset') {
                localStorage.removeItem('reset-password');
                navigate('/login');
            }
        } catch (err: any) {
            setFail(err.message);
        }
    };

    return (
        <main>
            <form className={style.container} onSubmit={resetForm}>
                <h1 className="text text_type_main-medium">Восстановление пароля</h1>
                <div className={style.boxInputs}>
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
                {fail && <p className={`${style.faile} text_type_main-default mb-3`}>Вы ввели неверный код!</p>}
                <Button htmlType="submit" type="primary" size="medium">
                    Сохранить
                </Button>
                <div className={`pt-20 ${style.boxBtns}`}>
                    <p className={`text text_type_main-default text_color_inactive ${style.text}`}>Вспомнили пароль?</p>
                    <Link to="/login">
                        <Button htmlType="button" type="secondary" size="medium">
                            Войти
                        </Button>
                    </Link>
                </div>
            </form>
        </main>
    );
}

export default ResetPassword;
