import React from 'react';
import styles from './AiButton.module.css';

export default function AiButton() {
  return (
    <button className={styles.aiBtn} onClick={() => alert('AI 기능은 준비 중입니다!')} title="AI 도움말">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
      <span>AI</span>
    </button>
  );
} 