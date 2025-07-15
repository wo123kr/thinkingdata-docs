import React, { useState, useEffect } from 'react';
import styles from './CookieConsent.module.css';

const COOKIE_KEY = 'cookieConsent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem(COOKIE_KEY);
      if (!consent) setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setVisible(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(COOKIE_KEY, 'accepted');
    }
  };
  const handleReject = () => {
    setVisible(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(COOKIE_KEY, 'rejected');
    }
  };

  if (!visible) return null;

  return (
    <div className={styles.cookieBar}>
      <span>
        This site uses cookies to deliver its service and to analyze traffic. By browsing this site, you accept the <a href="#" target="_blank" rel="noopener noreferrer">privacy policy</a>.
      </span>
      <div className={styles.actions}>
        <button onClick={handleAccept} className={styles.accept}>Accept</button>
        <button onClick={handleReject} className={styles.reject}>Reject</button>
      </div>
    </div>
  );
} 