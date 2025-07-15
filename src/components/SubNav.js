import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { HiOutlineDocumentText } from 'react-icons/hi2';
import styles from './SubNav.module.css';

const tabs = [
  { 
    label: '문서', 
    href: '/thinkingdata-docs/docs/intro',
    icon: <HiOutlineDocumentText size={18} />
  },
  { 
    label: '문서2', 
    href: '/thinkingdata-docs/docs2/intro',
    icon: <HiOutlineDocumentText size={18} />
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