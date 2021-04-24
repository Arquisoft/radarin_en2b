import React from 'react';
import { useSpring } from 'react-spring';
function useBoop({
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1,
  timing = 150,
  springConfig = {
    tension: 300,
    friction: 10,
  },
}) {
  const [isBooped, setIsBooped] = React.useState(false);
  const style = useSpring({
    display: 'inline-block',
    backfaceVisibility: 'hidden',
    transform: isBooped
      ? `rotate(${rotation}deg)`
      : `rotate(0deg)`,
    config: {
      tension: 300,
      friction: 10,
    },
  });
  React.useEffect(() => {
    if (!isBooped) {
        return;
    }
    const timeoutId = window.setTimeout(() => {
        setIsBooped(false);
    }, timing);
    return () => {
        window.clearTimeout(timeoutId);
    };
  }, [isBooped]);
  const trigger = React.useCallback(() => {
    setIsBooped(true);
  }, []);
  return [style, trigger];
}

export default useBoop;