import React from 'react';
import { Profile } from '../../../types/profile';
import ProfileCard from '../ProfileCard';
import styles from './ProfileCards.module.css';

const ProfileCards = ({ data }: { data: Profile[] }) => (
  <div className={styles.cards}>
    {data.map((profile, index) => (
      <div key={index} className={styles.card}>
        <ProfileCard {...profile} />
      </div>
    ))}
  </div>
);

export default ProfileCards;
