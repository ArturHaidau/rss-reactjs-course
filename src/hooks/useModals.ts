import { useState } from 'react';

type Modals<T extends string> = {
  [key in T]: boolean;
};

const useModals = <T extends string>(initialState: Modals<T>) => {
  const [state, setState] = useState(initialState);

  const showModal = (name: T) => {
    setState((prev) => ({ ...prev, [name]: true }));
  };

  const hideModal = (name: T) => {
    setState((prev) => ({ ...prev, [name]: false }));
  };

  return { showModal, hideModal, modals: state };
};

export default useModals;
