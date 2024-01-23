import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { sendLogin } from '../../services/user/action';
import { selectLoginError } from '../../services/user/selector';
import style from './login.module.css';

function Login() {
    const loginFailed = useSelector(selectLoginError);
    const [form, setForm] = useState({ email: '', password: '' });
    const dispatch: any = useDispatch();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleClick = () => {
        dispatch(sendLogin(form));
    };

    return (
        <main className={style.main}>
            <section className={style.container}>
                <h1 className="text text_type_main-medium">Вход</h1>
                <div className={style.boxInputs}>
                    <EmailInput onChange={onChange} value={form.email} name={'email'} isIcon={false} />
                    <PasswordInput onChange={onChange} value={form.password} name={'password'} extraClass="mb-2" />
                </div>
                {loginFailed && <p className={`${style.faile} text_type_main-default mb-3`}>Вы ввели неверный пароль!</p>}
                <Button onClick={handleClick} htmlType="button" type="primary" size="medium">
                    Войти
                </Button>
                <div className={`pt-20 ${style.boxBtns}`}>
                    <p className={`text text_type_main-default text_color_inactive ${style.text}`}>Вы — новый пользователь?</p>
                    <Link to="/register">
                        <Button htmlType="button" type="secondary" size="medium">
                            Зарегистрироваться
                        </Button>
                    </Link>
                </div>
                <div className={style.boxBtns}>
                    <p className={`text text_type_main-default text_color_inactive ${style.text}`}>Забыли пароль?</p>
                    <Link to="/forgot-password">
                        <Button htmlType="button" type="secondary" size="medium">
                            Восстановить пароль
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default Login;
