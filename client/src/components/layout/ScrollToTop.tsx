import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router's own <ScrollRestoration /> only works with a data router
 * (createBrowserRouter). This app uses a plain <BrowserRouter>, so we reset
 * scroll position manually on every route change instead.
 */
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
