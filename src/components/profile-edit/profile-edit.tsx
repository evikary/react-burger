import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../services/user/action';
import { selectUser } from '../../services/user/selector';
import style from './profile-edit.module.css';

function ProfileEdit() {
    const user = useSelector(selectUser);
    const dispatch: any = useDispatch();
    const [form, setForm] = useState({ name: user.name || '', email: user.email || '', password: '' });

    const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setForm({ name: user.name || '', email: user.email || '', password: '' });
    };

    const updateForm = () => {
        if (form.name !== user.name || form.email !== user.email || form.password.length !== 0) {
            dispatch(updateUser(form));
        }
    };

    return (
        <div className={style.box2}>
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
                <Button onClick={updateForm} htmlType="button" type="primary" size="medium">
                    Сохранить
                </Button>
            </div>
        </div>
    );
}

export default ProfileEdit;
