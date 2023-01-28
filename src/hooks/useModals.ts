import { useState } from 'react';

type Modals = {
  [name: string]: boolean;
};

const useModals = <T extends Modals>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);

  const showModal = (name: keyof T) => {
    setState((prev) => ({ ...prev, [name]: true }));
  };

  const hideModal = (name: keyof T) => {
    setState((prev) => ({ ...prev, [name]: false }));
  };

  return { showModal, hideModal, modals: state };
};

export default useModals;
