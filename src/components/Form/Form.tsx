import classNames from 'classnames';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../../store';
import { addProfile } from '../../store/slices/profiles';
import ProfileCards from '../Cards/ProfileCards';
import styles from './Form.module.css';

type FormValues = {
  name: string;
  birthday: string;
  country: string;
  isAdult: boolean;
  sex: string;
  images: File[];
};

const Form = () => {
  const [triggered, setTriggered] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch>();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onFieldChange = () => setTriggered(true);

  const onSubmit = (data: FormValues) => {
    const { name, birthday, country, isAdult, sex, images } = data;
    if (window.confirm('Do you want to submit your data?')) {
      dispatch(
        addProfile({
          name,
          birthday,
          country,
          isAdult,
          sex,
          avatarImage: URL.createObjectURL(images[0]),
        })
      );
      reset();
      setTriggered(false);
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={classNames([styles.field, styles.column])}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              {...register('name', { required: true, onChange: onFieldChange })}
            />
            {errors.name && <span className={styles.error}>The name should not be empty</span>}
          </div>
          <div className={classNames([styles.field, styles.column])}>
            <label htmlFor="birthday">Birthday</label>
            <input
              id="birthday"
              type="date"
              {...register('birthday', { required: true, onChange: onFieldChange })}
            />
            {errors.birthday && (
              <span className={styles.error}>The birthday should not be empty</span>
            )}
          </div>
          <div className={classNames([styles.field, styles.column])}>
            <label htmlFor="country">Country</label>
            <select
              id="country"
              {...register('country', { onChange: onFieldChange })}
              defaultValue="Belarus"
            >
              <option value="Belarus">Belarus</option>
              <option value="Poland">Poland</option>
              <option value="USA">USA</option>
            </select>
          </div>
          <div className={classNames([styles.field, styles.row])}>
            <label htmlFor="isAdult">You are 18+</label>
            <input
              id="isAdult"
              type="checkbox"
              {...register('isAdult', { onChange: onFieldChange })}
            />
          </div>
          <div className={classNames([styles.field, styles.row])}>
            <input id="sex-male" type="radio" value="Male" {...register('sex')} defaultChecked />
            <label htmlFor="sex-male">Male</label>
            <input
              id="sex-female"
              type="radio"
              value="Female"
              {...register('sex', { onChange: onFieldChange })}
            />
            <label htmlFor="sex-female">Female</label>
          </div>
          <div className={classNames([styles.field, styles.column])}>
            <label htmlFor="avatarImage">Avatar</label>
            <input
              id="avatarImage"
              type="file"
              accept="image/png"
              {...register('images', {
                onChange: onFieldChange,
                validate: (images) => images.length > 0,
              })}
            />
            {errors.images && (
              <span className={styles.error}>The avatar source should not be empty</span>
            )}
          </div>
          <div className={styles.submitButton}>
            <input
              type="submit"
              value="Submit"
              disabled={!triggered || Object.keys(errors).length > 0}
            />
          </div>
        </form>
      </div>
      <div className={styles.cards}>
        <ProfileCards />
      </div>
    </>
  );
};

export default Form;
