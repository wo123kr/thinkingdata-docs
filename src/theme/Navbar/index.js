import React from 'react';
import DefaultNavbar from '@theme-original/Navbar';
import Banner from '../../components/Banner';
import AnnouncementBanner from '../../components/AnnouncementBanner';
import CookieConsent from '../../components/CookieConsent';

export default function Navbar(props) {
  return (
    <>
      <AnnouncementBanner />
      <Banner />
      <DefaultNavbar {...props} />
      <CookieConsent />
    </>
  );
} 