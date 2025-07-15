import React from 'react';
import AnnouncementBanner from '../../components/AnnouncementBanner';
import MainHeader from '../../components/MainHeader';
import SubNav from '../../components/SubNav';
import CookieConsent from '../../components/CookieConsent';

export default function Navbar(props) {
  return (
    <>
      <AnnouncementBanner />
      <MainHeader />
      <SubNav />
      <CookieConsent />
    </>
  );
} 