import Link from 'next/link';
import styles from './Pagination.module.css';

type Props = {
  totalCount: number;
  currentPage?: number;
  limit?: number;
  basePath?: string;
};

const Pagination = ({ 
  totalCount, 
  currentPage = 1, 
  limit = 10, 
  basePath = '' 
}: Props) => {
  const totalPages = Math.ceil(totalCount / limit);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className={styles.pagination}>
      {pages.map((page) => (
        <li key={page} className={styles.pageItem}>
          <Link 
            href={`${basePath}?page=${page}`}
            className={`${styles.pageLink} ${page === currentPage ? styles.active : ''}`}
          >
            {page}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
