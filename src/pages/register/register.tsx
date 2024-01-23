import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../../services/user/action';
import { selectRegisterError } from '../../services/user/selector';
import style from './register.module.css';

function Register() {
    const registerError = useSelector(selectRegisterError);
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const dispatch: any = useDispatch();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const registerFormUser = () => {
        dispatch(registerUser(form));
    };

    return (
        <main>
            <section className={style.container}>
                <h1 className="text text_type_main-medium">Регистрация</h1>
                <div className={style.boxInputs}>
                    <Input type={'text'} placeholder={'Имя'} onChange={onChange} value={form.name} name={'name'} size={'default'} extraClass="ml-1" />
                    <EmailInput onChange={onChange} value={form.email} name={'email'} isIcon={false} />
                    <PasswordInput onChange={onChange} value={form.password} name={'password'} extraClass="mb-2" />
                </div>
                {registerError && <p className={`${style.faile} text_type_main-default mb-3`}>Этот пользователь уже зарегестрирован!</p>}
                <Button onClick={registerFormUser} htmlType="button" type="primary" size="medium">
                    Зарегистрироваться
                </Button>
                <div className={`pt-20 ${style.boxBtns}`}>
                    <p className={`text text_type_main-default text_color_inactive ${style.text}`}>Уже зарегистрированы?</p>
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

export default Register;
