import { useState, useCallback } from 'react';

type IUseToggleResult = [boolean, (nextValue?: any) => void];

const useToggle = (initialValue: boolean): IUseToggleResult => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback((nextValue?: any) => {
    if (typeof nextValue === 'boolean') {
      setValue(nextValue);
    } else {
      setValue(currentValue => !currentValue);
    }
  }, [setValue]);

  return [value, toggle];
};

export default useToggle;
