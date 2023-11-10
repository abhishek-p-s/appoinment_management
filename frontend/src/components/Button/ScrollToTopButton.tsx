import { Icon } from '@iconify/react/dist/iconify.js';
import { useState, useEffect, memo } from 'react';

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add an event listener to detect scroll position
    window.addEventListener('scroll', handleScroll);
    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`${
        isVisible ? 'block' : 'hidden'
      } fixed right-6 bottom-4 bg-primary w-10 h-10 flex justify-center items-center text-white p-2 rounded cursor-pointer transition-opacity duration-300 hover:opacity-75`}
      onClick={scrollToTop}
    >
      <Icon icon="akar-icons:arrow-up" />
    </div>
  );
}

export default memo(ScrollToTopButton);
