import React from 'react';
import styles from './Modal.module.css';
import ReactDOM from 'react-dom';
import { MODAL_ROOT_ID } from '../../../application.constants';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', MODAL_ROOT_ID);
document.body.appendChild(modalRoot);

interface Props {
  handleClick: () => void;
}

class Modal extends React.Component<React.PropsWithChildren<Props>, Record<string, never>> {
  private readonly element: HTMLDivElement;

  constructor(props: React.PropsWithChildren<Props>) {
    super(props);
    this.element = document.createElement('div');
  }

  getModalRoot() {
    if (!modalRoot) throw new Error('No modal root found');
    else return modalRoot;
  }

  componentDidMount() {
    this.getModalRoot().appendChild(this.element);
  }

  componentWillUnmount() {
    this.getModalRoot().removeChild(this.element);
  }

  render() {
    const { handleClick, children } = this.props;
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
      this.element
    );
  }
}

export default Modal;
