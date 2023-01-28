import React from 'react';
import { Profile } from '../../types/profile';
import Card from '../Card';
import styles from './Cards.module.css';

const Cards = ({ data }: { data: Profile[] }) => (
  <div className={styles.cards}>
    {data.map((profile, index) => (
      <div key={index} className={styles.card}>
        <Card {...profile} />
      </div>
    ))}
  </div>
);

export default Cards;
