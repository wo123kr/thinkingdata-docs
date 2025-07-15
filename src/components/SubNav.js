import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { HiOutlineDocumentText, HiOutlineAcademicCap } from 'react-icons/hi2';
import styles from './SubNav.module.css';

const tabs = [
  { 
    label: '문서', 
    href: '/docs/intro',
    icon: <HiOutlineDocumentText size={18} />
  },
  { 
    label: '가이드', 
    href: '/docs/guides/installation',
    icon: <HiOutlineAcademicCap size={18} />
  },
];

export default function SubNav() {
  return (
    <nav className={styles.subnav}>
      {tabs.map(tab => (
        <a key={tab.label} href={useBaseUrl(tab.href)} className={styles.tab}>
          {tab.icon}
          <span>{tab.label}</span>
        </a>
      ))}
    </nav>
  );
} 