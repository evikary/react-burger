import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser } from '../../services/user/action';
import { selectRegisterError } from '../../services/user/selector';
import { IFormRegister } from '../../utils/types';
import style from './register.module.css';

function Register() {
    const registerError = useSelector(selectRegisterError);
    const [form, setForm] = useState<IFormRegister>({ name: '', email: '', password: '' });
    const dispatch = useDispatch();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const registerFormUser = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(registerUser(form));
    };

    return (
        <main>
            <form className={style.container} onSubmit={registerFormUser}>
                <h1 className="text text_type_main-medium">Регистрация</h1>
                <div className={style.boxInputs}>
                    <Input type={'text'} placeholder={'Имя'} onChange={onChange} value={form.name} name={'name'} size={'default'} extraClass="ml-1" />
                    <EmailInput onChange={onChange} value={form.email} name={'email'} isIcon={false} />
                    <PasswordInput onChange={onChange} value={form.password} name={'password'} extraClass="mb-2" />
                </div>
                {registerError && <p className={`${style.faile} text_type_main-default mb-3`}>Этот пользователь уже зарегестрирован!</p>}
                <Button htmlType="submit" type="primary" size="medium">
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
            </form>
        </main>
    );
}

export default Register;
