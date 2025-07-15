import React from 'react';
import { useLocation } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { HiOutlineDocumentText } from 'react-icons/hi2';
import styles from './SubNav.module.css';

const tabs = [
  { 
    label: '문서', 
    href: '/docs/intro',
    icon: <HiOutlineDocumentText size={18} />,
    pathPrefix: '/docs'
  },
  { 
    label: '문서2', 
    href: '/docs2/intro',
    icon: <HiOutlineDocumentText size={18} />,
    pathPrefix: '/docs2'
  },
];

export default function SubNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // baseUrl을 제거한 경로로 비교
  const normalizedPath = currentPath.replace('/thinkingdata-docs', '');
  
  return (
    <nav className={styles.subnav}>
      {tabs.map(tab => {
        const isActive = normalizedPath.startsWith(tab.pathPrefix);
        return (
          <a 
            key={tab.label} 
            href={useBaseUrl(tab.href)} 
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </a>
        );
      })}
    </nav>
  );
} 