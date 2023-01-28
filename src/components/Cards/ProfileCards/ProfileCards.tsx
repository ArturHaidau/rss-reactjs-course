import React from 'react';
import { useSelector } from 'react-redux';
import { selectProfiles } from '../../../store/selectors';
import ProfileCard from '../ProfileCard';
import styles from './ProfileCards.module.css';

const ProfileCards = () => {
  const profiles = useSelector(selectProfiles);
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
