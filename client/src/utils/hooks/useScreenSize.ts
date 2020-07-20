import { useLayoutEffect, useState } from 'react';
import { ScreenSize } from 'types/theme';

const getScreenSize = () => {
  const width = window.innerWidth;
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
  const [ss, setSS] = useState(getScreenSize());
  useLayoutEffect(() => {
    function updateSize() {
      const currentSS = getScreenSize();
      if (currentSS !== ss) {
        setSS(currentSS);
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [ss]);
  return ss;
}

export default useScreenSize;
