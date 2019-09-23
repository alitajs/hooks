import {useState, useEffect} from 'react';
import {debounce} from 'lodash';


export interface IWindowSize {
  innerHeight: number;
  innerWidth: number;
  outerHeight: number;
  outerWidth: number;
}

export interface IGetSize {
  (): IWindowSize
}

export interface IProps {
  waitTime?: number
}

const getSize: IGetSize = () => {
  return {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    outerHeight: window.outerHeight,
    outerWidth: window.outerWidth,
  }
};


const useWindowSize: (options?: IProps) => IWindowSize = props => {
  const [windowSize, setWindowSize] = useState<IWindowSize>(getSize());
  const {waitTime = 400} = props || {};

  const handleResize = debounce(() => {
    setWindowSize(getSize());
  }, waitTime);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
