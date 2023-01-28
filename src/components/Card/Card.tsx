import React from 'react';
import styles from './Card.module.css';
import avatar from './avatar.png';

interface Props {
  name: string;
  position: string;
  email: string;
}

const Card = ({ name, position, email }: Props) => (
  <div className={styles.card}>
    <img src={avatar} alt="avatar" className={styles.avatar} />
    <div className={styles.container}>
      <div className={styles.name}>{name}</div>
      <div className={styles.position}>{position}</div>
      <div className={styles.email}>{email}</div>
    </div>
  </div>
);

export default Card;
