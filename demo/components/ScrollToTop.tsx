import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant scroll to top when route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
