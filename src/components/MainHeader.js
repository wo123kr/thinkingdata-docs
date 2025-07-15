import React from 'react';
import styles from './MainHeader.module.css';
import AiButton from './AiButton';

export default function MainHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}> 
        <img src="/img/logo.svg" alt="Logo" height={36} />
        <span>ThinkingData Docs</span>
      </div>
      <div className={styles.searchAiWrap}>
        <input className={styles.search} type="text" placeholder="검색어를 입력하세요..." />
        <AiButton />
      </div>
      <nav className={styles.nav}>
        <a href="https://github.com/wo123kr/thinkingdata-docs" target="_blank" rel="noopener noreferrer">GitHub</a>
      </nav>
    </header>
  );
} 