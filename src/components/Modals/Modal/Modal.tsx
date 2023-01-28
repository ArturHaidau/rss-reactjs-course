import React, { useEffect } from 'react';
import styles from './Modal.module.css';
import ReactDOM from 'react-dom';
import { MODAL_ROOT_ID } from '../../../application.constants';

const element = document.createElement('div');
const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', MODAL_ROOT_ID);
document.body.appendChild(modalRoot);

interface Props {
  handleClick: () => void;
}

const Modal = ({ handleClick, children }: React.PropsWithChildren<Props>) => {
  const getModalRoot = () => {
    if (!modalRoot) throw new Error('No modal root found');
    else return modalRoot;
  };

  useEffect(() => {
    getModalRoot().appendChild(element);
  }, []);

  useEffect(() => {
    return () => {
      getModalRoot().removeChild(element);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={handleClick}>
      <div className={styles.table}>
        <div className={styles.cell}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <span className={styles.close} onClick={handleClick}>
              &times;
            </span>
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      </div>
    </div>,
    element
  );
};

export default Modal;
