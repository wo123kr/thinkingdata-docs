import React, { useState } from 'react';
import styles from './Banner.module.css';

export default function Banner() {
  const [visible, setVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bannerClosed') !== 'true';
    }
    return true;
  });

  const handleClose = () => {
    setVisible(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bannerClosed', 'true');
    }
  };

  if (!visible) return null;

  return (
    <div className={styles.banner}>
      <span>🚀 새로운 기능 출시! 지금 확인해보세요.</span>
      <button onClick={handleClose} className={styles.closeBtn}>×</button>
    </div>
  );
} 