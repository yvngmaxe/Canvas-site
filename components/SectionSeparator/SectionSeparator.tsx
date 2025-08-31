import styles from './SectionSeparator.module.css';

export default function SectionSeparator() {
  return (
    <div className={styles.separatorContainer}>
      <svg width="100%" height="20" viewBox="0 0 400 20" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M0 10 C 50 5, 150 15, 200 10 S 350 5, 400 10" 
          stroke="#e5e5e5" 
          fill="none" 
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}