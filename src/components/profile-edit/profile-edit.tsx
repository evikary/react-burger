import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser } from '../../services/user/action';
import { selectUser } from '../../services/user/selector';
import { IFormRegister } from '../../utils/types';
import style from './profile-edit.module.css';

function ProfileEdit() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [form, setForm] = useState<IFormRegister>({ name: user?.name || '', email: user?.name || '', password: '' });

    const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setForm({ name: user?.name || '', email: user?.email || '', password: '' });
    };

    const updateForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form.name !== user?.name || form.email !== user?.email || form.password.length !== 0) {
            dispatch(updateUser(form));
        }
    };

    return (
        <form className={style.box2} onSubmit={updateForm}>
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: '24px', paddingBottom: '24px' }}>
                <Input
                    type={'text'}
                    placeholder="Имя"
                    onChange={handleChangeForm}
                    value={form.name}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                    icon="EditIcon"
                />
                <EmailInput placeholder="E-mail" onChange={handleChangeForm} value={form.email} name={'email'} isIcon={true} />
                <PasswordInput placeholder="Пароль" onChange={handleChangeForm} value={form.password} name={'password'} icon="EditIcon" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                <Button onClick={resetForm} htmlType="button" type="secondary" size="medium">
                    Отмена
                </Button>
                <Button htmlType="submit" type="primary" size="medium">
                    Сохранить
                </Button>
            </div>
        </form>
    );
}

export default ProfileEdit;
