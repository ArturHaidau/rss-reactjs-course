import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/form', label: 'Form' },
    { to: '/not-found', label: '404' },
  ];
  return (
    <div className={styles.header}>
      {links.map(({ to, label }, index) => (
        <NavLink
          end
          key={index}
          to={to}
          className={({ isActive }) =>
            [styles.linkContainer, isActive ? styles.linkActive : null].filter(Boolean).join(' ')
          }
        >
          <span className={styles.linkLabel}>{label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Header;
