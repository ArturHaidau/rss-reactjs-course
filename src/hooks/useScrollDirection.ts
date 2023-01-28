import { useEffect, useState } from 'react';
import { ScrollDirection } from '../types/scroll-direction';

const DELTA = 10;

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('up');

  useEffect(() => {
    let lastScrollTop = document.documentElement.scrollTop;
    const updateScrollDirection = () => {
      const newScrollTop = document.documentElement.scrollTop;
      if (Math.abs(newScrollTop - lastScrollTop) > DELTA)
        setScrollDirection(newScrollTop > lastScrollTop ? 'down' : 'up');
      lastScrollTop = newScrollTop;
    };
    window.addEventListener('scroll', updateScrollDirection);
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [scrollDirection]);

  return scrollDirection;
};

export default useScrollDirection;
