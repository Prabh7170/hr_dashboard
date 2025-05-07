import React from 'react';
import Layout from '@/components/Layout';

const DashboardLayout = ({ children }) => {
  return (
    <Layout title="Dashboard">
      {children}
    </Layout>
  );
};

export default DashboardLayout;
