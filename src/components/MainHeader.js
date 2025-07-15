import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './MainHeader.module.css';
import AiButton from './AiButton';

export default function MainHeader() {
  const { colorMode, setColorMode } = useColorMode();

  const toggleColorMode = () => {
    setColorMode(colorMode === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}> 
        <span>🔗</span>
        <span>ThinkingData Docs</span>
      </div>
      <div className={styles.searchAiWrap}>
        <input className={styles.search} type="text" placeholder="검색어를 입력하세요..." />
        <AiButton />
      </div>
      <nav className={styles.nav}>
        <button onClick={toggleColorMode} className={styles.themeToggle}>
          {colorMode === 'dark' ? '🌞' : '🌙'}
        </button>
        <a href="https://github.com/wo123kr/thinkingdata-docs" target="_blank" rel="noopener noreferrer">GitHub</a>
      </nav>
    </header>
  );
} 