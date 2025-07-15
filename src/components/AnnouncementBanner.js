import React, { useState, useEffect } from 'react';
import styles from './AnnouncementBanner.module.css';

const BANNER_KEY = 'announcementBannerClosedAt';
const BANNER_HIDE_DAYS = 7;

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const closedAt = localStorage.getItem(BANNER_KEY);
      if (closedAt) {
        const diff = Date.now() - parseInt(closedAt, 10);
        if (diff < BANNER_HIDE_DAYS * 24 * 60 * 60 * 1000) {
          setVisible(false);
        }
      }
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(BANNER_KEY, Date.now().toString());
    }
  };

  if (!visible) return null;

  return (
    <div className={styles.banner}>
      <span>📢 2025 Docs Report가 공개되었습니다! <a href="#" target="_blank" rel="noopener noreferrer">자세히 보기</a></span>
      <button onClick={handleClose} className={styles.closeBtn}>×</button>
    </div>
  );
} 