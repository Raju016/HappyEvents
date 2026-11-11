import { useEffect } from 'react';

/** Sets the tab title and asks search engines not to index admin pages. */
export const useAdminPageMeta = (title: string) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} · Happy Events Admin`;
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.title = previousTitle;
      meta.remove();
    };
  }, [title]);
};
