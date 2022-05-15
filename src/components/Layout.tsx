import React from 'react';

import { AppShell } from '@mantine/core';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
// import Footer from 'components/Footer';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <AppShell header={<Header />} navbar={<Sidebar />} 
    // footer={<Footer />}
    >
      {children}
    </AppShell>
  );
}
