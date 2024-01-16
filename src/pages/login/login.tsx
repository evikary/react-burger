import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { sendLogin } from '../../services/user/action';
import { selectLoginError } from '../../services/user/selector';
import style from './login.module.css';

function Login() {
    const loginFailed = useSelector(selectLoginError);
    const [data, setData] = useState({ email: '', password: '' });
    const dispath: any = useDispatch();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleClick = () => {
        dispath(sendLogin(data));
    };

    return (
        <main className={style.main}>
            <section className={style.container}>
                <h1 className="text text_type_main-medium">Вход</h1>
                <div style={{ display: 'flex', flexDirection: 'column', rowGap: '24px', paddingTop: '24px', paddingBottom: '24px' }}>
                    <EmailInput onChange={onChange} value={data.email} name={'email'} isIcon={false} />
                    <PasswordInput onChange={onChange} value={data.password} name={'password'} extraClass="mb-2" />
                </div>
                {loginFailed && <p className={`${style.faile} text_type_main-default mb-3`}>Вы ввели неверный пароль!</p>}
                <Button onClick={handleClick} htmlType="button" type="primary" size="medium">
                    Войти
                </Button>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '80px' }}>
                    <p className={`text text_type_main-default text_color_inactive ${style.text}`}>Вы — новый пользователь?</p>
                    <Link to="/register">
                        <Button htmlType="button" type="secondary" size="medium">
                            Зарегистрироваться
                        </Button>
                    </Link>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
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
