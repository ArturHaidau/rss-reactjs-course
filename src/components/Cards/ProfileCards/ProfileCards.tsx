import React from 'react';
import { useStateContext } from '../../../state';
import ProfileCard from '../ProfileCard';
import styles from './ProfileCards.module.css';

const ProfileCards = () => {
  const { profiles } = useStateContext();
  return (
    <div className={styles.cards}>
      {profiles.map((profile, index) => (
        <div key={index} className={styles.card}>
          <ProfileCard {...profile} />
        </div>
      ))}
    </div>
  );
};

export default ProfileCards;
