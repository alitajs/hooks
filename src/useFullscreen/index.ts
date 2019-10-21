import {
  RefObject,
  useLayoutEffect,
  useEffect,
  useState
} from 'react';
import screenFull from 'screenfull';

export interface FullScreenOptions {
  video?: RefObject<HTMLVideoElement>;
  onClose?: (error?: Error) => void;
}

const noop = () => {};

const useFullScreen = (
  sourceRef: RefObject<Element>,
  on: boolean,
  options: FullScreenOptions = {}
): boolean => {
  const { video, onClose = noop } = options;
  const [isFullScreen, setIsFullScreen] = useState(on);
  const [ref, setRef] = useState<RefObject<Element>>(sourceRef);

  useEffect(() => {
    if (ref) {
      setRef(ref);
    } else {
      setRef({
        current: document.documentElement
      })
    }
  }, [sourceRef]);

  useLayoutEffect(() => {
    if (!on) {
      return;
    }
    if (!ref.current) {
      return;
    }

    const onWebkitEndFullScreen = () => {
      video!.current!.removeEventListener('webkitendfullscreen', onWebkitEndFullScreen);
      onClose();
    };

    const onChange = () => {
      if (screenFull.isEnabled) {
        const isScreenFullFullScreen = screenFull.isFullscreen;
        setIsFullScreen(isScreenFullFullScreen);
        if (!isScreenFullFullScreen) {
          onClose();
        }
      }
    };

    if (screenFull.isEnabled) {
      try {
        screenFull.request(ref.current);
        setIsFullScreen(true);
      } catch (error) {
        onClose(error);
        setIsFullScreen(false);
      }
      screenFull.on('change', onChange);
    } else if (video && video.current && video.current.webkitEnterFullscreen) {
      video.current.webkitEnterFullscreen();
      video.current.addEventListener('webkitendfullscreen', onWebkitEndFullScreen);
      setIsFullScreen(true);
    } else {
      onClose();
      setIsFullScreen(false);
    }

    return () => {
      setIsFullScreen(false);
      if (screenFull.isEnabled) {
        try {
          screenFull.off('change', onChange);
          screenFull.exit();
        } catch {}
      } else if (video && video.current && video.current.webkitExitFullscreen) {
        video.current.removeEventListener('webkitendfullscreen', onWebkitEndFullScreen);
        video.current.webkitExitFullscreen();
      }
    };
  }, [on, video, ref]);

  return isFullScreen;
};

export default useFullScreen;
