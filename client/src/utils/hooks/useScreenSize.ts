import { useLayoutEffect, useState } from 'react';
import { ScreenSize } from 'types/theme';

const getScreenSize = (width: number) => {
  if (width >= 1920) {
    return ScreenSize.XL;
  } else if (width >= 1280) {
    return ScreenSize.LG;
  } else if (width >= 960) {
    return ScreenSize.MD;
  } else if (width >= 600) {
    return ScreenSize.SM;
  }
  return ScreenSize.XS;
};

function useScreenSize() {
  const width = window.innerWidth;
  const [ss, setSS] = useState(getScreenSize(width));

  useLayoutEffect(() => {
    function updateSize() {
      const width = window.innerWidth;
      const currentSS = getScreenSize(width);
      if (currentSS !== ss) {
        setSS(currentSS);
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [ss]);

  const down = (target: ScreenSize) => {
    switch (target) {
      case ScreenSize.XS:
        return ss === ScreenSize.XS;
      case ScreenSize.SM:
        return ss === ScreenSize.XS || ss === ScreenSize.SM;
      case ScreenSize.MD:
        return (
          ss === ScreenSize.XS || ss === ScreenSize.SM || ss === ScreenSize.MD
        );
      case ScreenSize.LG:
        return (
          ss === ScreenSize.XS ||
          ss === ScreenSize.SM ||
          ss === ScreenSize.MD ||
          ss === ScreenSize.LG
        );
      case ScreenSize.XL:
        return true;
      default:
        return false;
    }
  };

  const up = (target: ScreenSize) => {
    switch (target) {
      case ScreenSize.XL:
        return ss === ScreenSize.XL;
      case ScreenSize.LG:
        return ss === ScreenSize.XL || ss === ScreenSize.LG;
      case ScreenSize.MD:
        return (
          ss === ScreenSize.XL || ss === ScreenSize.LG || ss === ScreenSize.MD
        );
      case ScreenSize.SM:
        return (
          ScreenSize.XL ||
          ss === ScreenSize.LG ||
          ss === ScreenSize.MD ||
          ss === ScreenSize.SM
        );
      case ScreenSize.XS:
        return true;
      default:
        return false;
    }
  };

  return { ss, down, up };
}

export default useScreenSize;
