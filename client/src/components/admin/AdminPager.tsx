import React from 'react';

interface Props {
  page: number;
  totalPages: number;
  total: number;
  onPage: (page: number) => void;
}

export const AdminPager: React.FC<Props> = ({ page, totalPages, total, onPage }) => (
  <nav className="adm-pager" aria-label="Pagination">
    <span>
      {total} {total === 1 ? 'result' : 'results'} · Page {page} of {totalPages}
    </span>
    <span style={{ display: 'flex', gap: 8 }}>
      <button type="button" className="adm-btn adm-btn--small" disabled={page <= 1} onClick={() => onPage(page - 1)}>
        Previous
      </button>
      <button type="button" className="adm-btn adm-btn--small" disabled={page >= totalPages} onClick={() => onPage(page + 1)}>
        Next
      </button>
    </span>
  </nav>
);

export default AdminPager;
