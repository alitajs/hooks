import { useState } from 'react';
import useToggle from '../useToggle';

export type IUseModalResult<T = undefined> = {
  visible: boolean;
  initValue?: T;
  openModal: (initValue?: T) => void;
  closeModal: () => void;
};

const useModal = <T = undefined>(): IUseModalResult<T> => {
  const [on, toggle] = useToggle(false);
  const [initValue, setInitValue] = useState<T>();

  const openModal = (initValue?: T) => {
    toggle(true);
    setInitValue(initValue);
  };

  const closeModal = () => {
    toggle(false);
  };

  return {
    initValue,
    openModal,
    visible: on,
    closeModal,
  };
};

export default useModal;
