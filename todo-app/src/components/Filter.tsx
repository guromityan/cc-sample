import type { FilterType } from '../types/todo';
import styles from './Filter.module.css';

interface FilterProps {
  current: FilterType;
  activeCount: number;
  totalCount: number;
  onFilter: (f: FilterType) => void;
  onClearCompleted: () => void;
}

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export function Filter({ current, activeCount, totalCount, onFilter, onClearCompleted }: FilterProps) {
  const hasCompleted = totalCount > activeCount;

  return (
    <div className={styles.footer}>
      <span className={styles.count}>
        {activeCount} item{activeCount !== 1 ? 's' : ''} left
      </span>
      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`${styles.filterButton} ${current === f.value ? styles.selected : ''}`}
            onClick={() => onFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      {hasCompleted && (
        <button className={styles.clearButton} onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </div>
  );
}
