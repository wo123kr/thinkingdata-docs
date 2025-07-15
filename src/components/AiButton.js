import React from 'react';
import styles from './AiButton.module.css';

export default function AiButton({ onClick }) {
  return (
    <button className={styles.aiBtn} title="AI 도움말" onClick={onClick}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
      <span>AI</span>
    </button>
  );
} 