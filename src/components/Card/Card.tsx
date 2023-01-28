import React from 'react';
import styles from './Card.module.css';
import { Profile } from '../../types/profile';

const Card = ({ name, birthday, country, isAdult, sex, avatarImage }: Profile) => (
  <div className={styles.card}>
    <img src={avatarImage} alt="avatar" className={styles.avatar} />
    <div className={styles.container}>
      <div className={styles.field}>Name: {name}</div>
      <div className={styles.field}>Birthday: {birthday}</div>
      <div className={styles.field}>Country: {country}</div>
      <div className={styles.field}>Age: {isAdult ? 'Adult' : 'Not adult'}</div>
      <div className={styles.field}>Sex: {sex}</div>
    </div>
  </div>
);

export default Card;
