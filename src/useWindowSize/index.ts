import { useRef, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import isClient from '../_utils/isClient';

export type IUseWindowSizeResult = {
  width: number;
  height: number;
};

const useWindowSize = (
  waitTime: number = 400,
  initialWidth: number = Infinity,
  initialHeight: number = Infinity
): IUseWindowSizeResult => {
  const frame = useRef(0);
  const [state, setState] = useState<IUseWindowSizeResult>({
    width: isClient ? window.innerWidth : initialWidth,
    height: isClient ? window.innerHeight : initialHeight,
  });

  useEffect(() => {
    if (isClient) {
      const handler = () => {
        cancelAnimationFrame(frame.current);

        frame.current = requestAnimationFrame(() => {
          setState({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        });
      };

      const handleResize = debounce(() => {
        handler();
      }, waitTime);

      window.addEventListener('resize', handler);

      return () => {
        cancelAnimationFrame(frame.current);

        window.removeEventListener('resize', handleResize);
      };
    } else {
      return undefined;
    }
  }, []);

  return state;
};

export default useWindowSize;
