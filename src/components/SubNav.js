import React from 'react';
import styles from './SubNav.module.css';

const tabs = [
  { label: '문서', href: '/docs/intro' },
  { label: '가이드', href: '/docs/guides/installation' },
  { label: '헬프센터', href: '#' },
];

export default function SubNav() {
  return (
    <nav className={styles.subnav}>
      {tabs.map(tab => (
        <a key={tab.label} href={tab.href} className={styles.tab}>{tab.label}</a>
      ))}
    </nav>
  );
} 